import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqPageContent } from "@/components/faq/FaqPageContent";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "FAQ | Juris Accounting",
  description:
    "Answers to common questions about bookkeeping, accounting, taxation, and how pricing works at Juris Accounting.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="If your question isn't answered here, it's the fastest thing to ask directly."
      />
      <Section>
        <FaqPageContent />
      </Section>
      <FinalCta />
    </>
  );
}
