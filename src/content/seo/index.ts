import type { Metadata } from "next";
import type { SeoPageContent } from "./types";
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

/** Page-level metadata from the SEO content; falls back to `fallback` when a route has none. */
export function seoMetadata(path: string, fallback: Metadata): Metadata {
  const page = seoPages[path];
  if (!page) return fallback;
  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: { title: page.title, description: page.metaDescription, type: "website" },
  };
}
