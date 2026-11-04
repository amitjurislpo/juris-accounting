import "server-only";

import { writeClient } from "@/sanity/client";

/**
 * The site's only writes to Sanity, both after a checker's decision. Approving an
 * ordinary post writes nothing: any write changes the revision and voids the approval.
 *
 * The decision is already recorded when these run and keeps the post off the site on
 * its own. If these fail, the review page warns and offers a retry.
 */
export const studioWriteConfigured = writeClient !== null;

export class StudioNotConfiguredError extends Error {
  constructor() {
    super("SANITY_API_WRITE_TOKEN is not set");
    this.name = "StudioNotConfiguredError";
  }
}

type RawDoc = Record<string, unknown> & { _id: string; _type: string };

export function buildRejectedDraft(base: RawDoc, postId: string, feedback: { note: string | null; by: string; at: string }) {
  const content = Object.fromEntries(
    Object.entries(base).filter(([key]) => !["_id", "_rev", "_createdAt", "_updatedAt", "_system"].includes(key)),
  );
  return {
    ...content,
    _id: `drafts.${postId}`,
    _type: base._type,
    reviewFeedback: { note: feedback.note ?? "", by: feedback.by, at: feedback.at },
  };
}

/**
 * In one transaction, deletes the published document and creates a draft with the
 * feedback. If the author has unpublished edits in a draft, those edits are kept
 * rather than overwritten. The revision guard fails the whole transaction if the
 * post was edited since the checker's decision, so a newer version is never lost.
 */
export async function returnToDraft(
  postId: string,
  revision: string,
  feedback: { note: string | null; by: string; at: string },
): Promise<void> {
  if (!writeClient) throw new StudioNotConfiguredError();
  const draftId = `drafts.${postId}`;
  const docs = await writeClient.fetch<RawDoc[]>(`*[_id in $ids]`, { ids: [postId, draftId] }, { cache: "no-store" });
  const published = docs.find((d) => d._id === postId);
  if (!published) throw new Error(`Post ${postId} is not published`);
  const draft = buildRejectedDraft(docs.find((d) => d._id === draftId) ?? published, postId, feedback);

  await writeClient
    .transaction()
    .patch(postId, (p) => p.ifRevisionId(revision).set({ reviewFeedback: draft.reviewFeedback }))
    .createOrReplace(draft as RawDoc)
    .delete(postId)
    .commit();
  console.info(`[blog] returnToDraft ${postId}: sent back to the author`);
}

/** Deletes a post whose deletion was approved, published and draft together. */
export async function deleteFromStudio(postId: string): Promise<void> {
  if (!writeClient) throw new StudioNotConfiguredError();
  await writeClient.transaction().delete(postId).delete(`drafts.${postId}`).commit();
  console.info(`[blog] deleteFromStudio ${postId}: deleted`);
}
