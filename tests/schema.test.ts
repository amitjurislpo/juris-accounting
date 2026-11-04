import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

vi.mock("sanity", () => {
  const identity = <T>(x: T) => x;
  return { defineField: identity, defineType: identity, defineArrayMember: identity };
});

const { post } = await import("@/sanity/schemas/post");

type Field = Record<string, never> & {
  name: string; type: string; title: string; description?: string; readOnly?: boolean; initialValue?: unknown;
  validation?: (rule: unknown) => unknown; fields?: Field[]; of?: Member[]; options?: { list?: { title: string; value: string }[] };
};
type Member = { type: string; name?: string; fields?: Field[]; styles?: { value: string }[]; lists?: { value: string }[];
  marks?: { decorators?: { value: string }[]; annotations?: Field[] } };

const fields = post.fields as unknown as Field[];
const field = (name: string) => fields.find((f) => f.name === name)!;

/** The rule calls a validation function makes. */
function rules(f: Field | undefined) {
  const calls: { name: string; args: unknown[] }[] = [];
  const rule: unknown = new Proxy({}, { get: (_, name) => (...args: unknown[]) => (calls.push({ name: String(name), args }), rule) });
  f?.validation?.(rule);
  return calls;
}
const required = (f: Field) => rules(f).some((c) => c.name === "required");

const LISTED = [
  "reviewFeedback", "deletionRequested", "title", "slug", "description", "mainImage", "author", "publishedAt", "body",
  "category", "tags", "faq", "metaTitle", "metaOgImage", "ogTitle", "ogDescription", "canonicalOverride", "focusKeyword",
  "workflowStatus", "submittedBy",
];

describe("Studio fields", () => {
  it("has every listed field in the listed order, then only the fields the pages display", () => {
    expect(fields.slice(0, LISTED.length).map((f) => f.name)).toEqual(LISTED);
    expect(fields.slice(LISTED.length).map((f) => f.name)).toEqual(["subtitle", "readTime", "trending"]);
  });
  it("uses no field groups, which would hide fields behind a tab", () => {
    expect((post as unknown as { groups?: unknown }).groups).toBeUndefined();
  });
  it("requires exactly the listed fields", () => {
    expect(fields.filter(required).map((f) => f.name)).toEqual(["title", "slug", "description", "publishedAt", "body"]);
  });
  it("labels description as briefed, and category is free text", () => {
    expect(field("description").title).toBe("Description / Excerpt");
    expect(field("category").type).toBe("string");
    expect(field("category").options).toBeUndefined();
  });
  it("main image has alt text", () => {
    expect(field("mainImage").fields!.map((f) => f.name)).toEqual(["alt"]);
  });
  it("FAQ pairs need both a question and an answer", () => {
    const pair = field("faq").of![0].fields!;
    expect(pair.map((f) => f.name)).toEqual(["question", "answer"]);
    expect(pair.every(required)).toBe(true);
  });
  it("workflow status is read-only, starts on Draft and points to the review page", () => {
    const f = field("workflowStatus");
    expect(f.readOnly).toBe(true);
    expect(f.initialValue).toBe("draft");
    expect(f.options!.list!.map((o) => o.title)).toEqual(["Draft", "In review", "Published"]);
    expect(f.description).toContain("review page");
  });
  it("submitted by is read-only, has no starting value and says it isn't used", () => {
    const f = field("submittedBy");
    expect(f.readOnly).toBe(true);
    expect(f.initialValue).toBeUndefined();
    expect(f.description).toContain("Not used");
  });
  it("the post list shows title, author and main image", () => {
    expect(post.preview!.select).toEqual({ title: "title", author: "author", media: "mainImage" });
  });
});

describe("body field", () => {
  const members = field("body").of!;
  const block = members.find((m) => m.type === "block")!;

  it("offers exactly the listed styles, with no H1", () => {
    expect(block.styles!.map((s) => s.value)).toEqual(["normal", "h2", "h3", "h4", "blockquote"]);
  });
  it("offers bold, italic, bullet and numbered lists", () => {
    expect(block.marks!.decorators!.map((d) => d.value)).toEqual(["strong", "em"]);
    expect(block.lists!.map((l) => l.value)).toEqual(["bullet", "number"]);
  });
  it("links allow http, https, mailto, tel and relative", () => {
    const uri = rules(block.marks!.annotations![0].fields![0]).find((c) => c.name === "uri")!;
    expect(uri.args[0]).toEqual({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] });
  });
  it("offers the plugin's table and inline images with alt and caption, and nothing else", () => {
    expect(members.map((m) => m.type)).toEqual(["block", "table", "image"]);
    expect(members[2].fields!.map((f) => f.name)).toEqual(["alt", "caption"]);
    expect(readFileSync("src/sanity/config.ts", "utf8")).toMatch(/plugins: \[.*table\(\).*\]/);
  });
});

describe("the site never reads the unused workflow fields", () => {
  it("names workflowStatus and submittedBy only in the schema", () => {
    const hits = execFileSync("grep", ["-rlE", "workflowStatus|submittedBy", "src"], { encoding: "utf8" }).trim().split("\n");
    expect(hits).toEqual(["src/sanity/schemas/post.ts"]);
  });
});

describe("react versions", () => {
  it("react and react-dom are pinned to the same exact version", () => {
    const { dependencies: d } = JSON.parse(readFileSync("package.json", "utf8"));
    expect(d.react).toMatch(/^\d+\.\d+\.\d+$/);
    expect(d["react-dom"]).toBe(d.react);
  });
  it("the installed versions match too", () => {
    const version = (name: string) => JSON.parse(readFileSync(`node_modules/${name}/package.json`, "utf8")).version;
    expect(version("react-dom")).toBe(version("react"));
  });
});
