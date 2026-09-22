import { Link } from "@/components/ui/AppLink";
import { Check, ArrowRight } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { serviceList } from "@/content/services";
import { industryPageList, type IndustryPageId } from "@/content/industryPages";

export function IndustryPage({ industryId }: { industryId: IndustryPageId }) {
  const industry = industryPageList.find((i) => i.id === industryId)!;
  const others = industryPageList.filter((i) => i.id !== industryId).slice(0, 3);

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
                  <Link href="/industries" className="hover:text-forest">
                    Industries
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-forest">{industry.name}</li>
              </ol>
            </nav>
            <Eyebrow>Built for this industry</Eyebrow>
            <h1 className="mt-4 text-4xl leading-tight text-charcoal md:text-5xl">{industry.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal-soft">
              {industry.positioning}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" glow>
                Book a consultation
              </Button>
              <Button href="/services/compare" variant="secondary">
                See our services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section tone="cream">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Where it gets complicated"
              title="Common challenges in this industry"
            />
            <ul className="mt-6 flex flex-col gap-3">
              {industry.challenges.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                  <Check size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="How we help" title="What that looks like in practice" />
            <ul className="mt-6 flex flex-col gap-3">
              {industry.weHelp.map((item) => (
                <li key={item} className="rounded-sm border border-hairline bg-ivory px-4 py-3 text-sm text-charcoal">
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
            <div key={item} className="rounded-sm border border-hairline bg-cream p-5 text-sm text-charcoal-soft">
              {item}
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="What we bring to any industry" title="Bookkeeping, accounting & taxation" />
        <Reveal staggerChildren className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceList.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group flex flex-col rounded-sm border border-hairline bg-ivory p-6 transition-colors hover:border-forest"
            >
              <h3 className="text-xl text-charcoal">{service.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{service.oneLiner}</p>
              <span className="mt-4 flex items-center gap-2 text-sm font-medium text-forest">
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
              className="group flex flex-col rounded-sm border border-hairline bg-cream p-6 transition-colors hover:border-forest"
            >
              <h3 className="text-lg text-charcoal">{other.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{other.oneLiner}</p>
              <span className="mt-4 flex items-center gap-2 text-sm font-medium text-forest">
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
