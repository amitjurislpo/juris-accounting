import { describe, expect, it, vi } from "vitest";
import type { ApprovalRecord } from "@/lib/approval/types";
import { buildQueue } from "@/lib/blog/queue";
import { isValidSlug, SLUG_PATTERN, slugify } from "@/lib/blog/slug";
import { approvedSanityPosts, eligibleSanityPosts, loadVisibleSanityPosts } from "@/lib/blog/visibility";
import type { SanityPost } from "@/sanity/types";

const post = (over: Partial<SanityPost> = {}) =>
  ({ id: "p1", revision: "r1", slug: "good-post", deletionRequested: false, title: "T", updatedAt: "2026-01-01T00:00:00Z", ...over }) as SanityPost;
const approval = (over: Partial<ApprovalRecord> = {}): ApprovalRecord => ({
  objectType: "blog_post", objectId: "p1", objectRevision: "r1", state: "approved", decidedBy: "c@x.com",
  decidedAt: "2026-01-02T00:00:00Z", reason: null, objectTitle: "Old title", objectSlug: "good-post", ...over,
});
const none = new Set<string>();

describe("slug rule", () => {
  it.each(["a", "good-post", "post-2", "2026-guide"])("accepts %s", (s) => expect(isValidSlug(s)).toBe(true));
  it.each(["/test", "Test", "a--b", "-a", "a-", "a b", "a/b", "", null, undefined])("rejects %s", (s) => expect(isValidSlug(s)).toBe(false));
  it("is the agreed pattern", () => expect(SLUG_PATTERN.source).toBe("^[a-z0-9]+(?:-[a-z0-9]+)*$"));
  it("generates only valid slugs", () => {
    for (const t of ["US Office = Game Changer!", "/test", "  Café & Co.  ", "a---b"]) expect(isValidSlug(slugify(t))).toBe(true);
  });
});

describe("public visibility filter", () => {
  it("shows a post approved at its current revision", () => {
    expect(approvedSanityPosts([post()], [approval()])).toHaveLength(1);
  });
  it.each([
    ["no decision", []],
    ["approved at an older revision", [approval({ objectRevision: "r0" })]],
    ["rejected", [approval({ state: "rejected" })]],
  ])("hides a post with %s", (_, approvals) => {
    expect(approvedSanityPosts([post()], approvals as ApprovalRecord[])).toHaveLength(0);
  });
  it("skips bad slugs, deletion requests and slugs a static post owns", () => {
    expect(eligibleSanityPosts([post({ slug: "/test" })], none)).toHaveLength(0);
    expect(eligibleSanityPosts([post({ slug: null })], none)).toHaveLength(0);
    expect(eligibleSanityPosts([post({ deletionRequested: true })], none)).toHaveLength(0);
    expect(eligibleSanityPosts([post()], new Set(["good-post"]))).toHaveLength(0);
  });
});

describe("fail-closed public read", () => {
  it("shows no Sanity posts if the approval lookup fails", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await loadVisibleSanityPosts({
      fetchPosts: async () => [post()],
      fetchApprovals: async () => { throw new Error("db down"); },
      staticSlugs: none,
    });
    expect(result).toEqual([]);
    spy.mockRestore();
  });
  it("does not query the database when there are no Sanity posts", async () => {
    const fetchApprovals = vi.fn(async () => []);
    await loadVisibleSanityPosts({ fetchPosts: async () => [], fetchApprovals, staticSlugs: none });
    expect(fetchApprovals).not.toHaveBeenCalled();
  });
  it("does not query the database when every post is ineligible", async () => {
    const fetchApprovals = vi.fn(async () => []);
    await loadVisibleSanityPosts({ fetchPosts: async () => [post({ slug: "/bad" })], fetchApprovals, staticSlugs: none });
    expect(fetchApprovals).not.toHaveBeenCalled();
  });
});

describe("review queue", () => {
  it("returns an edited post to waiting", () => {
    const [item] = buildQueue([post({ revision: "r2" })], [approval()], new Set(), none);
    expect(item).toMatchObject({ state: "submitted", editedSinceDecision: true });
  });
  it("offers a retry for a rejection still published in Sanity", () => {
    const [item] = buildQueue([post()], [approval({ state: "rejected" })], new Set(), none);
    expect(item).toMatchObject({ state: "rejected", sendBackFailed: true });
  });
  it("offers a retry for an approved deletion still in Sanity", () => {
    const [item] = buildQueue([post({ deletionRequested: true })], [approval()], new Set(), none);
    expect(item).toMatchObject({ state: "approved", deleteFailed: true });
  });
  it("lists a sent-back rejection from its snapshot, with no actions", () => {
    const [item] = buildQueue([], [approval({ state: "rejected" })], new Set(["p1"]), none);
    expect(item).toMatchObject({ title: "Old title", state: "rejected", revision: null, sendBackFailed: false });
  });
  it("drops a post deleted outside the site", () => {
    expect(buildQueue([], [approval()], new Set(), none)).toEqual([]);
  });
  it("drops a rejection whose draft is gone, but keeps it when drafts can't be read", () => {
    expect(buildQueue([], [approval({ state: "rejected" })], new Set(), none)).toEqual([]);
    expect(buildQueue([], [approval({ state: "rejected" })], null, none)).toHaveLength(1);
  });
  it("returns a republished rejection to waiting", () => {
    const [item] = buildQueue([post({ revision: "r2" })], [approval({ state: "rejected" })], new Set(), none);
    expect(item.state).toBe("submitted");
  });
});
