import { Layers, Building2, SlidersHorizontal } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Button } from "@/components/ui/Button";

const pillars = [
  {
    icon: Layers,
    title: "Service",
    body: "Bookkeeping, accounting, taxation, controller services — or a combination.",
  },
  {
    icon: Building2,
    title: "Entity",
    body: "One individual, one business, or multiple entities under one engagement.",
  },
  {
    icon: SlidersHorizontal,
    title: "Module & complexity",
    body: "Transaction volume, number of accounts, and reporting needs shape the scope.",
  },
];

export function PricingExplainer() {
  return (
    <Section tone="raised" id="pricing-explainer">
      <SectionHeading
        eyebrow="How pricing works"
        title={<SplitHeadline text="Service + Module + Entity" />}
        description="Pricing isn't one flat number — it's built from what you need, how much of it, and how many entities it covers. A simple, single-entity engagement can show an indicative starting price; broader scope moves to a short consultation."
      />
      <Reveal staggerChildren className="mt-10 grid gap-5 md:grid-cols-3">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="lux-card group rounded-control p-7"
          >
            <span className="icon-draw block text-silver" aria-hidden>
              <p.icon size={24} />
            </span>
            <h3 className="mt-3 text-lg text-fg">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-8">
        <Button href="/pricing">Try the pricing guide</Button>
      </Reveal>
    </Section>
  );
}
