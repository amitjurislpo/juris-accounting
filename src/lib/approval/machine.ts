import type { ApprovalRecord, ApprovalState, DecisionAction } from "./types";

/**
 * The single state machine. Only waiting ("submitted") can move. A decision is
 * bound to its revision, so a new revision is back to waiting with no background
 * job: the revision change is the transition.
 */
const ALLOWED: Record<ApprovalState, Partial<Record<DecisionAction, ApprovalState>>> = {
  submitted: { approve: "approved", reject: "rejected" },
  approved: {},
  rejected: {},
};

export function effectiveState(record: ApprovalRecord | null, currentRevision: string): ApprovalState {
  if (!record || record.objectRevision !== currentRevision) return "submitted";
  return record.state;
}

export type TransitionResult =
  | { ok: true; from: ApprovalState; to: ApprovalState }
  | { ok: false; from: ApprovalState; reason: string };

export function evaluateTransition(
  record: ApprovalRecord | null,
  currentRevision: string,
  action: DecisionAction,
): TransitionResult {
  const from = effectiveState(record, currentRevision);
  const to = ALLOWED[from][action];
  if (to) return { ok: true, from, to };
  return {
    ok: false,
    from,
    reason:
      from === "approved"
        ? "This revision is already approved. It returns to review only when the post is edited."
        : "This revision was already rejected. It returns to review when the author publishes again.",
  };
}

export function isApprovedAtRevision(record: ApprovalRecord | null, currentRevision: string): boolean {
  return record !== null && record.state === "approved" && record.objectRevision === currentRevision;
}
