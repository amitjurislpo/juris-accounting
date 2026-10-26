# Adding a new blog post (Juris CFO)

Use this when the user says "add this blog" and gives a **PDF** (content + SEO metadata), an **image** and a **category**.
A new post means exactly two things: **(1)** one entry in `BLOG_POSTS`-style data, **(2)** its image. The hub card and the single page are generated from that entry, so no component changes are needed.

Static export (`output: "export"`). No CMS or API routes. Follow `AGENTS.md`: this Next.js version has breaking changes, check `node_modules/next/dist/docs/` before writing new framework code.

## Hard rules

- **Do not commit or push** until the user says so. Show what changed and wait.
- Work on a branch cut from the latest `dev` (`git checkout dev && git pull origin dev && git checkout -b feature/<name>`). PRs go `feature -> dev`, never straight to `main`.
- Use the PDF text verbatim. Do not rewrite or "improve" copy.
- The category comes from the user. It must be one of the ids in `blogCategories` (`src/content/blog.ts`).
- Never invent an author, credentials or bio. Use the author only if the PDF names one; leave out placeholder bios and say so.
- Do not add yellow keyword highlighting. `<strong>` the first natural occurrence of each target keyword only.
- Do not put the FAQ inside the body HTML.

## 1. Image

Convert the supplied image to JPG with sharp (`quality: 82, mozjpeg: true`) and save as `public/images/blog/<slug>.jpg`. Note width and height. Alt text = the PDF's featured-image alt text (write a plain descriptive one if missing, and tell the user).

## 2. The entry

Add an object to `blogPosts` in `src/content/blog.ts` (newest first is handled by `postsByDate`, so order does not matter):

- `slug` (PDF slug), `title` (H1), `metaTitle`, `excerpt` (= meta description, also card text and hero lede)
- `category`, `date` (today, `YYYY-MM-DD`), `readTime` (e.g. `"12 min"`; card/page append "read"), `keywords`, optional `author`, optional `trending: true`
- `image: { url: "/images/blog/<slug>.jpg", alt, width, height }`
- `bodyHtml`, `faq: [{ q, a }]`

Long copy goes in `src/content/blogPosts/<slug>.ts` (exports the HTML string and the FAQ array), imported into `blog.ts`.

### Rules for `bodyHtml`

- Section headings are plain `<h2>Heading</h2>`: no attributes, no nested tags. `BlogArticle` adds ids and builds the left-hand table of contents from them. Sub-headings use `<h3>`.
- Allowed: `<p>`, `<ul>`, `<ol>`, `<table>`, `<strong>`, `<a href='/path/'>`.
- Helper classes (styled in `globals.css`, `.blog-prose`): `<div class="callout"><p class="callout-title">..</p>..</div>`, `callout callout-green`, `<p class="short-answer">`, `<p class="table-note">`.
- Check every internal link target is a real route in `src/app` before using it. If missing, drop the link, keep the text, tell the user.

## 3. What renders automatically (do not redesign)

- Hub `/blog`: hero, category filter chips (no left sidebar), and a grid of cards: 3 equal columns on large screens, 2 on tablet, 1 on mobile. Each card has a rounded image, category, read time, title, excerpt, date and an arrow, and links to the post. Posts also land in `sitemap.xml` and `llms.txt`. The hub is indexable (no `noindex`).
- `/blog/<slug>`: hero, **Back to blog** (top only, never repeated at the bottom), rounded banner image (fixed height, cropped with object-cover), a row with author/date/read time on the left and share icons (Facebook, X, LinkedIn, WhatsApp) on the right, then a sticky table of contents on the left and the body on the right. After the body: the "not advice" note, then the FAQ accordion (shared `FaqAccordion` with `compact`) at the end of the right column. Article + FAQPage JSON-LD and breadcrumb schema are emitted; canonical comes from the layout.
- Do not add a categories sidebar, a second back button, "coming soon" cards, or move the FAQ out of the right column.

## 4. Verify

1. `npx tsc --noEmit` and `npx eslint src` clean.
2. `npx next dev -p 3001` (port 3000 may belong to another project; do not kill it).
3. Check `/blog` (new card, image, no `noindex`) and `/blog/<slug>` (200, title, canonical, og:image, TOC matches the `<h2>`s, share icons, FAQ last), plus `/sitemap.xml`.
4. Take screenshots and look at them.

## 5. Report back

List what was added and anything skipped or changed (missing links, missing author, alt text). Then stop and wait; do not commit or push until told.
