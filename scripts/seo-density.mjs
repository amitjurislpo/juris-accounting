// Keyword coverage / density report for the SEO page content.
//   node scripts/seo-density.mjs            -> every page
//   node scripts/seo-density.mjs /bookkeeping /payroll   -> selected routes
// Counts exact phrase matches (case-insensitive, punctuation-normalised) across
// title, meta description, H1, direct answer, sections and FAQs.
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../src/content/seo");
const load = (f) => import(pathToFileURL(path.join(root, f)).href);

const { seoKeywords } = await load("keywords.ts");
const groups = await Promise.all(["core.ts", "services.ts", "extra.ts", "extra2.ts", "industries.ts", "industries2.ts"].map(load));
const pages = groups.flatMap((g) => Object.values(g).flat());
const only = process.argv.slice(2);

const norm = (s) => s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
const countOf = (hay, needle) => {
  const n = norm(needle);
  let c = 0;
  for (let i = hay.indexOf(n); i !== -1; i = hay.indexOf(n, i + n.length)) c++;
  return c;
};

const rows = [];
let problems = 0;
for (const kw of seoKeywords) {
  if (only.length && !only.includes(kw.path)) continue;
  const page = pages.find((p) => p.path === kw.path);
  if (!page) {
    console.log(`${kw.path.padEnd(48)} — no content yet`);
    continue;
  }
  const parts = [
    page.title, page.metaDescription, page.h1 ?? "", page.answer,
    ...page.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? []), ...(s.subsections ?? []).flatMap((x) => [x.heading, ...x.paragraphs])]),
    ...page.faqs.flatMap((f) => [f.question, f.answer]),
  ];
  const body = " " + norm(parts.join(" \n ")) + " ";
  const words = body.trim().split(/\s+/).length;
  const pCount = countOf(body, kw.primary);
  const pDensity = (pCount / words) * 100;
  const sec = kw.secondary.map((k) => countOf(body, k));
  const lt = kw.longTail.map((k) => countOf(body, k));
  const issues = [];
  const maxWords = page.path === "/" ? 550 : 800;
  const minWords = page.path === "/" ? 150 : 300;
  if (words < minWords || words > maxWords) issues.push(`words ${words} (want ${minWords}–${maxWords})`);
  if (pDensity < 0.5 || pDensity > 1.6) issues.push(`primary density ${pDensity.toFixed(2)}% (want 0.5–1.6, occurrences ÷ words)`);
  if (!norm(page.title).includes(norm(kw.primary)) && !norm(page.title).includes(norm(kw.primary).replace(/ services$/, ""))) issues.push("primary not in title");
  if (!norm(page.metaDescription).includes(norm(kw.primary))) issues.push("primary not in meta");
  if (page.metaDescription.length < 120 || page.metaDescription.length > 165) issues.push(`meta length ${page.metaDescription.length}`);
  if (page.title.length > 65) issues.push(`title length ${page.title.length}`);
  sec.forEach((c, i) => c < 1 && issues.push(`secondary missing: "${kw.secondary[i]}"`));
  lt.forEach((c, i) => c < 1 && issues.push(`long-tail missing: "${kw.longTail[i]}"`));
  if (page.faqs.length < 5 || page.faqs.length > 6) issues.push(`faqs ${page.faqs.length} (want 5–6)`);
  const faqQ = norm(page.faqs.map((f) => f.question).join(" \n "));
  const ltInFaq = kw.longTail.filter((k) => faqQ.includes(norm(k))).length;
  if (ltInFaq < Math.min(2, kw.longTail.length)) issues.push(`only ${ltInFaq} long-tail phrases used verbatim in FAQ questions`);
  problems += issues.length;
  rows.push({ path: kw.path, words, primary: `${pCount}x ${pDensity.toFixed(2)}%`, secondary: sec.join(","), longTail: lt.join(","), faqs: page.faqs.length, issues: issues.join("; ") || "ok" });
}
console.table(rows);
console.log(problems ? `${problems} issue(s)` : "All pages pass.");
process.exitCode = problems ? 1 : 0;
