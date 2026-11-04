import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import NotFound from "./(site)/not-found";

// The app has several root layouts, so unmatched URLs need their own document.
export const metadata: Metadata = { title: "Page not found | Juris CFO", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <SiteShell>
      <NotFound />
    </SiteShell>
  );
}
