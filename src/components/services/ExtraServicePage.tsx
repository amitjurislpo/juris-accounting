import { Link } from "@/components/ui/AppLink";
import { Check, X, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { serviceList } from "@/content/services";
import { extraServices, type ExtraServiceId } from "@/content/extraServices";

export function ExtraServicePage({ serviceId }: { serviceId: ExtraServiceId }) {
  const service = extraServices[serviceId];

  return (
    <>
      <PageHero
        eyebrow="Beyond the core three"
        title={service.name}
        description={service.positioning}
        crumbs={[{ label: service.name }]}
      >
        <Button href="/contact" glow>
          Book a consultation
        </Button>
        <Button href="/pricing" variant="secondary">
          See pricing
        </Button>
      </PageHero>

      <Section tone="raised">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="What's included" title={`What ${service.name.toLowerCase()} covers`} />
            <ul className="mt-6 flex flex-col gap-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-fg">
                  <Check size={18} className="mt-0.5 shrink-0 text-silver" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="What you get" title="Typical outputs" />
            <ul className="mt-6 flex flex-col gap-3">
              {service.outputs.map((item) => (
                <li key={item} className="rounded-control border border-line bg-canvas px-4 py-3 text-sm text-fg">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-xs uppercase tracking-wide text-silver">
              [Confirm approved starting price] — indicative only
            </p>
          </Reveal>
        </div>
      </Section>

      {service.subServices.length > 0 && (
        <Section id="sub-services">
          <SectionHeading eyebrow="Look closer" title={`${service.shortName} services, broken down`} />
          <Reveal staggerChildren className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.subServices.map((sub) => (
              <Link
                key={sub.slug}
                href={`${service.href}/${sub.slug}`}
                className="lux-card group flex flex-col rounded-control p-6"
              >
                <h3 className="text-lg text-fg">{sub.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{sub.oneLiner}</p>
                <span className="mt-4 flex items-center gap-2 text-sm font-medium text-silver">
                  Learn more
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </Reveal>
        </Section>
      )}

      <Section tone="raised">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Good fit" title={`${service.name} is a good fit if`} />
            <ul className="mt-6 flex flex-col gap-3">
              {service.goodFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-fg-muted">
                  <Check size={18} className="mt-0.5 shrink-0 text-silver" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Not included" title="What this service doesn't cover" />
            <ul className="mt-6 flex flex-col gap-3">
              {service.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-fg-muted">
                  <X size={18} className="mt-0.5 shrink-0 text-fg-muted" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Not quite right?" title="Our core services" />
        <Reveal staggerChildren className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceList.map((other) => (
            <Link
              key={other.id}
              href={other.href}
              className="lux-card group flex flex-col rounded-control p-6"
            >
              <h3 className="text-xl text-fg">{other.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{other.oneLiner}</p>
              <span className="mt-4 flex items-center gap-2 text-sm font-medium text-silver">
                Learn more
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </Reveal>
        <div className="mt-6">
          <Button href="/services/compare" variant="ghost">
            Compare bookkeeping, accounting &amp; taxation →
          </Button>
        </div>
      </Section>
    </>
  );
}
