"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
};

export function AnimatedNumber({
  value,
  duration = 1.4,
  className,
  prefix = "",
  suffix = "",
}: AnimatedNumberProps) {
  const reducedMotion = useReducedMotion();
  // Start at the real value (matches the static HTML) rather than 0, so
  // above-the-fold numbers never flash "0" before counting up — the count-
  // up only kicks in for numbers that measure as below the fold on mount.
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    if (el.getBoundingClientRect().top < window.innerHeight * 1.1) {
      return;
    }

    setDisplay(0);
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reducedMotion ? value : display}
      {suffix}
    </span>
  );
}
