import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { DashboardConcept } from "@/components/dashboard/DashboardConcept";

export function DashboardSection() {
  return (
    <Section tone="void" id="dashboard">
      <SectionHeading
        tone="void"
        eyebrow="See it at a glance"
        title="A financial dashboard concept, built for clarity"
        description="This is an early visual concept for a client dashboard — revenue, expenses, cash position, tax readiness, and reconciliation status, understandable in one glance. Final design and data connections are still to be confirmed."
      />
      <Reveal className="mt-10" y={20}>
        <DashboardConcept />
      </Reveal>
    </Section>
  );
}
