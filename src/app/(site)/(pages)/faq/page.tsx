import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqPageContent } from "@/components/faq/FaqPageContent";
import { FinalCta } from "@/components/home/FinalCta";
import { faqItems } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ | Juris CFO",
  description:
    "Answers to common questions about bookkeeping, accounting, taxation, and how pricing works at Juris CFO.",
};

// FAQPage structured data for every question on this page (all categories),
// built from the same text the accordion shows.
const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }} />
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
