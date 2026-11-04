import type { ApprovalService } from "@/lib/approval/service";
import { BLOG_POST, type DecisionAction } from "@/lib/approval/types";

export class NotAuthorizedError extends Error {
  constructor(reason: string) {
    super(reason);
    this.name = "NotAuthorizedError";
  }
}

export const STALE_MESSAGE = "This post changed. Reload and review the latest version.";

export class StaleRevisionError extends Error {
  constructor() {
    super(STALE_MESSAGE);
    this.name = "StaleRevisionError";
  }
}

export interface Actor {
  email: string;
}

export interface PerformDecisionDeps {
  actor: Actor | null;
  service: ApprovalService;
  isChecker: (actor: Actor) => Promise<boolean>;
  /** The revision published in Sanity right now, read uncached; null if gone. */
  currentRevision: (postId: string) => Promise<string | null>;
}

export interface PerformDecisionInput {
  postId: string;
  revision: string;
  action: DecisionAction;
  reason?: string | null;
  title?: string | null;
  slug?: string | null;
}

/**
 * The guard every decision passes, in order: valid admin session, checker row,
 * reviewed revision still current, then the state machine (inside the service).
 * Dependencies are injected so the whole guard is unit-tested.
 */
export async function performDecision(deps: PerformDecisionDeps, input: PerformDecisionInput) {
  const { actor, service, isChecker, currentRevision } = deps;
  if (!actor) throw new NotAuthorizedError("Your admin session has expired. Sign in again.");
  if (!(await isChecker(actor))) throw new NotAuthorizedError(`${actor.email} is not a blog checker.`);
  if ((await currentRevision(input.postId)) !== input.revision) throw new StaleRevisionError();
  return service.decide({
    objectType: BLOG_POST,
    objectId: input.postId,
    currentRevision: input.revision,
    action: input.action,
    actor: actor.email,
    reason: input.reason ?? null,
    title: input.title ?? null,
    slug: input.slug ?? null,
  });
}
