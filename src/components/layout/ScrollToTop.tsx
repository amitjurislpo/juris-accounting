"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const SHOW_AFTER = 300;
const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Back-to-top button on the left edge. A gold ring fills as the page is read,
 * with the scroll percentage under the arrow. Appears after a short scroll.
 */
export function ScrollToTop() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setPercent(max > 0 ? Math.min(100, Math.max(0, Math.round((y / max) * 100))) : 0);
      setVisible(y > SHOW_AFTER);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
      aria-label={`Scroll to top, ${percent}% of the page read`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "group fixed bottom-5 left-4 z-30 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-line-strong bg-surface/80 text-silver shadow-float backdrop-blur-md transition-[opacity,translate,scale,border-color,background-color] duration-300 hover:scale-105 hover:border-gold hover:bg-surface-hover md:bottom-6 md:left-6 md:h-16 md:w-16",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg viewBox="0 0 60 60" className="pointer-events-none absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="30" cy="30" r={RADIUS} fill="none" stroke="var(--line)" strokeWidth="2" />
        <circle
          cx="30"
          cy="30"
          r={RADIUS}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
        />
      </svg>
      <ArrowUp size={16} className="relative transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
      <span className="relative mt-0.5 font-mono text-[10px] font-medium leading-none tabular-nums text-fg-muted">
        {percent}%
      </span>
    </button>
  );
}
