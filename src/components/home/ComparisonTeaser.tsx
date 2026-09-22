import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ComparisonTable } from "@/components/comparison/ComparisonTable";
import { Button } from "@/components/ui/Button";

export function ComparisonTeaser() {
  return (
    <Section tone="cream" id="compare">
      <SectionHeading
        eyebrow="The distinction that matters"
        title="Bookkeeping vs. accounting vs. taxation"
        description="Most confusion about pricing and scope comes from treating these as one service. They're not."
        wide
      />
      <Reveal className="mt-10">
        <ComparisonTable limit={4} />
        <div className="mt-6">
          <Button href="/services/compare" variant="ghost">
            See the full comparison →
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
