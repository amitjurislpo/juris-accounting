import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { DashboardConcept } from "@/components/dashboard/DashboardConcept";

export function DashboardSection() {
  return (
    <Section tone="void" id="dashboard">
      <SectionHeading
        tone="void"
        eyebrow="See it at a glance"
        title="A financial dashboard, built for clarity"
        description="Revenue, expenses, cash position, tax readiness, and reconciliation status — understandable in one glance."
      />
      <Reveal className="mt-10" y={20}>
        <DashboardConcept />
      </Reveal>
    </Section>
  );
}
