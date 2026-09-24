"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { markMotionReady, prefersReducedMotion } from "@/lib/motion";

/**
 * Marks `ref`'s element as revealed the first time it scrolls into view,
 * by setting data-revealed="in" (transition playing) and then "done".
 *
 * The hidden "before" state is pure CSS scoped under html[data-js] (see
 * globals.css), applied before first paint — so content is never shown,
 * hidden, then animated back (the flash the previous GSAP reveal caused).
 * Content already in view on load simply plays its entrance once.
 *
 * The attribute is written straight to the DOM rather than via React
 * state: it isn't part of the rendered props, so it can't cause a
 * hydration mismatch or be reset by a re-render.
 */
export function useRevealOnView(
  ref: RefObject<HTMLElement | null>,
  {
    delay = 0,
    stagger = 0,
    duration = 1,
    staggerChildren = false,
    enabled = true,
  }: {
    delay?: number;
    stagger?: number;
    duration?: number;
    staggerChildren?: boolean;
    enabled?: boolean;
  } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    markMotionReady();

    const children = staggerChildren ? Array.from(el.children) : [];
    children.forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));

    let timer: number | undefined;
    const settle = () => {
      const total = (delay + stagger * Math.max(children.length - 1, 0) + duration) * 1000 + 120;
      timer = window.setTimeout(() => el.setAttribute("data-revealed", "done"), total);
    };

    const current = el.getAttribute("data-revealed");
    if (current === "done") return;
    if (current === "in") {
      // Re-run after a Strict Mode cleanup mid-transition: just finish.
      settle();
      return () => window.clearTimeout(timer);
    }

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-revealed", "done");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        el.setAttribute("data-revealed", "in");
        settle();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [ref, delay, stagger, duration, staggerChildren, enabled]);
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Rise distance in px. */
  y?: number;
  /** Seconds before the reveal starts once in view. */
  delay?: number;
  /** Seconds between children when `staggerChildren` is set. */
  stagger?: number;
  /** Animate direct children individually instead of the wrapper as one block. */
  staggerChildren?: boolean;
};

export function Reveal({
  children,
  className,
  y = 24,
  delay = 0,
  stagger = 0.08,
  staggerChildren = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnView(ref, { delay, stagger: staggerChildren ? stagger : 0, staggerChildren });

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={staggerChildren ? "stagger" : "block"}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}s`,
          "--reveal-stagger": `${stagger}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
