import type { Metadata, Viewport } from "next";

// Its own root layout: no analytics, no site CSS, no site chrome.
export const metadata: Metadata = {
  title: "Juris CFO Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
