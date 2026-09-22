import type { Metadata } from "next";
import { Target, MessageCircle, RefreshCw, Handshake } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceOverview } from "@/components/home/ServiceOverview";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "About | Juris Accounting",
  description:
    "Juris Accounting provides bookkeeping, accounting, payroll, and tax services designed to give business owners reliable financial support throughout the year.",
};

const approach = [
  {
    icon: Target,
    title: "Accuracy",
    body: "We take financial records seriously.",
  },
  {
    icon: MessageCircle,
    title: "Communication",
    body: "We keep clients informed.",
  },
  {
    icon: RefreshCw,
    title: "Consistency",
    body: "We build processes that work throughout the year.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    body: "We aim to become an extension of your business.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We're here to make the numbers easier"
        description="Managing your business is demanding enough without having to worry about whether your books are accurate, your financial records are organized, or you're ready for tax season."
      />

      <Section>
        <Reveal className="max-w-2xl">
          <p className="text-base leading-relaxed text-charcoal-soft md:text-lg">
            Our team provides bookkeeping, accounting, payroll, and tax
            services designed to give business owners reliable financial
            support throughout the year. We believe accounting should be
            accurate, understandable, and accessible — not complicated.
          </p>
        </Reveal>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="How we work" title="Our approach" />
        <Reveal staggerChildren className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((item) => (
            <div key={item.title} className="rounded-sm border border-hairline bg-ivory p-6">
              <item.icon className="text-forest" size={24} aria-hidden />
              <h3 className="mt-3 text-lg text-charcoal">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="What we do" title="Bookkeeping, accounting, taxation, and controller oversight" />
            <p className="mt-5 text-sm leading-relaxed text-charcoal-soft md:text-base">
              We treat these as distinct disciplines rather than one blended
              service. Bookkeeping keeps your transaction records accurate.
              Accounting reviews and explains what those records mean.
              Taxation prepares the return your income and activity require.
              Controller services add senior-level oversight on top. Clients
              can engage one service or several, depending on where they are.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Scope & pricing" title="Scoped to your business, not a template" />
            <p className="mt-5 text-sm leading-relaxed text-charcoal-soft md:text-base">
              Every engagement starts with understanding your entity structure,
              transaction volume, and reporting needs. That shapes which
              services you need and how pricing is confirmed — covered in
              full on our{" "}
              <Link href="/pricing" className="text-forest underline underline-offset-4">
                pricing page
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Who we are"
          title="Team, credentials, and company details"
          description="Founding story, team profiles, and formal credentials will be added here once confirmed. [Add approved company background]"
        />
      </Section>

      <ServiceOverview />
      <FinalCta />
    </>
  );
}
