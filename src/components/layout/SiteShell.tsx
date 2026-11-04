import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButton } from "@/components/layout/FloatingContactButton";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { InteractionLayer } from "@/components/motion/InteractionLayer";
import { site, siteUrl } from "@/content/site";
import { motionBootScript } from "@/lib/motion";
import type { ReactNode } from "react";

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

// Identity schema: who owns the site. Only facts already published on the site;
// add address, logo and sameAs (social profiles) once the business confirms them.
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: `${siteUrl}/`,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: site.email,
    telephone: site.phone,
    availableLanguage: "English",
  },
};
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: site.name,
  url: `${siteUrl}/`,
  publisher: { "@id": `${siteUrl}/#organization` },
};

/** Font classes, shared with the admin area. */
export const fontClasses = `${geist.variable} ${instrumentSerif.variable} ${geistMono.variable}`;

/**
 * The public site's document: analytics, identity schema and chrome. The admin area
 * and the Studio have their own root layouts, so none of this reaches them.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the boot script below adds data-js to
    // <html> before React hydrates — an expected, one-level difference.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontClasses} h-full`}
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- this is the root layout, moved here to share it with global-not-found */}
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
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
