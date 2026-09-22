import { Link } from "@/components/ui/AppLink";
import { Check, X, ArrowRight } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
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
      <section className="relative overflow-hidden border-b border-hairline bg-cream">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.25] blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--emerald), transparent)" }}
          aria-hidden
        />
        <Container className="relative py-12 md:py-16">
          <Reveal staggerChildren stagger={0.1} className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex gap-2 font-mono text-xs uppercase tracking-wide text-charcoal-soft">
                <li>
                  <Link href="/" className="hover:text-forest">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/services/compare" className="hover:text-forest">Services</Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-forest">{service.name}</li>
              </ol>
            </nav>
            <Eyebrow>Service {service.order} of {serviceList.length}</Eyebrow>
            <h1 className="mt-4 text-4xl leading-tight text-charcoal md:text-5xl">
              {service.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal-soft">
              {service.positioning}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" glow>
                Book a consultation
              </Button>
              <Button href="/pricing" variant="secondary">
                See pricing for {service.shortName.toLowerCase()}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section tone="cream">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="What's included"
              title={`What ${service.name.toLowerCase()} covers`}
            />
            <ul className="mt-6 flex flex-col gap-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                  <Check size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="What you get" title="Typical outputs" />
            <ul className="mt-6 flex flex-col gap-3">
              {service.outputs.map((item) => (
                <li key={item} className="rounded-sm border border-hairline bg-ivory px-4 py-3 text-sm text-charcoal">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-xs uppercase tracking-wide text-forest">
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
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal-soft">
                  <Check size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Not included" title="What this service doesn't cover" />
            <ul className="mt-6 flex flex-col gap-3">
              {service.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal-soft">
                  <X size={18} className="mt-0.5 shrink-0 text-charcoal-soft" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="Not quite right?" title="Other services" />
        <Reveal staggerChildren className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.id}
              href={other.href}
              className="group flex flex-col rounded-sm border border-hairline bg-ivory p-6 transition-colors hover:border-forest"
            >
              <h3 className="text-xl text-charcoal">{other.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{other.oneLiner}</p>
              <span className="mt-4 flex items-center gap-2 text-sm font-medium text-forest">
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
