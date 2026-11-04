import { beforeEach, describe, expect, it, vi } from "vitest";
import type { DocumentActionComponent, DocumentActionProps, DocumentActionsContext } from "sanity";

const patchExecute = vi.fn();
vi.mock("sanity", () => ({ useDocumentOperation: () => ({ patch: { execute: patchExecute } }) }));

const { resolveDocumentActions } = await import("@/sanity/documentActions");

const fake = (action: DocumentActionComponent["action"], onHandle = vi.fn()) => {
  const C: DocumentActionComponent = () => ({ label: String(action), onHandle });
  C.action = action;
  return C;
};
const builtIns = () => ["publish", "unpublish", "discardChanges", "duplicate", "delete"].map((a) => fake(a as DocumentActionComponent["action"]));
const resolve = (schemaType: string, actions = builtIns()) =>
  (resolveDocumentActions as (p: DocumentActionComponent[], c: DocumentActionsContext) => DocumentActionComponent[])(actions, { schemaType } as DocumentActionsContext);
const props = (over: object) => ({ id: "p1", type: "post", published: null, draft: null, ...over }) as unknown as DocumentActionProps;

beforeEach(() => patchExecute.mockClear());

describe("Studio actions for posts", () => {
  it("removes Unpublish and keeps the rest", () => {
    const names = resolve("post").map((a) => a.action);
    expect(names).not.toContain("unpublish");
    expect(names).toEqual(expect.arrayContaining(["publish", "delete", "duplicate", "discardChanges"]));
  });
  it("hides Delete when there is a published version", () => {
    const del = resolve("post").find((a) => a.action === "delete")!;
    expect(del(props({ published: { _id: "p1" } }))).toBeNull();
  });
  it("allows Delete for a never-published or rejected draft", () => {
    const del = resolve("post").find((a) => a.action === "delete")!;
    expect(del(props({ draft: { _id: "drafts.p1" } }))).toMatchObject({ label: "delete" });
  });
  it("leaves other document types alone", () => {
    expect(resolve("other").map((a) => a.action)).toContain("unpublish");
  });
  it("clears review feedback, then publishes", () => {
    const onHandle = vi.fn();
    const publish = resolve("post", [fake("publish", onHandle)])[0];
    publish(props({ draft: { reviewFeedback: { note: "x" } } }))!.onHandle!();
    expect(patchExecute).toHaveBeenCalledWith([{ unset: ["reviewFeedback"] }]);
    expect(onHandle).toHaveBeenCalledOnce();
    expect(patchExecute.mock.invocationCallOrder[0]).toBeLessThan(onHandle.mock.invocationCallOrder[0]);
  });
  it("publishes without patching when there is no feedback", () => {
    const onHandle = vi.fn();
    resolve("post", [fake("publish", onHandle)])[0](props({ draft: {} }))!.onHandle!();
    expect(patchExecute).not.toHaveBeenCalled();
    expect(onHandle).toHaveBeenCalledOnce();
  });
});
