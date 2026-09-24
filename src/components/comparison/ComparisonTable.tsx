"use client";

import { useState } from "react";
import { comparisonRows } from "@/content/comparison";
import { services, type ServiceId } from "@/content/services";
import { Link } from "@/components/ui/AppLink";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

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

  return (
    <div>
      <div
        className="overflow-x-auto overflow-y-hidden rounded-card border border-line bg-surface shadow-[0_30px_60px_-45px_rgba(0,0,0,0.5)]"
        tabIndex={0}
        role="region"
        aria-label="Bookkeeping, accounting, and taxation comparison table"
      >
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-surface text-fg">
              <th className="w-1/4 px-4 py-4 text-left font-mono text-[11px] uppercase tracking-[0.16em] text-platinum">
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
                      "w-full select-none px-4 py-4 text-left font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300",
                      highlighted === col.id ? "bg-platinum text-void" : "text-fg hover:text-platinum",
                    )}
                  >
                    {col.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.dimension}
                className={cn(
                  i % 2 === 0 ? "bg-surface" : "bg-canvas",
                  "border-t border-line transition-colors duration-300 hover:bg-platinum/10",
                )}
              >
                <th scope="row" className="px-4 py-4 text-left font-display text-[15px] font-normal text-fg">
                  {row.dimension}
                </th>
                {COLUMNS.map((col) => (
                  <td
                    key={col.id}
                    className={cn(
                      "px-4 py-4 transition-colors duration-300",
                      highlighted === col.id
                        ? "bg-platinum/10 font-medium text-fg"
                        : "text-fg-muted",
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
          "grid transition-[grid-template-rows,margin] duration-500 ease-out",
          selectedService ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {selectedService && (
            <div className="recommendation-fade flex flex-wrap items-center justify-between gap-4 rounded-control border border-silver/50 bg-raised p-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-silver">
                  Selected: {selectedService.name}
                </p>
                <p className="mt-1.5 max-w-xl text-sm text-fg-muted">
                  {selectedService.oneLiner}
                </p>
              </div>
              <Link
                href={selectedService.href}
                className="flex items-center gap-2 text-sm font-medium text-silver"
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
