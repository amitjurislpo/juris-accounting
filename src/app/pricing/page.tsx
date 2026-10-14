import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { PricingBuilder } from "@/components/pricing/PricingBuilder";
import { pricingAssumptions } from "@/content/pricing";
import { FinalCta } from "@/components/home/FinalCta";
import { seoMetadata, seoPages } from "@/content/seo";
import { SeoContent } from "@/components/seo/SeoContent";

export const metadata: Metadata = seoMetadata("/pricing", {
  title: "Pricing | Juris CFO",
  description:
    "See how bookkeeping, accounting, and taxation pricing is structured around Service, Module, and Entity — and get an indicative starting point.",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing guide"
        title={seoPages["/pricing"]?.h1 ?? "Pricing starts with understanding your business"}
        description="Select what you need below to see how scope drives pricing. Final pricing is always a tailored quote confirmed with you."
      />
      <SeoContent path="/pricing" part="intro" />
      <Section>
        <Reveal>
          <PricingBuilder />
        </Reveal>
      </Section>

      <Section tone="raised">
        <SectionHeading eyebrow="How to read this" title="Pricing assumptions" />
        <Reveal>
          <ul className="mt-6 flex flex-col gap-3">
            {pricingAssumptions.map((item) => (
              <li key={item} className="flex gap-4 rounded-control border border-line bg-surface px-5 py-4 text-sm text-fg-muted transition-colors duration-300 hover:border-silver/40">
                <span className="font-mono text-silver">→</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <SeoContent path="/pricing" part="faq" />
      <FinalCta />
    </>
  );
}
