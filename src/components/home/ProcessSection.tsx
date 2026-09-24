"use client";

import { useEffect, useRef } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/content/process";
import { prefersReducedMotion } from "@/lib/motion";

export function ProcessSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line) return;

    // The line only makes visual sense connecting a single row of circles
    // (the lg+ six-column layout) — position it edge-to-edge across the
    // first and last circle's true centers, measured from the DOM rather
    // than guessed from the grid, so it stays correct at any width.
    function positionLine() {
      const nodes = wrap!.querySelectorAll<HTMLElement>(".process-node");
      if (nodes.length < 2) return;
      const wrapLeft = wrap!.getBoundingClientRect().left;
      const first = nodes[0].getBoundingClientRect();
      const last = nodes[nodes.length - 1].getBoundingClientRect();
      const left = first.left + first.width / 2 - wrapLeft;
      const right = last.left + last.width / 2 - wrapLeft;
      line!.style.left = `${left}px`;
      line!.style.width = `${Math.max(right - left, 0)}px`;
    }

    positionLine();
    window.addEventListener("resize", positionLine);

    // Draw the line (and light each step in turn) once the steps are
    // genuinely on screen. An IntersectionObserver reads live geometry,
    // so it can't fire early the way precomputed scroll positions did
    // when content above shifted during reveals.
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      wrap.classList.add("is-drawn");
      return () => window.removeEventListener("resize", positionLine);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        positionLine();
        wrap.classList.add("is-drawn");
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(wrap);

    return () => {
      window.removeEventListener("resize", positionLine);
      observer.disconnect();
    };
  }, []);

  return (
    <Section tone="raised" id="process">
      <SectionHeading
        eyebrow="What happens after you contact us"
        title="A clear process, from first call to ongoing service"
      />

      <Reveal className="relative mt-10">
        <div ref={wrapRef} className="process-flow-line relative">
          <div
            ref={lineRef}
            className="process-line-draw absolute top-7 hidden h-px origin-left bg-gradient-to-r from-silver via-platinum to-silver lg:block"
            aria-hidden
          />

          <Reveal staggerChildren stagger={0.1} className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
            {processSteps.map((step) => (
              <div key={step.step} className="relative">
                <span className="process-node relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-sm text-platinum shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] ring-[6px] ring-raised transition-[scale] duration-500 hover:scale-110">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Reveal>
    </Section>
  );
}
