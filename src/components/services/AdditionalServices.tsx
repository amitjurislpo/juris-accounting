import { ArrowRight } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { additionalServices, additionalServicesNote } from "@/content/additionalServices";
import { extraServiceList } from "@/content/extraServices";

export function AdditionalServices() {
  return (
    <Section tone="cream" id="more-services">
      <SectionHeading
        eyebrow="Beyond the core three"
        title="A few more ways we support your books"
        description="These sit alongside bookkeeping, accounting, and taxation for businesses that need broader coverage."
      />

      <Reveal staggerChildren className="mt-10 grid gap-5 sm:grid-cols-2">
        {extraServiceList.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="group flex flex-col rounded-sm border border-hairline bg-ivory p-6 transition-colors hover:border-forest"
          >
            <h3 className="text-xl text-charcoal">{service.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{service.oneLiner}</p>
            <span className="mt-4 flex items-center gap-2 text-sm font-medium text-forest">
              Explore {service.shortName.toLowerCase()}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        ))}
      </Reveal>

      <Reveal staggerChildren className="mt-10 grid gap-x-10 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-2">
        {additionalServices.map((service) => (
          <div key={service.name} className="border-b border-hairline pb-6">
            <h3 className="text-lg font-medium text-charcoal">{service.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">{service.note}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
        <p className="max-w-xl font-mono text-xs text-charcoal-soft">{additionalServicesNote}</p>
        <Button href="/contact">Ask about these services</Button>
      </Reveal>
    </Section>
  );
}
