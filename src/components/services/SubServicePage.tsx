import { Link } from "@/components/ui/AppLink";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { extraServices, type ExtraServiceId, type SubService } from "@/content/extraServices";

export function SubServicePage({
  serviceId,
  sub,
}: {
  serviceId: ExtraServiceId;
  sub: SubService;
}) {
  const service = extraServices[serviceId];
  const siblings = service.subServices.filter((s) => s.slug !== sub.slug).slice(0, 3);

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
              <ol className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wide text-charcoal-soft">
                <li>
                  <Link href="/" className="hover:text-forest">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href={service.href} className="hover:text-forest">
                    {service.name}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-forest">{sub.name}</li>
              </ol>
            </nav>
            <Eyebrow>{service.name}</Eyebrow>
            <h1 className="mt-4 text-4xl leading-tight text-charcoal md:text-5xl">{sub.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal-soft">{sub.oneLiner}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" glow>
                Book a consultation
              </Button>
              <Button href={service.href} variant="secondary">
                All {service.shortName.toLowerCase()} services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Reveal className="max-w-2xl">
          {sub.body.map((p) => (
            <p key={p} className="mt-4 text-base leading-relaxed text-charcoal-soft first:mt-0">
              {p}
            </p>
          ))}
          <p className="mt-6 font-mono text-xs uppercase tracking-wide text-forest">
            [Confirm approved starting price] — indicative only
          </p>
        </Reveal>
      </Section>

      {siblings.length > 0 && (
        <Section tone="cream">
          <SectionHeading eyebrow={`More in ${service.shortName.toLowerCase()}`} title="Related services" />
          <Reveal staggerChildren className="mt-8 grid gap-5 sm:grid-cols-3">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`${service.href}/${s.slug}`}
                className="group flex flex-col rounded-sm border border-hairline bg-ivory p-6 transition-colors hover:border-forest"
              >
                <h3 className="text-lg text-charcoal">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{s.oneLiner}</p>
                <span className="mt-4 flex items-center gap-2 text-sm font-medium text-forest">
                  Learn more
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </Reveal>
          <div className="mt-6">
            <Button href={service.href} variant="ghost">
              See all {service.shortName.toLowerCase()} services →
            </Button>
          </div>
        </Section>
      )}
    </>
  );
}
