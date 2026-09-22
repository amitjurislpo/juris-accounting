"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/cn";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(items[0]?.slug ?? null);

  return (
    <div data-testid="faq-accordion" className="divide-y divide-hairline border-y border-hairline">
      {items.map((item) => {
        const isOpen = openSlug === item.slug;
        return (
          <div key={item.slug}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.slug}`}
              onClick={() => setOpenSlug(isOpen ? null : item.slug)}
            >
              <span className="font-display text-lg text-charcoal md:text-xl">
                {item.question}
              </span>
              <Plus
                size={20}
                className={cn(
                  "shrink-0 text-forest transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
                aria-hidden
              />
            </button>
            <div
              id={`faq-panel-${item.slug}`}
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0">
                <p className="max-w-2xl text-sm leading-relaxed text-charcoal-soft md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
