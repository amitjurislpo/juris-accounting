"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Decorative layer that drifts at a fraction of scroll speed. Only for
 * aria-hidden background elements (grids, glows) near the top of a page —
 * it transforms the layer directly, never anything that affects layout.
 */
export function Parallax({
  speed = 0.15,
  className,
  children,
}: {
  speed?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      // Past roughly one viewport the layer is off-screen; stop writing.
      if (y > window.innerHeight * 1.5) return;
      el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} aria-hidden>
      {children}
    </div>
  );
}
