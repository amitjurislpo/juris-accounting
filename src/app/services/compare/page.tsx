import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ComparisonTable } from "@/components/comparison/ComparisonTable";
import { ServiceOverview } from "@/components/home/ServiceOverview";
import { AdditionalServices } from "@/components/services/AdditionalServices";
import { WhichServiceFlow } from "@/components/home/WhichServiceFlow";
import { FinalCta } from "@/components/home/FinalCta";
import { seoMetadata, seoPages } from "@/content/seo";
import { SeoContent } from "@/components/seo/SeoContent";

export const metadata: Metadata = seoMetadata("/services/compare", {
  title: "Compare bookkeeping, accounting & taxation | Juris Accounting",
  description:
    "A side-by-side comparison of bookkeeping, accounting, and taxation services, with a quick tool to identify which one fits your situation.",
});

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Services compared"
        title={seoPages["/services/compare"]?.h1 ?? "Bookkeeping, accounting, and taxation — side by side"}
        description="These three services are often bundled together in conversation, but they solve different problems. Here's the distinction, in full."
      />
      <SeoContent path="/services/compare" part="intro" />
      <Section>
        <Reveal>
          <ComparisonTable />
        </Reveal>
      </Section>
      <ServiceOverview />
      <AdditionalServices />
      <WhichServiceFlow />
      <SeoContent path="/services/compare" part="faq" />
      <FinalCta />
    </>
  );
}
