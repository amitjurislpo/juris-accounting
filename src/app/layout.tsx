import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButton } from "@/components/layout/FloatingContactButton";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { InteractionLayer } from "@/components/motion/InteractionLayer";
import { site, siteUrl } from "@/content/site";
import { motionBootScript } from "@/lib/motion";

// Geist carries display and body type (tight-tracked at display sizes);
// Instrument Serif is reserved for italic accent words; Geist Mono for
// uppercase metadata labels.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GA_ID = "G-3T86CL41BR";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // "./" makes each page's canonical its own URL (e.g. /bookkeeping), so no
  // per-page setting is needed and duplicate-URL signals consolidate.
  alternates: { canonical: "./" },
  title: `${site.name} — Bookkeeping, Accounting & Taxation`,
  description: site.description,
  // Google Search Console ownership verification (HTML tag method).
  verification: { google: "GbnhFHMpIFgdFistbilLLU6XB9fdRklOU734ONRLddU" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the boot script below adds data-js to
    // <html> before React hydrates — an expected, one-level difference.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full`}
    >
      <head>
        {/* Google tag (gtag.js) — Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans text-fg antialiased">
        <InteractionLayer />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContactButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
