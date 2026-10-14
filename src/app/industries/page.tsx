import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { seoMetadata, seoPages } from "@/content/seo";
import { SeoContent } from "@/components/seo/SeoContent";

export const metadata: Metadata = seoMetadata("/industries", {
  title: "Industries | Juris Accounting",
  description:
    "Bookkeeping, accounting, and taxation services structured to support almost every industry.",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={seoPages["/industries"]?.h1 ?? "Almost every industry needs the same financial discipline"}
        description="The details of your records differ by industry — the need for accurate bookkeeping, clear accounting, and timely taxation doesn't."
      />
      <SeoContent path="/industries" part="intro" />
      <IndustryGrid />
      <SeoContent path="/industries" part="faq" />
      <FinalCta />
    </>
  );
}
