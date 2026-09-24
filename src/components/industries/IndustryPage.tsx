import { Link } from "@/components/ui/AppLink";
import { Check, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { serviceList } from "@/content/services";
import { industryPageList, type IndustryPageId } from "@/content/industryPages";

export function IndustryPage({ industryId }: { industryId: IndustryPageId }) {
  const industry = industryPageList.find((i) => i.id === industryId)!;
  const others = industryPageList.filter((i) => i.id !== industryId).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Built for this industry"
        title={industry.name}
        description={industry.positioning}
        crumbs={[{ label: "Industries", href: "/industries" }, { label: industry.name }]}
      >
        <Button href="/contact" glow>
          Book a consultation
        </Button>
        <Button href="/services/compare" variant="secondary">
          See our services
        </Button>
      </PageHero>

      <Section tone="raised">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Where it gets complicated"
              title="Common challenges in this industry"
            />
            <ul className="mt-6 flex flex-col gap-3">
              {industry.challenges.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-fg">
                  <Check size={18} className="mt-0.5 shrink-0 text-silver" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="How we help" title="What that looks like in practice" />
            <ul className="mt-6 flex flex-col gap-3">
              {industry.weHelp.map((item) => (
                <li key={item} className="rounded-control border border-line bg-canvas px-4 py-3 text-sm text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Good fit" title={`${industry.name} is a good fit if`} />
        <Reveal staggerChildren className="mt-6 grid gap-3 sm:grid-cols-3">
          {industry.goodFor.map((item) => (
            <div key={item} className="rounded-control border border-line bg-raised p-5 text-sm text-fg-muted">
              {item}
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="raised">
        <SectionHeading eyebrow="What we bring to any industry" title="Bookkeeping, accounting & taxation" />
        <Reveal staggerChildren className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceList.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="lux-card group flex flex-col rounded-control p-6"
            >
              <h3 className="text-xl text-fg">{service.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{service.oneLiner}</p>
              <span className="mt-4 flex items-center gap-2 text-sm font-medium text-silver">
                Learn more
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </Reveal>
      </Section>

      <Section>
        <SectionHeading eyebrow="Other industries" title="More industries we support" />
        <Reveal staggerChildren className="mt-8 grid gap-5 sm:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.id}
              href={other.href}
              className="lux-card group flex flex-col rounded-control p-6"
            >
              <h3 className="text-lg text-fg">{other.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{other.oneLiner}</p>
              <span className="mt-4 flex items-center gap-2 text-sm font-medium text-silver">
                Learn more
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </Reveal>
        <div className="mt-6">
          <Button href="/industries" variant="ghost">
            See all industries →
          </Button>
        </div>
      </Section>
    </>
  );
}
