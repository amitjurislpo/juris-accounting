"use client";

import dynamic from "next/dynamic";
import { sanityConfigured } from "@/sanity/env";
import config from "@/sanity/config";

// Client-only: the Studio creates a Sanity client on render, which would be a
// server error on this route whenever the project id is missing.
const NextStudio = dynamic(() => import("next-sanity/studio").then((m) => m.NextStudio), { ssr: false });

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <p style={{ fontFamily: "system-ui, sans-serif", padding: 32 }}>
        The Studio isn&apos;t connected yet: NEXT_PUBLIC_SANITY_PROJECT_ID is not set for this deployment.
      </p>
    );
  }
  return <NextStudio config={config} />;
}
