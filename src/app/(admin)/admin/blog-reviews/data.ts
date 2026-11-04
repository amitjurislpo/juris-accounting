import "server-only";

import { blogPosts } from "@/content/blog";
import { PrismaApprovalStore } from "@/lib/approval/prismaStore";
import { BLOG_POST } from "@/lib/approval/types";
import { buildQueue } from "@/lib/blog/queue";
import { getExistingDraftIds, getPostsForReview } from "@/sanity/queries";

export const staticSlugs = new Set(blogPosts.map((p) => p.slug));

/** Uncached on both sides, so a checker always sees the truth. */
export async function loadQueue() {
  const [posts, records] = await Promise.all([getPostsForReview(), new PrismaApprovalStore().list(BLOG_POST)]);
  const publishedIds = new Set(posts.map((p) => p.id));
  const sentBack = records.filter((r) => r.state === "rejected" && !publishedIds.has(r.objectId)).map((r) => r.objectId);
  const draftIds = sentBack.length > 0 ? await getExistingDraftIds(sentBack) : new Set<string>();
  return buildQueue(posts, records, draftIds, staticSlugs);
}
