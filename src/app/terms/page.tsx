import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Terms of service | Juris Accounting",
  description: "Terms of service for Juris Accounting.",
};

const sections = [
  {
    heading: "Services",
    body: "Services are defined in your engagement letter, which takes precedence over this page in any conflict.",
  },
  {
    heading: "Fees",
    body: "Fees, billing frequency, and payment methods are set out in your engagement letter. Invoices are issued in line with that agreement and are payable by the due date shown.",
  },
  {
    heading: "Your responsibilities",
    body: "You remain responsible for the completeness and accuracy of information provided to us.",
  },
  {
    heading: "Scope of professional services",
    body: "Our services are accounting, bookkeeping, and taxation support. Nothing on this website or in our general communications is legal, investment, or audit assurance advice.",
  },
  {
    heading: "Termination",
    body: "Either party may end an engagement by written notice as set out in your engagement letter. Work completed up to the end date remains payable, and we will return your records on request.",
  },
  {
    heading: "Governing law",
    body: "These terms are governed by the laws of the jurisdiction specified in your engagement letter.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        description="The terms that apply when you use this website and engage our services."
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
