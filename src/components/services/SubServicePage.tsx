import { Link } from "@/components/ui/AppLink";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
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
      <PageHero
        eyebrow={service.name}
        title={sub.name}
        description={sub.oneLiner}
        crumbs={[{ label: service.name, href: service.href }, { label: sub.name }]}
      >
        <Button href="/contact" glow>
          Book a consultation
        </Button>
        <Button href={service.href} variant="secondary">
          All {service.shortName.toLowerCase()} services
        </Button>
      </PageHero>

      <Section>
        <Reveal className="max-w-2xl">
          {sub.body.map((p) => (
            <p key={p} className="mt-4 text-base leading-relaxed text-fg-muted first:mt-0">
              {p}
            </p>
          ))}
          <p className="mt-6 font-mono text-xs uppercase tracking-wide text-silver">
            [Confirm approved starting price] — indicative only
          </p>
        </Reveal>
      </Section>

      {siblings.length > 0 && (
        <Section tone="raised">
          <SectionHeading eyebrow={`More in ${service.shortName.toLowerCase()}`} title="Related services" />
          <Reveal staggerChildren className="mt-8 grid gap-5 sm:grid-cols-3">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`${service.href}/${s.slug}`}
                className="lux-card group flex flex-col rounded-control p-6"
              >
                <h3 className="text-lg text-fg">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.oneLiner}</p>
                <span className="mt-4 flex items-center gap-2 text-sm font-medium text-silver">
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
