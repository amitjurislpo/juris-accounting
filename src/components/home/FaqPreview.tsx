import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { faqItems } from "@/content/faq";

export function FaqPreview() {
  const preview = faqItems.slice(0, 5);
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="Before you reach out"
        title="Frequently asked questions"
      />
      <Reveal className="mt-8">
        <FaqAccordion items={preview} />
        <div className="mt-6">
          <Button href="/faq" variant="ghost">
            See all FAQs →
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
