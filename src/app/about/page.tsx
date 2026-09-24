import type { Metadata } from "next";
import { Target, MessageCircle, RefreshCw, Handshake } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { TeamGrid } from "@/components/about/TeamGrid";

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

      <Section tone="raised">
        <SectionHeading eyebrow="How we work" title="Our approach" />
        <Reveal staggerChildren className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((item) => (
            <div key={item.title} className="rounded-control border border-line bg-surface p-7">
              <span className="icon-draw block text-silver" aria-hidden>
                <item.icon size={24} />
              </span>
              <h3 className="mt-3 text-lg text-fg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="What we do" title="Bookkeeping, accounting, taxation, and controller oversight" />
            <p className="mt-5 text-sm leading-relaxed text-fg-muted md:text-base">
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
            <p className="mt-5 text-sm leading-relaxed text-fg-muted md:text-base">
              Every engagement starts with understanding your entity structure,
              transaction volume, and reporting needs. That shapes which
              services you need and how pricing is confirmed — covered in
              full on our{" "}
              <Link href="/pricing" className="text-silver underline decoration-silver/40 underline-offset-4 transition-colors hover:decoration-silver">
                pricing page
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <SectionHeading
          eyebrow="Who we are"
          title="Meet the team"
          description="The people behind every engagement. Names, roles, and formal credentials will be finalized once approved. [Add approved company background]"
        />
        <TeamGrid />
      </Section>

      <FinalCta />
    </>
  );
}
