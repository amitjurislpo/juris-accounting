"use client";

import { useEffect, useRef, useState } from "react";
import { comparisonRows } from "@/content/comparison";
import { services, type ServiceId } from "@/content/services";
import { Link } from "@/components/ui/AppLink";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

const COLUMNS: { id: ServiceId; label: string; key: "bookkeeping" | "accounting" | "taxation" }[] = [
  { id: "bookkeeping", label: "Bookkeeping", key: "bookkeeping" },
  { id: "accounting", label: "Accounting", key: "accounting" },
  { id: "taxation", label: "Taxation", key: "taxation" },
];

export function ComparisonTable({ limit }: { limit?: number }) {
  const rows = limit ? comparisonRows.slice(0, limit) : comparisonRows;
  const [selected, setSelected] = useState<ServiceId | null>(null);
  const [hovered, setHovered] = useState<ServiceId | null>(null);
  const selectedService = selected ? services[selected] : null;
  const highlighted = hovered ?? selected;
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const body = bodyRef.current;
    if (!wrap || !body) return;
    if (prefersReducedMotion()) return;
    // Already-visible-on-load tables skip the animation entirely, rather
    // than jumping down and fading out for a moment before animating back
    // to their already-correct position (see Reveal.tsx for the same fix).
    if (wrap.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(Array.from(body.children), {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div
        ref={wrapRef}
        className="overflow-x-auto overflow-y-hidden rounded-sm border border-hairline"
        tabIndex={0}
        role="region"
        aria-label="Bookkeeping, accounting, and taxation comparison table"
      >
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-forest text-ivory">
              <th className="w-1/4 px-4 py-3 text-left font-mono text-xs uppercase tracking-wide">
                Dimension
              </th>
              {COLUMNS.map((col) => (
                <th key={col.id} className="w-1/4 p-0 text-left">
                  <button
                    type="button"
                    onClick={() => setSelected(selected === col.id ? null : col.id)}
                    onMouseEnter={() => setHovered(col.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(col.id)}
                    onBlur={() => setHovered(null)}
                    aria-pressed={selected === col.id}
                    className={cn(
                      "w-full select-none px-4 py-3 text-left font-mono text-xs uppercase tracking-wide transition-colors",
                      highlighted === col.id ? "bg-emerald text-void" : "text-ivory",
                    )}
                  >
                    {col.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody ref={bodyRef}>
            {rows.map((row, i) => (
              <tr
                key={row.dimension}
                className={cn(
                  i % 2 === 0 ? "bg-ivory" : "bg-cream",
                  "transition-colors hover:bg-emerald/5",
                )}
              >
                <th scope="row" className="px-4 py-3.5 text-left font-medium text-charcoal">
                  {row.dimension}
                </th>
                {COLUMNS.map((col) => (
                  <td
                    key={col.id}
                    className={cn(
                      "px-4 py-3.5 transition-colors",
                      highlighted === col.id
                        ? "bg-emerald/10 font-medium text-charcoal"
                        : "text-charcoal-soft",
                    )}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-400 ease-out",
          selectedService ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {selectedService && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-forest bg-cream p-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-forest">
                  Selected: {selectedService.name}
                </p>
                <p className="mt-1.5 max-w-xl text-sm text-charcoal-soft">
                  {selectedService.oneLiner}
                </p>
              </div>
              <Link
                href={selectedService.href}
                className="flex items-center gap-2 text-sm font-medium text-forest"
              >
                Explore {selectedService.shortName.toLowerCase()}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
