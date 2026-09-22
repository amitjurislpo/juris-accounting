"use client";

import { useState } from "react";
import { Link } from "@/components/ui/AppLink";
import { BookOpen, LineChart, Receipt, ClipboardCheck, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { serviceList } from "@/content/services";
import { cn } from "@/lib/cn";

const icons = {
  ledger: BookOpen,
  chart: LineChart,
  receipt: Receipt,
  controller: ClipboardCheck,
} as const;

export function ServiceOverview() {
  const [active, setActive] = useState(0);

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="One accountable partner"
        title="Bookkeeping, accounting, taxation, and controller oversight — clearly separated"
        description="Each service does a different job. Understanding the difference is the fastest way to know what you actually need."
      />

      <Reveal className="mt-12 border-t border-hairline">
        {serviceList.map((service, i) => {
          const Icon = icons[service.icon];
          const isActive = active === i;
          return (
            <div key={service.id} className="border-b border-hairline">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="flex items-baseline gap-5 md:gap-8">
                  <span
                    className={cn(
                      "font-mono text-sm transition-colors duration-300",
                      isActive ? "text-forest" : "text-charcoal-soft",
                    )}
                  >
                    0{service.order}
                  </span>
                  <span
                    className={cn(
                      "font-display text-2xl transition-colors duration-300 sm:text-3xl md:text-4xl",
                      isActive ? "text-forest" : "text-charcoal",
                    )}
                  >
                    {service.name}
                  </span>
                </span>
                <ArrowRight
                  size={22}
                  className={cn(
                    "shrink-0 text-forest transition-transform duration-300",
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
                      <p className="max-w-lg text-sm leading-relaxed text-charcoal-soft md:text-base">
                        {service.oneLiner}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {service.keyActions.map((action) => (
                          <li
                            key={action}
                            className="rounded-full border border-hairline px-3 py-1 font-mono text-xs uppercase tracking-wide text-forest"
                          >
                            {action}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={service.href}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest"
                      >
                        Explore {service.shortName.toLowerCase()}
                        <ArrowRight size={16} aria-hidden />
                      </Link>
                    </div>
                    <div className="idle-float flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-forest/25 bg-cream">
                      <Icon className="text-forest" size={40} aria-hidden />
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
