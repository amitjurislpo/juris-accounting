import { describe, expect, it } from "vitest";
import type { BlogPost } from "@/content/blog";
import { portableTextToHtml } from "@/lib/blog/portableText";
import { buildBlogMetadata, clean, resolveBlogSeo } from "@/lib/blog/seo";
import { toBlogPost } from "@/lib/blog/toBlogPost";
import type { SanityPost } from "@/sanity/types";

const SITE = "https://www.juriscfo.com";
const image = { url: "/images/blog/a.jpg", alt: "A", width: 100, height: 50 };
const post = (over: Partial<BlogPost> = {}): BlogPost => ({
  slug: "a-post", title: "Post title", metaTitle: "", excerpt: "The excerpt", category: "accounting",
  date: "2026-01-01", readTime: "5 min", keywords: [], image, bodyHtml: "", faq: [], ...over,
});

describe("SEO fallbacks", () => {
  it("falls all the way back with no overrides, and share images are absolute", () => {
    expect(resolveBlogSeo(post())).toMatchObject({
      title: "Post title",
      description: "The excerpt",
      ogTitle: "Post title",
      ogDescription: "The excerpt",
      canonical: `${SITE}/blog/a-post`,
      canonicalIsExternal: false,
      ogImage: { url: `${SITE}/images/blog/a.jpg` },
    });
  });
  it("uses ogTitle, then metaTitle, then the title", () => {
    expect(resolveBlogSeo(post({ metaTitle: "Meta" })).ogTitle).toBe("Meta");
    expect(resolveBlogSeo(post({ metaTitle: "Meta", seo: { ogTitle: "Og" } })).ogTitle).toBe("Og");
  });
  it("uses every override", () => {
    const seo = resolveBlogSeo(post({
      metaTitle: "Meta",
      seo: { ogTitle: "Og", ogDescription: "OgD", canonical: "https://other.example/x", ogImage: { ...image, url: "https://cdn.sanity.io/o.jpg" } },
    }));
    expect(seo).toMatchObject({ title: "Meta", ogDescription: "OgD", canonical: "https://other.example/x", canonicalIsExternal: true, ogImage: { url: "https://cdn.sanity.io/o.jpg" } });
  });
  it("treats empty strings and spaces as empty", () => {
    expect(clean("   ")).toBeUndefined();
    const seo = resolveBlogSeo(post({ metaTitle: " ", seo: { ogTitle: "", ogDescription: "  ", canonical: "" } }));
    expect(seo).toMatchObject({ title: "Post title", ogTitle: "Post title", ogDescription: "The excerpt", canonical: `${SITE}/blog/a-post` });
  });
  it("ignores a canonical that isn't http(s)", () => {
    expect(resolveBlogSeo(post({ seo: { canonical: "javascript:alert(1)" } })).canonical).toBe(`${SITE}/blog/a-post`);
  });
  it("builds complete metadata", () => {
    const m = buildBlogMetadata(post());
    expect(m.alternates?.canonical).toBe(`${SITE}/blog/a-post`);
    expect(m.openGraph).toMatchObject({ title: "Post title", url: `${SITE}/blog/a-post`, type: "article" });
    expect(m.twitter).toMatchObject({ card: "summary_large_image", images: [`${SITE}/images/blog/a.jpg`] });
  });
});

describe("Sanity post mapping", () => {
  const raw = {
    id: "p", revision: "r", createdAt: "2026-03-03T00:00:00Z", updatedAt: "2026-03-04T00:00:00Z", slug: "s", title: "T",
    subtitle: "", description: "D", mainImage: { url: "https://cdn.sanity.io/m.jpg", alt: "", width: 2000, height: 1000 }, author: " ",
    category: "payroll", tags: ["a", " "], readTime: "", publishedAt: null, trending: null, body: null, faq: [{ question: "Q", answer: "A" }, { question: "", answer: "" }],
    deletionRequested: false, metaTitle: "", metaOgImage: null, ogTitle: "", ogDescription: "", canonicalOverride: "", focusKeyword: "secret-keyword", reviewFeedback: { note: "secret-feedback" },
  } as unknown as SanityPost;
  const mapped = toBlogPost(raw);

  it("applies fallbacks and scales the image", () => {
    expect(mapped).toMatchObject({ metaTitle: "T", date: "2026-03-03", keywords: ["a"], faq: [{ q: "Q", a: "A" }] });
    expect(mapped.author).toBeUndefined();
    expect(mapped.subtitle).toBeUndefined();
    expect(mapped.readTime).toBeUndefined();
    expect(mapped.tags).toEqual(["a"]);
    expect(mapped.image).toMatchObject({ alt: "T", width: 1600, height: 800 });
  });
  it("uses publishedAt for the date", () => {
    expect(toBlogPost({ ...raw, publishedAt: "2026-05-06T09:30:00Z" }).date).toBe("2026-05-06");
  });
  it("keeps free-text categories, and joins text naming a site category", () => {
    expect(toBlogPost({ ...raw, category: " Tax Tips " }).category).toBe("Tax Tips");
    expect(toBlogPost({ ...raw, category: "PAYROLL" }).category).toBe("payroll");
    expect(toBlogPost({ ...raw, category: "cfo & controller" }).category).toBe("cfo-controller");
    expect(toBlogPost({ ...raw, category: "  " }).category).toBeUndefined();
    expect(toBlogPost({ ...raw, category: null }).category).toBeUndefined();
  });
  it("never carries the focus keyword or review feedback", () => {
    expect(JSON.stringify(mapped)).not.toContain("secret-keyword");
    expect(JSON.stringify(mapped)).not.toContain("secret-feedback");
  });
});

describe("body rendering", () => {
  const block = (style: string, text: string, extra = {}) => ({ _type: "block", _key: text, style, markDefs: [], children: [{ _type: "span", _key: "s", text, marks: [] }], ...extra });
  it("renders headings in the shape the table of contents expects, with no H1", () => {
    const html = portableTextToHtml([block("h1", "One"), block("h2", "Two"), block("h3", "Three"), block("h4", "Four"), block("blockquote", "Quote")]);
    expect(html).not.toContain("<h1");
    expect(html).toContain("<h2>One</h2>");
    expect(html).toContain("<h2>Two</h2>");
    expect(html).toContain("<h4>Four</h4>");
    expect(html).toContain("<blockquote>Quote</blockquote>");
  });
  it("escapes author text and refuses unsafe links", () => {
    const html = portableTextToHtml([
      block("normal", "<script>x</script>"),
      { _type: "block", _key: "l", style: "normal", markDefs: [{ _key: "m", _type: "link", href: "javascript:alert(1)" }], children: [{ _type: "span", _key: "s", text: "click", marks: ["m"] }] },
    ]);
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("javascript:");
    expect(html).toContain("click");
  });
});
