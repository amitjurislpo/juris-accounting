"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Masks and reveals text word-by-word, each word rising into place on a
 * stagger. Pure CSS transition (see .split-line in globals.css) driven by
 * an IntersectionObserver — no animation library needed for this effect,
 * and prefers-reduced-motion is handled by the same CSS rule site-wide.
 *
 * Text is visible by default. A layout effect (synchronous, before paint)
 * measures whether the headline is already within the initial viewport —
 * if so, it's marked revealed immediately with no animation, so an
 * above-the-fold headline (like the hero H1) never sits invisible waiting
 * on an async IntersectionObserver callback. Only headlines that measure as
 * below the fold get hidden-then-revealed-on-scroll, and since they're
 * off-screen to begin with, there's nothing to flash.
 */
export function SplitHeadline({
  text,
  className,
  wordClassName,
  baseDelay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (el.getBoundingClientRect().top < window.innerHeight * 1.1) {
      el.classList.add("is-revealed");
      return;
    }

    el.classList.add("is-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.remove("is-pending");
          el.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={cn("split-line", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className={wordClassName}
          style={{ transitionDelay: `${baseDelay + i * stagger}s` }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
