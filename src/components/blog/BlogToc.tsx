"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type TocItem = { id: string; title: string };

/** Sticky table of contents; highlights the section currently in view. */
export function BlogToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver">Table of contents</p>
      <ol className="mt-4 flex max-h-[60vh] flex-col overflow-y-auto border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l px-4 py-2 text-sm transition-colors hover:border-gold hover:text-fg",
                active === item.id ? "border-gold text-fg" : "border-transparent text-fg-muted",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
