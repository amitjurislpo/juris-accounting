import { createSchema, DEFAULT_MAX_RECURSION_DEPTH, resolveInitialValueForType } from "sanity";
import { expect, it, vi } from "vitest";
import { post } from "@/sanity/schemas/post";

// Sanity's own code on the real schema, as Studio does for a new post.
it("a new post starts on Draft, with nothing in Submitted by", async () => {
  vi.stubGlobal("window", globalThis); // The resolver expects a browser.
  const schema = createSchema({ name: "test", types: [post, { name: "table", type: "object", fields: [{ name: "rows", type: "string" }] }] });
  const value = await resolveInitialValueForType(schema.get("post")!, {}, DEFAULT_MAX_RECURSION_DEPTH, {} as never, {} as never);
  expect(value).toMatchObject({ workflowStatus: "draft", deletionRequested: false });
  expect(value).not.toHaveProperty("submittedBy");
});
