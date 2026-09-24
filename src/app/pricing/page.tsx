import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { PricingBuilder } from "@/components/pricing/PricingBuilder";
import { pricingAssumptions } from "@/content/pricing";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Pricing | Juris Accounting",
  description:
    "See how bookkeeping, accounting, and taxation pricing is structured around Service, Module, and Entity — and get an indicative starting point.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing guide (prototype)"
        title="Pricing starts with understanding your business"
        description="Select what you need below. This is a front-end prototype to help you understand how scope drives pricing — not a live quote engine."
      />
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

      <FinalCta />
    </>
  );
}
