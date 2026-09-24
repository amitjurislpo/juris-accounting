"use client";

import { useState } from "react";
import { Link } from "@/components/ui/AppLink";
import { ArrowRight } from "lucide-react";
import { ServiceGlyph } from "@/components/motion/ServiceGlyph";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { serviceList } from "@/content/services";
import { cn } from "@/lib/cn";

export function ServiceOverview() {
  const [active, setActive] = useState(0);

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="One accountable partner"
        title="Bookkeeping, accounting, taxation, and controller oversight — clearly separated"
        description="Each service does a different job. Understanding the difference is the fastest way to know what you actually need."
      />

      <Reveal className="mt-8 border-t border-line">
        {serviceList.map((service, i) => {
          const isActive = active === i;
          return (
            <div key={service.id} className="relative border-b border-line">
              <span
                className={cn(
                  "absolute -left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-silver via-silver/60 to-transparent transition-transform duration-700 ease-out md:-left-8",
                  isActive ? "scale-y-100" : "scale-y-0",
                )}
                aria-hidden
              />
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="flex items-baseline gap-5 md:gap-8">
                  <span
                    className={cn(
                      "font-mono text-sm transition-colors duration-300",
                      isActive ? "text-silver" : "text-fg-muted",
                    )}
                  >
                    0{service.order}
                  </span>
                  <span
                    className={cn(
                      "font-display text-2xl transition-[color,translate] duration-500 ease-out sm:text-3xl md:text-4xl",
                      isActive ? "translate-x-2 text-fg" : "text-fg-muted group-hover:text-fg",
                    )}
                  >
                    {service.name}
                  </span>
                </span>
                <ArrowRight
                  size={22}
                  className={cn(
                    "shrink-0 text-silver transition-transform duration-500 ease-out",
                    isActive && "translate-x-1 -rotate-45",
                  )}
                  aria-hidden
                />
              </button>

              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-out",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="grid items-center gap-8 pb-9 md:grid-cols-[1fr_auto]">
                    <div>
                      <p className="max-w-lg text-sm leading-relaxed text-fg-muted md:text-base">
                        {service.oneLiner}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {service.keyActions.map((action) => (
                          <li
                            key={action}
                            className="rounded-xs border border-line bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-silver"
                          >
                            {action}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={service.href}
                        className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-silver"
                      >
                        Explore {service.shortName.toLowerCase()}
                        <ArrowRight size={16} className="transition-transform duration-500 group-hover/link:translate-x-1" aria-hidden />
                      </Link>
                    </div>
                    <div className="relative h-28 w-28 shrink-0 border border-line bg-surface/60 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                      <ServiceGlyph kind={service.icon} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
