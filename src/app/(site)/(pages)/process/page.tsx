import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FinalCta } from "@/components/home/FinalCta";
import { seoMetadata, seoPages } from "@/content/seo";
import { SeoContent } from "@/components/seo/SeoContent";

export const metadata: Metadata = seoMetadata("/process", {
  title: "Our process | Juris CFO",
  description:
    "What happens after you contact Juris CFO — from initial consultation to ongoing bookkeeping, accounting, and taxation service.",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title={seoPages["/process"]?.h1 ?? "What happens after you reach out"}
        description="No surprises. Here's exactly how an engagement moves from first conversation to ongoing service."
      />
      <SeoContent path="/process" part="intro" />
      <ProcessSection />
      <SeoContent path="/process" part="faq" />
      <FinalCta />
    </>
  );
}
