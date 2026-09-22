# Juris Accounting — static website

First static website build for Juris Accounting: a bookkeeping, accounting,
and taxation services site built for visibility, client education, and
self-qualification ahead of a sales conversation.

## Stack

- Next.js 16 (App Router), static export (`output: "export"`)
- TypeScript, Tailwind CSS v4
- GSAP for scroll/reveal animation (respects `prefers-reduced-motion`)
- Lucide icons
- Playwright for browser validation, `@axe-core/playwright` for accessibility checks

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Production static export:

```bash
npm run build     # outputs to /out
npx serve out     # preview the static export locally
```

## Content architecture

Copy, pricing rules, FAQ, industries, process steps, and article placeholders
live in `src/content/*.ts` as typed data, kept separate from presentation
components in `src/components/`. This is intentional: a future CMS (e.g.
Sanity) can replace the `content/` files without touching the UI.

Anything not yet confirmed by the business (prices, credentials, addresses,
industries list, legal copy) is a clearly bracketed placeholder, e.g.
`[Add approved starting price]` — never an invented fact.

## Validation

```bash
npx eslint .                 # lint
npm run build                # type-check + static export
npx playwright test          # navigation, interactions, a11y, console/asset health
```

The Playwright suite (`e2e/smoke.spec.ts`) runs against the static `out/`
export via `serve`, across a desktop and a mobile (Chromium) viewport, and
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
