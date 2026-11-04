import type { Metadata } from "next";
import "../globals.css";
import { fontClasses } from "@/components/layout/SiteShell";

// Its own root layout: same look as the site, but no analytics and no site chrome.
export const metadata: Metadata = {
  title: "Juris CFO Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontClasses} h-full`}>
      <body className="min-h-full font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
