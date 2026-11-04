import type { Metadata } from "next";
import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { site, siteUrl } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // "./" makes each page's canonical its own URL (e.g. /bookkeeping), so no
  // per-page setting is needed and duplicate-URL signals consolidate.
  // Single-language (US English) site: hreflang points each page at itself, so
  // there is nothing to confuse search engines. Add entries here if a
  // translated or regional version of the site is ever published.
  alternates: { canonical: "./", languages: { "en-US": "./", "x-default": "./" } },
  title: `${site.name} — Bookkeeping, Accounting & Taxation`,
  description: site.description,
  // Google Search Console ownership verification (HTML tag method).
  verification: { google: "GbnhFHMpIFgdFistbilLLU6XB9fdRklOU734ONRLddU" },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
