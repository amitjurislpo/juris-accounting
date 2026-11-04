"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getAdminActor } from "@/lib/admin/session";
import { effectiveState } from "@/lib/approval/machine";
import { PrismaApprovalStore } from "@/lib/approval/prismaStore";
import { createApprovalService, IllegalTransitionError } from "@/lib/approval/service";
import { BLOG_POST, type ApprovalRecord, type DecisionAction } from "@/lib/approval/types";
import { blogPosts } from "@/content/blog";
import { isBlogChecker } from "@/lib/blog/checkers";
import { APPROVALS_TAG } from "@/lib/blog/posts";
import { NotAuthorizedError, performDecision, STALE_MESSAGE, StaleRevisionError } from "@/lib/blog/review";
import { isValidSlug } from "@/lib/blog/slug";
import { deleteFromStudio, returnToDraft, StudioNotConfiguredError } from "@/lib/blog/studioWrite";
import { getPostForReview, SANITY_POSTS_TAG } from "@/sanity/queries";

/** `warning`: the decision was recorded, but its Sanity step did not complete. */
export type DecisionResult = { ok: true; warning?: string } | { ok: false; error: string };
export interface DecisionInput {
  postId: string;
  revision: string;
  reason?: string;
}

const MAX_REASON = 2000;

/** Both caches together: purging only approvals could pair a fresh approval with a
 *  cached older revision and hide the post. */
function purgeBlogCaches(slug: string | null | undefined) {
  updateTag(APPROVALS_TAG);
  updateTag(SANITY_POSTS_TAG);
  revalidatePath("/blog");
  // Every post page: each one can show this post among its trending articles.
  revalidatePath("/blog/[slug]", "page");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  revalidatePath("/admin/blog-reviews", "layout");
}

const sanityFailure = (what: string, retry: string, error: unknown) =>
  error instanceof StudioNotConfiguredError
    ? `${what}: ${error.message}. The post stays off the website; use "${retry}" once it is set.`
    : `${what}: Sanity refused the change (see server logs). The post stays off the website; try "${retry}".`;

async function sendBack(postId: string, record: ApprovalRecord): Promise<string | undefined> {
  try {
    await returnToDraft(postId, record.objectRevision, { note: record.reason, by: record.decidedBy, at: record.decidedAt });
  } catch (error) {
    console.error(`[blog] returnToDraft ${postId} failed:`, error);
    return sanityFailure("Rejected, but not sent back to the author", "Send back to author", error);
  }
}

async function removePost(postId: string): Promise<string | undefined> {
  try {
    await deleteFromStudio(postId);
  } catch (error) {
    console.error(`[blog] deleteFromStudio ${postId} failed:`, error);
    return sanityFailure("Deletion approved, but not deleted from Sanity", "Delete now", error);
  }
}

async function decide(action: DecisionAction, input: DecisionInput): Promise<DecisionResult> {
  const actor = await getAdminActor();
  // Before any Sanity read; performDecision enforces the same again.
  if (!actor) return { ok: false, error: "Your admin session has expired. Sign in again." };
  if (!(await isBlogChecker(actor))) return { ok: false, error: `${actor.email} is not a blog checker.` };

  const reason = input.reason?.trim().slice(0, MAX_REASON);
  if (action === "reject" && !reason) return { ok: false, error: "Tell the author what to change." };

  let post;
  try {
    post = await getPostForReview(input.postId);
  } catch (error) {
    console.error("[blog] review read failed:", error);
    return { ok: false, error: "Could not reach Sanity to confirm the latest version. Please try again." };
  }
  const isDeletion = post?.deletionRequested === true;

  if (action === "approve" && post && post.revision === input.revision && !isDeletion) {
    if (!isValidSlug(post.slug)) return { ok: false, error: "This post's slug can't form a working URL. The author must fix it." };
    if (blogPosts.some((p) => p.slug === post.slug)) return { ok: false, error: "An existing article already uses this slug. The author must change it." };
  }

  let record: ApprovalRecord;
  try {
    record = await performDecision(
      { actor, service: createApprovalService(new PrismaApprovalStore()), isChecker: isBlogChecker, currentRevision: async () => post?.revision ?? null },
      {
        postId: input.postId,
        revision: input.revision,
        action,
        reason: reason || (isDeletion && action === "approve" ? "Deletion approved" : null),
        title: post?.title,
        slug: post?.slug,
      },
    );
  } catch (error) {
    if (error instanceof NotAuthorizedError || error instanceof StaleRevisionError || error instanceof IllegalTransitionError) {
      return { ok: false, error: error.message };
    }
    console.error("[blog] decision failed:", error);
    return { ok: false, error: "Could not record the decision. Please try again." };
  }

  let warning: string | undefined;
  if (action === "reject") warning = await sendBack(input.postId, record);
  else if (isDeletion) warning = await removePost(input.postId);

  purgeBlogCaches(post?.slug);
  return { ok: true, warning };
}

export async function approveBlogPost(input: DecisionInput): Promise<DecisionResult> {
  return decide("approve", input);
}

export async function rejectBlogPost(input: DecisionInput): Promise<DecisionResult> {
  return decide("reject", input);
}

/** Re-checks everything for a retry, and records no new decision. */
async function retryGuard(input: { postId: string; revision: string }, expected: "approved" | "rejected") {
  const actor = await getAdminActor();
  if (!actor) return { error: "Your admin session has expired. Sign in again." };
  if (!(await isBlogChecker(actor))) return { error: `${actor.email} is not a blog checker.` };
  const post = await getPostForReview(input.postId);
  if (!post || post.revision !== input.revision) return { error: STALE_MESSAGE };
  const record = await new PrismaApprovalStore().getApproval(BLOG_POST, input.postId);
  if (!record || effectiveState(record, post.revision) !== expected) return { error: "This post is no longer in that state. Reload the page." };
  return { post, record };
}

/** Retry for a rejection whose Sanity step failed. */
export async function sendBackToAuthor(input: { postId: string; revision: string }): Promise<DecisionResult> {
  try {
    const guard = await retryGuard(input, "rejected");
    if ("error" in guard) return { ok: false, error: guard.error as string };
    const warning = await sendBack(input.postId, guard.record);
    purgeBlogCaches(guard.post.slug);
    return warning ? { ok: false, error: warning } : { ok: true };
  } catch (error) {
    console.error("[blog] send back failed:", error);
    return { ok: false, error: "Could not send the post back. Please try again." };
  }
}

/** Retry for an approved deletion whose Sanity step failed. */
export async function deleteNow(input: { postId: string; revision: string }): Promise<DecisionResult> {
  try {
    const guard = await retryGuard(input, "approved");
    if ("error" in guard) return { ok: false, error: guard.error as string };
    if (guard.post.deletionRequested !== true) return { ok: false, error: "Only a post with an approved deletion can be deleted here." };
    const warning = await removePost(input.postId);
    purgeBlogCaches(guard.post.slug);
    return warning ? { ok: false, error: warning } : { ok: true };
  } catch (error) {
    console.error("[blog] delete failed:", error);
    return { ok: false, error: "Could not delete the post. Please try again." };
  }
}
