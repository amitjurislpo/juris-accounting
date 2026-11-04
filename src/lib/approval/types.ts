/** A post is public only when its latest approval is `approved` AND was made at
 *  its current Sanity revision. Any edit changes the revision. */
export const BLOG_POST = "blog_post";

export type ApprovalState = "submitted" | "approved" | "rejected";
export type DecisionAction = "approve" | "reject";

export interface ApprovalRecord {
  objectType: string;
  objectId: string;
  objectRevision: string;
  state: ApprovalState;
  decidedBy: string;
  decidedAt: string;
  reason: string | null;
  objectTitle: string | null;
  objectSlug: string | null;
}

export interface ApprovalAuditEntry {
  objectType: string;
  objectId: string;
  objectRevision: string;
  fromState: ApprovalState;
  toState: ApprovalState;
  actor: string;
  at: string;
  reason: string | null;
}
