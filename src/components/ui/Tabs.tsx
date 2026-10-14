"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Accessible tab list (role=tablist/tab, roving tabindex, arrow/Home/End
 * keys) with an indicator that slides between tabs. The indicator is
 * positioned by writing styles to its DOM node — no re-render per move.
 * Pair with a role="tabpanel" element whose id is `${idBase}-panel`.
 */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  label,
  idBase,
}: {
  items: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  idBase: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;
    const place = () => {
      const active = list.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!active) return;
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.transform = `translate3d(${active.offsetLeft}px, ${active.offsetTop}px, 0)`;
      indicator.style.height = `${active.offsetHeight}px`;
      indicator.style.opacity = "1";
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [value]);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const last = items.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    onChange(items[next]);
    listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <div ref={listRef} role="tablist" aria-label={label} className="relative flex flex-wrap gap-1.5">
      <span
        ref={indicatorRef}
        className="pointer-events-none absolute left-0 top-0 rounded-control bg-platinum opacity-0 shadow-[0_8px_24px_-12px_rgba(255,255,255,0.35)] transition-[transform,width,height,opacity] duration-500 ease-lux"
        aria-hidden
      />
      {items.map((item, i) => {
        const selected = item === value;
        return (
          <button
            key={item}
            type="button"
            role="tab"
            id={`${idBase}-tab-${i}`}
            aria-selected={selected}
            aria-controls={`${idBase}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative z-10 rounded-control border px-4 py-2 text-sm transition-[color,border-color] duration-300",
              selected ? "border-transparent text-canvas" : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
