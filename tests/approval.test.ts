import { describe, expect, it, vi } from "vitest";
import { effectiveState, evaluateTransition, isApprovedAtRevision } from "@/lib/approval/machine";
import { createApprovalService, IllegalTransitionError } from "@/lib/approval/service";
import { InMemoryApprovalStore } from "@/lib/approval/store";
import { BLOG_POST, type ApprovalRecord } from "@/lib/approval/types";
import { NotAuthorizedError, performDecision, STALE_MESSAGE, StaleRevisionError } from "@/lib/blog/review";

const record = (state: ApprovalRecord["state"], objectRevision = "r1"): ApprovalRecord => ({
  objectType: BLOG_POST,
  objectId: "p1",
  objectRevision,
  state,
  decidedBy: "a@x.com",
  decidedAt: "2026-01-01T00:00:00.000Z",
  reason: null,
  objectTitle: null,
  objectSlug: null,
});

describe("state machine", () => {
  it("treats no record, or a decision at another revision, as waiting", () => {
    expect(effectiveState(null, "r1")).toBe("submitted");
    expect(effectiveState(record("approved", "r0"), "r1")).toBe("submitted");
    expect(effectiveState(record("rejected", "r0"), "r1")).toBe("submitted");
    expect(effectiveState(record("approved"), "r1")).toBe("approved");
  });

  it("lets only waiting move, to approved or rejected", () => {
    expect(evaluateTransition(null, "r1", "approve")).toMatchObject({ ok: true, to: "approved" });
    expect(evaluateTransition(null, "r1", "reject")).toMatchObject({ ok: true, to: "rejected" });
    for (const state of ["approved", "rejected"] as const) {
      for (const action of ["approve", "reject"] as const) {
        expect(evaluateTransition(record(state), "r1", action).ok).toBe(false);
      }
    }
  });

  it("makes a new revision decidable again", () => {
    expect(evaluateTransition(record("rejected", "r0"), "r1", "approve").ok).toBe(true);
    expect(evaluateTransition(record("approved", "r0"), "r1", "reject").ok).toBe(true);
  });

  it("is public only when approved at exactly the current revision", () => {
    expect(isApprovedAtRevision(record("approved"), "r1")).toBe(true);
    expect(isApprovedAtRevision(record("approved"), "r2")).toBe(false);
    expect(isApprovedAtRevision(record("rejected"), "r1")).toBe(false);
    expect(isApprovedAtRevision(null, "r1")).toBe(false);
  });
});

describe("service", () => {
  it("writes the decision and one audit line, and refuses an illegal repeat", async () => {
    const store = new InMemoryApprovalStore();
    const service = createApprovalService(store, () => new Date("2026-02-02T00:00:00Z"));
    const input = { objectType: BLOG_POST, objectId: "p1", currentRevision: "r1", action: "approve" as const, actor: "c@x.com", title: "T", slug: "t" };
    const saved = await service.decide(input);
    expect(saved).toMatchObject({ state: "approved", decidedBy: "c@x.com", objectRevision: "r1", objectTitle: "T" });
    expect(store.audit).toHaveLength(1);
    expect(store.audit[0]).toMatchObject({ fromState: "submitted", toState: "approved", actor: "c@x.com" });
    await expect(service.decide(input)).rejects.toBeInstanceOf(IllegalTransitionError);
    expect(store.audit).toHaveLength(1);
  });
});

describe("decision guard", () => {
  const deps = (over: Partial<Parameters<typeof performDecision>[0]> = {}) => ({
    actor: { email: "c@x.com" },
    service: createApprovalService(new InMemoryApprovalStore()),
    isChecker: async () => true,
    currentRevision: async () => "r1" as string | null,
    ...over,
  });
  const input = { postId: "p1", revision: "r1", action: "approve" as const };

  it("refuses without a session, before anything else runs", async () => {
    const isChecker = vi.fn(async () => true);
    await expect(performDecision(deps({ actor: null, isChecker }), input)).rejects.toBeInstanceOf(NotAuthorizedError);
    expect(isChecker).not.toHaveBeenCalled();
  });

  it("refuses an admin who is not a checker, naming them, before reading Sanity", async () => {
    const currentRevision = vi.fn(async () => "r1");
    await expect(performDecision(deps({ isChecker: async () => false, currentRevision }), input)).rejects.toThrow("c@x.com is not a blog checker");
    expect(currentRevision).not.toHaveBeenCalled();
  });

  it("refuses a stale revision with the agreed message", async () => {
    await expect(performDecision(deps({ currentRevision: async () => "r2" }), input)).rejects.toBeInstanceOf(StaleRevisionError);
    await expect(performDecision(deps({ currentRevision: async () => "r2" }), input)).rejects.toThrow(STALE_MESSAGE);
    expect(STALE_MESSAGE).toBe("This post changed. Reload and review the latest version.");
  });

  it("refuses a post that no longer exists", async () => {
    await expect(performDecision(deps({ currentRevision: async () => null }), input)).rejects.toBeInstanceOf(StaleRevisionError);
  });

  it("refuses a second decision on the same revision", async () => {
    const d = deps();
    await performDecision(d, input);
    await expect(performDecision(d, { ...input, action: "reject" })).rejects.toBeInstanceOf(IllegalTransitionError);
  });

  it("records the checker", async () => {
    await expect(performDecision(deps(), input)).resolves.toMatchObject({ decidedBy: "c@x.com", state: "approved" });
  });
});
