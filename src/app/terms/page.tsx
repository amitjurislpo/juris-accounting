import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Terms of service | Juris Accounting",
  description: "Placeholder terms of service for Juris Accounting.",
};

const sections = [
  {
    heading: "Services",
    body: "Services are defined in your engagement letter, which takes precedence over this page in any conflict. [Confirm with legal counsel before publishing]",
  },
  {
    heading: "Fees",
    body: "[Add approved billing terms — frequency, invoicing, and payment methods]",
  },
  {
    heading: "Your responsibilities",
    body: "You remain responsible for the completeness and accuracy of information provided to us. [Confirm final wording with legal counsel]",
  },
  {
    heading: "Scope of professional services",
    body: "[Confirm the exact scope, limitations, and any assurance disclaimers with a qualified professional before publishing]",
  },
  {
    heading: "Termination",
    body: "[Add approved termination and notice terms]",
  },
  {
    heading: "Governing law",
    body: "[Confirm governing jurisdiction before publishing]",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        description="Placeholder content. This page must be reviewed and approved before the site goes live."
      />
      <Section>
        <Reveal className="flex max-w-2xl flex-col gap-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl text-fg">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
