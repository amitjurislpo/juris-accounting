import type { Metadata } from "next";
import type { SeoPageContent } from "./types";
import { seoKeywords } from "./keywords";
import { coreSeoPages } from "./core";
import { servicesSeoPages } from "./services";
import { extraSeoPages } from "./extra";
import { industriesSeoPages } from "./industries";
import { extra2SeoPages } from "./extra2";
import { industries2SeoPages } from "./industries2";

export type { SeoPageContent, SeoSection, SeoFaq } from "./types";
export { seoKeywords } from "./keywords";

const all: SeoPageContent[] = [...coreSeoPages, ...servicesSeoPages, ...extraSeoPages, ...extra2SeoPages, ...industriesSeoPages, ...industries2SeoPages];

export const seoPages: Record<string, SeoPageContent> = Object.fromEntries(all.map((p) => [p.path, p]));

/** Meta keywords for a route (primary, secondary, long-tail), or undefined when the sheet has none. */
function keywordsFor(path: string): string[] | undefined {
  const entry = seoKeywords.find((k) => k.path === path);
  return entry ? [entry.primary, ...entry.secondary, ...entry.longTail] : undefined;
}

/** Page-level metadata from the SEO content; falls back to `fallback` when a route has none. */
export function seoMetadata(path: string, fallback: Metadata): Metadata {
  const keywords = keywordsFor(path);
  const page = seoPages[path];
  if (!page) return keywords ? { ...fallback, keywords } : fallback;
  return {
    title: page.title,
    description: page.metaDescription,
    keywords,
    openGraph: { title: page.title, description: page.metaDescription, type: "website" },
  };
}
