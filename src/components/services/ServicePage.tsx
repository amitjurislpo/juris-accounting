import { Link } from "@/components/ui/AppLink";
import { Check, X, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { services, serviceList, type ServiceId } from "@/content/services";
import { servicePriceMeta } from "@/content/pricing";

export function ServicePage({ serviceId }: { serviceId: ServiceId }) {
  const service = services[serviceId];
  const others = serviceList.filter((s) => s.id !== serviceId);
  const priceMeta = servicePriceMeta[serviceId];

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.order} of ${serviceList.length}`}
        title={service.name}
        description={service.positioning}
        crumbs={[{ label: "Services", href: "/services/compare" }, { label: service.name }]}
      >
        <Button href="/contact" glow>
          Book a consultation
        </Button>
        <Button href="/pricing" variant="secondary">
          See pricing for {service.shortName.toLowerCase()}
        </Button>
      </PageHero>

      <Section tone="raised">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="What's included"
              title={`What ${service.name.toLowerCase()} covers`}
            />
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
              Starting from {priceMeta.startingLabel}{priceMeta.unit} — indicative only
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
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

      <Section tone="raised">
        <SectionHeading eyebrow="Not quite right?" title="Other services" />
        <Reveal staggerChildren className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other) => (
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
