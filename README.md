# Juris CFO website

Website for Juris CFO: a bookkeeping, accounting,
and taxation services site built for visibility, client education, and
self-qualification ahead of a sales conversation.

## Stack

- Next.js 16 (App Router) on Vercel. Pages are prerendered; the blog regenerates every 60 seconds and `/admin` runs on the server
- Sanity (authoring only), Postgres with Prisma (blog approvals and admin login). See [docs/BLOG.md](docs/BLOG.md)
- TypeScript, Tailwind CSS v4
- GSAP for scroll/reveal animation (respects `prefers-reduced-motion`)
- Lucide icons
- Playwright for browser validation, `@axe-core/playwright` for accessibility checks

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

The site runs with no environment variables at all: it shows the static posts, and
the Studio and review page explain what is missing. `.env.example` lists every variable.

## Content architecture

Copy, pricing rules, FAQ, industries, process steps, and article placeholders
live in `src/content/*.ts` as typed data, kept separate from presentation
components in `src/components/`. New blog posts are written in Sanity Studio and
need a checker's approval; the older posts in `src/content/blogPosts/` stay as they are.

Anything not yet confirmed by the business (prices, credentials, addresses,
industries list, legal copy) is a clearly bracketed placeholder, e.g.
`[Add approved starting price]` — never an invented fact.

## Validation

```bash
npx eslint .                 # lint
npm test                     # unit tests (approval rules, SEO, slugs, Studio actions)
npm run build                # type-check + production build
npx playwright test          # navigation, interactions, a11y, console/asset health
sh scripts/test-workflow-local.sh   # blog approval workflow against a fake Sanity
```

The Playwright suite (`e2e/smoke.spec.ts`) runs against `next start`, across a desktop and a mobile (Chromium) viewport, and
covers: every route loads without console errors or broken assets, header
navigation, the services comparison table, the "which service do I need?"
flow, the pricing builder, the FAQ accordion, the dashboard concept, the
contact form, reduced-motion behavior, and axe accessibility violations.

## Notes

- The financial dashboard on the homepage (`src/components/dashboard/`) is a
  visual concept using clearly labeled demo data — not live or real client
  data. It's intentionally modular so it can be replaced once a final design
  is provided.
- The pricing page is a front-end prototype only (`Service + Module +
  Entity`) — it demonstrates how scope changes pricing, it is not a quote
  engine.
