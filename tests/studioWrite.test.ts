import { describe, expect, it, vi } from "vitest";

vi.mock("@/sanity/client", () => ({ writeClient: null }));
const { buildRejectedDraft, returnToDraft, deleteFromStudio, StudioNotConfiguredError } = await import("@/lib/blog/studioWrite");

describe("sending back", () => {
  it("keeps the content, adds feedback and drops system fields", () => {
    const draft = buildRejectedDraft(
      { _id: "p1", _type: "post", _rev: "r", _createdAt: "c", _updatedAt: "u", title: "T", deletionRequested: true },
      "p1",
      { note: "Fix it", by: "c@x.com", at: "2026-01-01T00:00:00Z" },
    );
    expect(draft).toEqual({
      _id: "drafts.p1",
      _type: "post",
      title: "T",
      deletionRequested: true,
      reviewFeedback: { note: "Fix it", by: "c@x.com", at: "2026-01-01T00:00:00Z" },
    });
  });
  it("refuses clearly with no write token", async () => {
    await expect(returnToDraft("p1", "r", { note: null, by: "a", at: "b" })).rejects.toBeInstanceOf(StudioNotConfiguredError);
    await expect(deleteFromStudio("p1")).rejects.toBeInstanceOf(StudioNotConfiguredError);
  });
});
