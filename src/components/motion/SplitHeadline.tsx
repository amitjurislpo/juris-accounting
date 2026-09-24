"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { useRevealOnView } from "./Reveal";

/**
 * Headline text that rises into place word by word, each word from behind
 * its own clip mask — words never leave their final line box, so there's
 * no layout shift and no sideways sweep.
 *
 * - trigger="load": pure CSS animation from the first frame, for
 *   above-the-fold headlines (hero H1s) so they never wait on JS.
 * - trigger="view" (default): plays once when scrolled into view, using
 *   the same pre-paint hidden state as <Reveal>.
 */
export function SplitHeadline({
  text,
  className,
  wordClassName,
  baseDelay = 0,
  stagger = 0.06,
  trigger = "view",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  baseDelay?: number;
  stagger?: number;
  trigger?: "load" | "view";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");
  const inView = trigger === "view";
  useRevealOnView(ref, {
    enabled: inView,
    delay: baseDelay,
    stagger,
    staggerChildren: false,
    duration: 1 + stagger * words.length,
  });

  return (
    <span
      ref={ref}
      className={cn(!inView && "split-load", className)}
      data-reveal={inView ? "words" : undefined}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <span
              className={cn("word", wordClassName)}
              style={{ "--word-delay": `${baseDelay + i * stagger}s` } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
