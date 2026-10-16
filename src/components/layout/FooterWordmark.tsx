"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Oversized brand wordmark behind the footer content. The content sits on top
 * of it, so the gold version is toggled from the footer's own pointer events:
 * it fades in while the mouse is anywhere over the footer.
 */
export function FooterWordmark({ text }: { text: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const footer = textRef.current?.closest("footer");
    if (!footer) return;

    // Touch devices can't hover, so keep the wordmark highlighted there.
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setActive(!canHover.matches);
    sync();
    canHover.addEventListener("change", sync);

    function onEnter(event: PointerEvent) {
      if (event.pointerType === "mouse") setActive(true);
    }
    function onLeave() {
      setActive(!canHover.matches);
    }

    footer.addEventListener("pointerenter", onEnter);
    footer.addEventListener("pointerleave", onLeave);
    return () => {
      canHover.removeEventListener("change", sync);
      footer.removeEventListener("pointerenter", onEnter);
      footer.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center justify-center overflow-hidden" aria-hidden>
      <p
        ref={textRef}
        className="scroll-rise relative whitespace-nowrap text-[9.5vw] font-semibold uppercase leading-none tracking-[-0.04em]"
        style={{
          background: "linear-gradient(180deg, rgba(190,240,215,0.075), rgba(190,240,215,0.015))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
        <span
          className={cn(
            "absolute inset-0 transition-opacity duration-500 ease-out",
            active ? "opacity-100" : "opacity-0",
          )}
          style={{
            background: "linear-gradient(180deg, rgba(224,192,132,0.26), rgba(201,151,79,0.07))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {text}
        </span>
      </p>
    </div>
  );
}
