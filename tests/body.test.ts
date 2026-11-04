import { describe, expect, it } from "vitest";
import { isSafeHref, portableTextToHtml } from "@/lib/blog/portableText";
import { safeJsonLd } from "@/lib/jsonLd";
import { buildRejectedDraft } from "@/lib/blog/studioWrite";

const span = (text: string, marks: string[] = []) => ({ _type: "span", _key: text, text, marks });
const block = (style: string, ...children: object[]) => ({ _type: "block", _key: style, style, markDefs: [], children });
const linked = (href: string) => ({
  _type: "block", _key: "l", style: "normal",
  markDefs: [{ _key: "m", _type: "link", href }],
  children: [span("click", ["m"])],
});
const render = (...body: object[]) => portableTextToHtml(body);

describe("each body content type renders", () => {
  it.each([["normal", "p"], ["h2", "h2"], ["h3", "h3"], ["h4", "h4"], ["blockquote", "blockquote"]])("%s", (style, tag) => {
    expect(render(block(style, span("Text")))).toBe(`<${tag}>Text</${tag}>`);
  });
  it("bold and italic", () => {
    expect(render(block("normal", span("B", ["strong"]), span("I", ["em"])))).toBe("<p><strong>B</strong><em>I</em></p>");
  });
  it("bullet and numbered lists", () => {
    const item = (listItem: string) => ({ ...block("normal", span(listItem)), listItem, level: 1 });
    expect(render(item("bullet"))).toBe("<ul><li>bullet</li></ul>");
    expect(render(item("number"))).toBe("<ol><li>number</li></ol>");
  });
  it.each(["https://a.example/x", "http://a.example", "mailto:a@b.example", "tel:+15551234567", "/pricing", "#faq", "pricing/plans"])("link %s", (href) => {
    expect(render(linked(href))).toContain(`href="${href}"`);
  });
  it("a table from the plugin, with the first row as the header and text escaped", () => {
    const html = render({ _type: "table", _key: "t", rows: [{ _type: "tableRow", _key: "a", cells: ["H<1", "H2"] }, { _type: "tableRow", _key: "b", cells: ["v1", "v2"] }] });
    expect(html).toBe("<table><thead><tr><th>H&lt;1</th><th>H2</th></tr></thead><tbody><tr><td>v1</td><td>v2</td></tr></tbody></table>");
  });
  it("a one-row table has no header, and an empty table renders nothing", () => {
    expect(render({ _type: "table", _key: "t", rows: [{ cells: ["only"] }] })).toBe("<table><tbody><tr><td>only</td></tr></tbody></table>");
    expect(render({ _type: "table", _key: "t", rows: [] })).toBe("");
  });
  it("an inline image with alt and caption", () => {
    const html = render({ _type: "image", _key: "i", url: "https://cdn.sanity.io/x.jpg", alt: 'A "q"', caption: "<Cap>", width: 10, height: 5 });
    expect(html).toContain('alt="A &quot;q&quot;"');
    expect(html).toContain('width="10" height="5"');
    expect(html).toMatch(/^<figure><img .*\/><figcaption>&lt;Cap&gt;<\/figcaption><\/figure>$/);
  });
  it("an image with no caption has no caption element, and one with no file renders nothing", () => {
    expect(render({ _type: "image", _key: "i", url: "https://cdn.sanity.io/x.jpg", caption: " " })).not.toContain("figcaption");
    expect(render({ _type: "image", _key: "i" })).toBe("");
  });
  it("a pasted H1 becomes an H2", () => {
    expect(render(block("h1", span("T")))).toBe("<h2>T</h2>");
  });
  it("an empty body renders nothing", () => {
    expect(portableTextToHtml(null)).toBe("");
    expect(portableTextToHtml([])).toBe("");
  });
  it("escapes text", () => {
    expect(render(block("normal", span("<script>x</script>")))).not.toContain("<script>");
  });
});

describe("unsafe links", () => {
  it.each([
    "javascript:alert(1)", "JavaScript:alert(1)", " javascript:alert(1)", "java\tscript:alert(1)", "java\nscript:alert(1)",
    "\u0001javascript:alert(1)", "data:text/html,<script>alert(1)</script>", "vbscript:x", "file:///etc/passwd", "ftp://a.example",
  ])("%j keeps its text but is not a link", (href) => {
    expect(isSafeHref(href)).toBe(false);
    const html = render(linked(href));
    expect(html).toBe("<p>click</p>");
  });
  it("an empty or missing URL is not a link", () => {
    expect(render(linked(""))).toBe("<p>click</p>");
    expect(isSafeHref(undefined)).toBe(false);
  });
  it("a quote can't break out of the attribute", () => {
    expect(render(linked('/a"onclick="x'))).toContain('href="/a&quot;onclick=&quot;x"');
  });
});

describe("JSON-LD", () => {
  it("can't be closed by content, and still parses to the same text", () => {
    const text = '</script><script>alert(1)</script>';
    const out = safeJsonLd({ text });
    expect(out).not.toContain("<");
    expect(JSON.parse(out)).toEqual({ text });
  });
});

describe("sending a post back", () => {
  it("leaves the unused workflow fields exactly as they were", () => {
    const draft = buildRejectedDraft(
      { _id: "p", _type: "post", _rev: "r", title: "T", workflowStatus: "draft" },
      "p",
      { note: "n", by: "c@x.example", at: "2026-11-04T00:00:00Z" },
    );
    expect(draft).toMatchObject({ _id: "drafts.p", workflowStatus: "draft" });
    expect(draft).not.toHaveProperty("submittedBy");
  });
});
