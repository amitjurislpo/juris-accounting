"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { industries, industriesNote } from "@/content/industries";
import { cn } from "@/lib/cn";

export function IndustryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const activeIndustry = active !== null ? industries[active] : null;

  return (
    <Section tone="raised" id="industries">
      <SectionHeading
        eyebrow="Broad coverage"
        title="Built to support almost every industry"
        description="Bookkeeping, accounting, and taxation apply the same way across most industries — the details of your records change, the discipline doesn't."
      />

      <Reveal className="relative mt-14">
        <div className="no-scrollbar relative overflow-x-auto pb-4">
          <div className="relative flex min-w-max items-center gap-3 px-1 py-8">
            <div
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-silver/40 to-transparent"
              aria-hidden
            />
            {industries.map((industry, i) => {
              const isActive = active === i;
              return (
                <button
                  key={industry.name}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    "relative z-10 shrink-0 rounded-control border px-5 py-3 text-sm font-medium transition-[background-color,border-color,color,box-shadow,scale] duration-500 ease-out",
                    isActive
                      ? "scale-110 border-fg bg-fg text-canvas shadow-[0_18px_40px_-16px_rgba(255,255,255,0.3)]"
                      : "border-line bg-canvas text-fg hover:border-silver",
                  )}
                >
                  {industry.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-2 flex h-6 items-center justify-center text-center">
          <p
            className={cn(
              "font-mono text-xs uppercase tracking-wide text-silver transition-opacity duration-300",
              activeIndustry ? "opacity-100" : "opacity-0",
            )}
          >
            {activeIndustry?.note}
          </p>
        </div>
      </Reveal>

      <p className="mt-6 max-w-2xl font-mono text-xs text-fg-muted">
        {industriesNote}
      </p>
    </Section>
  );
}
