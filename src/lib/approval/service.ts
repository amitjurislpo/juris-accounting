import { evaluateTransition } from "./machine";
import type { ApprovalStore } from "./store";
import type { ApprovalRecord, DecisionAction } from "./types";

export class IllegalTransitionError extends Error {
  constructor(reason: string) {
    super(reason);
    this.name = "IllegalTransitionError";
  }
}

export interface DecideInput {
  objectType: string;
  objectId: string;
  currentRevision: string;
  action: DecisionAction;
  actor: string;
  reason?: string | null;
  title?: string | null;
  slug?: string | null;
}

/** The one write path. Authorization is the caller's job (lib/blog/review.ts). */
export function createApprovalService(store: ApprovalStore, now: () => Date = () => new Date()) {
  return {
    decide(input: DecideInput): Promise<ApprovalRecord> {
      return store.withObjectLock(input.objectType, input.objectId, async (tx) => {
        const current = await tx.getApproval(input.objectType, input.objectId);
        const t = evaluateTransition(current, input.currentRevision, input.action);
        if (!t.ok) throw new IllegalTransitionError(t.reason);

        const at = now().toISOString();
        const reason = input.reason?.trim() || null;
        const record: ApprovalRecord = {
          objectType: input.objectType,
          objectId: input.objectId,
          objectRevision: input.currentRevision,
          state: t.to,
          decidedBy: input.actor,
          decidedAt: at,
          reason,
          objectTitle: input.title ?? null,
          objectSlug: input.slug ?? null,
        };
        await tx.writeDecision({
          record,
          audit: {
            objectType: input.objectType,
            objectId: input.objectId,
            objectRevision: input.currentRevision,
            fromState: t.from,
            toState: t.to,
            actor: input.actor,
            at,
            reason,
          },
        });
        return record;
      });
    },
  };
}

export type ApprovalService = ReturnType<typeof createApprovalService>;
