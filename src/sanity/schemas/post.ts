import { defineArrayMember, defineField, defineType } from "sanity";
import { isValidSlug, slugify } from "../../lib/blog/slug";

/**
 * Fields 1-20 follow sanity/schemas/post.ts in JurisLPO, in this order. Check with
 * `npm run schema:compare`. The three fields after them exist only because this site's
 * blog pages display them. There are no field groups: a group would hide fields behind a tab.
 *
 * Approval lives in the site's database. Publishing here makes a post reviewable, not public.
 */
const LINK_SCHEMES = ["http", "https", "mailto", "tel"];

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    // 1. Written by the site when a checker rejects the post and cleared on the next
    // publish. Hidden until then. Never fetched by the public site.
    defineField({
      name: "reviewFeedback",
      title: "Review feedback",
      description: "Why a checker sent this back. Make the changes, then Publish to send it for review again.",
      type: "object",
      readOnly: true,
      hidden: ({ value }) => !value,
      fields: [
        defineField({ name: "note", title: "Feedback", type: "text", rows: 3 }),
        defineField({ name: "by", title: "Rejected by", type: "string" }),
        defineField({ name: "at", title: "Rejected at", type: "datetime" }),
      ],
    }),
    // 2
    defineField({
      name: "deletionRequested",
      title: "Request deletion",
      description:
        "Tick this and Publish to ask a checker to delete this post. It leaves the website straight away while the request is reviewed.",
      type: "boolean",
      initialValue: false,
    }),
    // 3
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    // 4
    defineField({
      name: "slug",
      title: "Slug",
      description: 'The URL: /blog/<slug>. Click "Generate" to build it from the title. Lower-case letters, digits and hyphens only.',
      type: "slug",
      options: { source: "title", maxLength: 96, slugify: (input: string) => slugify(input) },
      validation: (r) =>
        r.required().custom((value: { current?: string } | undefined) => {
          const slug = value?.current;
          if (!slug || isValidSlug(slug)) return true;
          const suggestion = slugify(slug);
          return `Use lower-case letters, digits and single hyphens only${suggestion ? `, e.g. "${suggestion}"` : ""}.`;
        }),
    }),
    // 5
    defineField({
      name: "description",
      title: "Description / Excerpt",
      description: "Shown on the blog card and at the top of the post. Also the search description.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    // 6
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    // 7
    defineField({ name: "author", title: "Author", type: "string" }),
    // 8
    defineField({
      name: "publishedAt",
      title: "Published at",
      description: "Shown on the post, and orders the blog list.",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    // 9
    defineField({
      name: "body",
      title: "Body",
      description: "The title is the page's only H1, so headings here start at H2. Each H2 appears in the table of contents.",
      type: "array",
      validation: (r) => r.required(),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (r) => r.required().uri({ allowRelative: true, scheme: LINK_SCHEMES }),
                  }),
                ],
              }),
            ],
          },
        }),
        // From the @sanity/table plugin, registered in src/sanity/config.ts.
        defineArrayMember({ type: "table" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", description: "Describe the image for accessibility and search.", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
    }),
    // 10
    defineField({ name: "category", title: "Category", description: "Optional free text.", type: "string" }),
    // 11
    defineField({
      name: "tags",
      title: "Tags",
      description: "Shown at the end of the post, and used as the page's meta keywords.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    // 12
    defineField({
      name: "faq",
      title: "FAQ",
      description: "Optional question and answer pairs. Leave empty to omit the FAQ section and its structured data.",
      type: "array",
      of: [
        defineArrayMember({
          name: "faqItem",
          title: "FAQ item",
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),

    // 13-18. Optional. Editing one changes the revision, so it needs approval like any edit.
    defineField({ name: "metaTitle", title: "Meta title", description: "The page title. Falls back to the post title.", type: "string" }),
    defineField({ name: "metaOgImage", title: "Share image", description: "Falls back to the main image.", type: "image" }),
    defineField({ name: "ogTitle", title: "Share title", description: "Falls back to the meta title, then the post title.", type: "string" }),
    defineField({ name: "ogDescription", title: "Share description", description: "Falls back to the description.", type: "text", rows: 2 }),
    defineField({
      name: "canonicalOverride",
      title: "Canonical URL",
      description: "Only when this article's original lives elsewhere. Falls back to the post's own URL.",
      type: "url",
    }),
    defineField({ name: "focusKeyword", title: "Focus keyword", description: "For editors only. Never shown on the website.", type: "string" }),

    // 19-20. Nothing writes to these and the site never reads them: any write to a
    // published post changes its revision and cancels its approval.
    defineField({
      name: "workflowStatus",
      title: "Workflow status",
      description: "Not used: this always says Draft, even on a live post. The real status is on the review page, /admin/blog-reviews.",
      type: "string",
      readOnly: true,
      initialValue: "draft",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "In review", value: "in_review" },
          { title: "Published", value: "published" },
        ],
      },
    }),
    defineField({
      name: "submittedBy",
      title: "Submitted by",
      description: "Not used: this is always empty.",
      type: "string",
      readOnly: true,
    }),

    // Not in the list above: kept because this site's blog pages display them.
    defineField({ name: "subtitle", title: "Subtitle", description: "Shown under the title.", type: "string" }),
    defineField({ name: "readTime", title: "Read time", description: 'For example "12 min". The page adds the word "read".', type: "string" }),
    defineField({ name: "trending", title: "Show in “Most trending articles”", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Published (newest first)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", author: "author", media: "mainImage" },
    prepare: ({ title, author, media }) => ({ title, subtitle: author ? `by ${author}` : undefined, media }),
  },
});
