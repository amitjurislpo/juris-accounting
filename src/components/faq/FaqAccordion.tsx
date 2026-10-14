"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/cn";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(items[0]?.slug ?? null);
  // Which item the pointer just opened by hovering. A click that follows a
  // hover-open keeps the item open instead of immediately collapsing it.
  const [hoverOpened, setHoverOpened] = useState<string | null>(null);

  function onHover(slug: string) {
    if (openSlug === slug) return;
    setOpenSlug(slug);
    setHoverOpened(slug);
  }

  function onToggle(slug: string) {
    if (openSlug === slug && hoverOpened === slug) {
      setHoverOpened(null);
      return;
    }
    setHoverOpened(null);
    setOpenSlug(openSlug === slug ? null : slug);
  }

  return (
    <div data-testid="faq-accordion" className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = openSlug === item.slug;
        return (
          <div key={item.slug} className="relative">
            <span
              className={cn(
                "absolute -left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-silver to-transparent transition-transform duration-700 ease-out md:-left-6",
                isOpen ? "scale-y-100" : "scale-y-0",
              )}
              aria-hidden
            />
            <button
              type="button"
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.slug}`}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") onHover(item.slug);
              }}
              onClick={() => onToggle(item.slug)}
            >
              <span
                className={cn(
                  "font-display text-lg transition-colors duration-300 md:text-[1.35rem]",
                  isOpen ? "text-fg" : "text-fg-muted group-hover:text-fg",
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center border transition-colors duration-300",
                  isOpen ? "border-silver bg-silver text-canvas" : "border-line text-silver group-hover:border-silver",
                )}
                aria-hidden
              >
                <Plus
                  size={16}
                  className={cn("transition-transform duration-500 ease-out", isOpen && "rotate-[135deg]")}
                />
              </span>
            </button>
            <div
              id={`faq-panel-${item.slug}`}
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows,opacity,padding] duration-500 ease-out",
                isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0">
                <p className="max-w-2xl text-sm leading-relaxed text-fg-muted md:text-base">
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
