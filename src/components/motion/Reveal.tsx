"use client";

import { useEffect, useRef } from "react";
import { getGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  /** Animate direct children individually instead of the wrapper as one block. */
  staggerChildren?: boolean;
};

export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  stagger = 0.08,
  staggerChildren = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    // Content already inside the viewport on mount doesn't get animated at
    // all — it's already sitting at its final, correct position, and a
    // scroll trigger with a "top 85%" start condition that's already true
    // fires almost immediately once created. That used to jump the content
    // down by `y` and fade it out for a moment before animating it back,
    // which read as the page "flashing" on load. Only content that's
    // genuinely below the fold — where the viewer hasn't seen it yet —
    // gets the scroll-triggered reveal.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    const gsap = getGsap();
    const targets = staggerChildren ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          stagger: staggerChildren ? stagger : 0,
          ease: "power3.out",
          // Don't apply the "from" state until the tween actually starts
          // playing. Content is visible by default (no inline opacity:0);
          // this keeps it that way if the effect is torn down before the
          // scroll trigger fires (e.g. React Strict Mode's mount -> cleanup
          // -> mount in development), instead of leaving it stuck invisible.
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, stagger, staggerChildren]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
