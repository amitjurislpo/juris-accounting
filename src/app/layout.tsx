import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButton } from "@/components/layout/FloatingContactButton";
import { InteractionLayer } from "@/components/motion/InteractionLayer";
import { site } from "@/content/site";
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

export const metadata: Metadata = {
  title: `${site.name} — Bookkeeping, Accounting & Taxation`,
  description: site.description,
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
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans text-fg antialiased">
        <InteractionLayer />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContactButton />
      </body>
    </html>
  );
}
