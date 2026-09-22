"use client";

import { useEffect, useRef } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/content/process";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

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

    if (prefersReducedMotion()) {
      wrap.classList.add("is-drawn");
      return () => window.removeEventListener("resize", positionLine);
    }

    const gsap = getGsap();

    const ctx = gsap.context(() => {
      // Every number stays fully solid the whole time — only the
      // connecting line animates. It plays once, as a timed reveal, when
      // this section first comes into view — not scrubbed continuously
      // against scroll position (which made it feel tied to the scrollbar
      // rather than like a deliberate animation).
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrap,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, wrap);

    return () => {
      window.removeEventListener("resize", positionLine);
      ctx.revert();
    };
  }, []);

  return (
    <Section tone="cream" id="process">
      <SectionHeading
        eyebrow="What happens after you contact us"
        title="A clear process, from first call to ongoing service"
      />

      <Reveal className="relative mt-16">
        <div ref={wrapRef} className="process-flow-line relative">
          <div
            ref={lineRef}
            className="process-line-draw absolute top-7 hidden h-0.5 origin-left rounded-full bg-emerald lg:block"
            aria-hidden
          />

          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
            {processSteps.map((step) => (
              <div key={step.step} className="relative">
                <span className="process-node relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-forest font-mono text-base text-ivory shadow-lg shadow-forest/25 ring-4 ring-cream">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-medium text-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
