import { effectiveState } from "@/lib/approval/machine";
import type { ApprovalRecord, ApprovalState } from "@/lib/approval/types";
import { isValidSlug } from "./slug";

export interface ReviewItem {
  id: string;
  slug: string | null;
  title: string;
  updatedAt: string;
  /** The revision a decision would bind to. Null once only a draft remains. */
  revision: string | null;
  state: ApprovalState;
  lastDecision: Pick<ApprovalRecord, "state" | "decidedBy" | "decidedAt" | "reason"> | null;
  editedSinceDecision: boolean;
  slugValid: boolean;
  slugClashesWithStatic: boolean;
  deletionRequested: boolean;
  /** Rejected, but the post is still published in Sanity: offer "Send back". */
  sendBackFailed: boolean;
  /** Deletion approved, but the post still exists in Sanity: offer "Delete now". */
  deleteFailed: boolean;
}

type QueuePost = {
  id: string;
  slug: string | null;
  title: string | null;
  updatedAt: string;
  revision: string;
  deletionRequested?: boolean | null;
};

const lastDecision = (r: ApprovalRecord | null) =>
  r && { state: r.state, decidedBy: r.decidedBy, decidedAt: r.decidedAt, reason: r.reason };

export function toReviewItem(post: QueuePost, record: ApprovalRecord | null, staticSlugs: ReadonlySet<string>): ReviewItem {
  const state = effectiveState(record, post.revision);
  const deletionRequested = post.deletionRequested === true;
  return {
    id: post.id,
    slug: post.slug,
    title: post.title?.trim() || "Untitled",
    updatedAt: post.updatedAt,
    revision: post.revision,
    state,
    lastDecision: lastDecision(record),
    editedSinceDecision: record !== null && record.objectRevision !== post.revision,
    slugValid: isValidSlug(post.slug),
    slugClashesWithStatic: post.slug !== null && staticSlugs.has(post.slug),
    deletionRequested,
    sendBackFailed: state === "rejected",
    deleteFailed: state === "approved" && deletionRequested,
  };
}

/**
 * The queue is built from what is published in Sanity right now, so a post deleted
 * outside the site simply leaves it. The one addition is rejected posts already sent
 * back (now only drafts), named from the snapshot on the decision. `draftIds` is null
 * when there is no read token; those rows are then kept rather than guessed away.
 */
export function buildQueue(
  posts: QueuePost[],
  records: ApprovalRecord[],
  draftIds: ReadonlySet<string> | null,
  staticSlugs: ReadonlySet<string>,
): ReviewItem[] {
  const byId = new Map(records.map((r) => [r.objectId, r]));
  const publishedIds = new Set(posts.map((p) => p.id));
  const items = posts.map((p) => toReviewItem(p, byId.get(p.id) ?? null, staticSlugs));
  for (const r of records) {
    if (r.state !== "rejected" || publishedIds.has(r.objectId)) continue;
    if (draftIds && !draftIds.has(r.objectId)) continue;
    items.push({
      id: r.objectId,
      slug: r.objectSlug,
      title: r.objectTitle?.trim() || "Untitled",
      updatedAt: r.decidedAt,
      revision: null,
      state: "rejected",
      lastDecision: lastDecision(r),
      editedSinceDecision: false,
      slugValid: isValidSlug(r.objectSlug),
      slugClashesWithStatic: false,
      deletionRequested: false,
      sendBackFailed: false,
      deleteFailed: false,
    });
  }
  return items;
}
