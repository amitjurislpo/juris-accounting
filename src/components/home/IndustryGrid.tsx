import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { industries } from "@/content/industries";

/** One pass of the industry cards. The marquee renders it twice so the
    loop is seamless; the second copy is hidden from assistive tech. */
function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {industries.map((industry) => (
        <li
          key={industry.name}
          className="shrink-0 rounded-control border border-line bg-canvas px-5 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-silver"
        >
          {industry.name}
        </li>
      ))}
    </ul>
  );
}

export function IndustryGrid() {
  return (
    <Section tone="raised" id="industries">
      <SectionHeading
        eyebrow="Broad coverage"
        title="Built to support almost every industry"
        description="Bookkeeping, accounting, and taxation apply the same way across most industries — the details of your records change, the discipline doesn't."
      />

      <Reveal className="relative mt-8">
        <div className="marquee relative overflow-hidden py-2">
          <div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-silver/40 to-transparent"
            aria-hidden
          />
          <div className="marquee-track relative flex w-max">
            <Row />
            <Row hidden />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
