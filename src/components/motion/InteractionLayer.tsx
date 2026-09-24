"use client";

import { useEffect, useRef } from "react";
import { markMotionReady, prefersReducedMotion } from "@/lib/motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";
const MAGNET_PULL = 0.28;
const MAGNET_MAX = 8;

/**
 * Site-wide pointer and scroll interactions, delegated from a single set
 * of listeners (no per-element handlers, no React re-renders):
 *
 * - Scroll progress hairline across the top of the viewport.
 * - Card spotlight: sets --mx/--my on the hovered .lux-card.
 * - Magnetic pull on [data-magnetic] elements (desktop, motion allowed).
 * - A trailing cursor ring that expands over interactive elements
 *   (fine pointers only; the native cursor always stays visible).
 */
export function InteractionLayer() {
  const ringRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markMotionReady();
    const ring = ringRef.current;
    const bar = barRef.current;
    if (!ring || !bar) return;

    const reduced = prefersReducedMotion();
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cursorOn = finePointer && !reduced;

    // --- Scroll progress
    let scrollFrame = 0;
    const updateProgress = () => {
      scrollFrame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty("--progress", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
    };
    updateProgress();

    // --- Pointer: spotlight, magnet, cursor ring
    let x = -100;
    let y = -100;
    let ringX = x;
    let ringY = y;
    let ringFrame = 0;
    let magnet: HTMLElement | null = null;

    const releaseMagnet = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };

    const tickRing = () => {
      ringX += (x - ringX) * 0.2;
      ringY += (y - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0)`;
      ringFrame = Math.abs(x - ringX) + Math.abs(y - ringY) > 0.3 ? requestAnimationFrame(tickRing) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      const target = e.target instanceof Element ? e.target : null;

      const card = target?.closest<HTMLElement>(".lux-card");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${x - r.left}px`);
        card.style.setProperty("--my", `${y - r.top}px`);
      }

      if (!reduced) {
        const next = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (next !== magnet) releaseMagnet();
        if (next) {
          magnet = next;
          const r = next.getBoundingClientRect();
          const dx = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (x - (r.left + r.width / 2)) * MAGNET_PULL));
          const dy = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (y - (r.top + r.height / 2)) * MAGNET_PULL));
          next.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
        }
      }

      if (cursorOn) {
        ring.classList.add("is-visible");
        ring.classList.toggle("is-active", !!target?.closest(INTERACTIVE));
        if (!ringFrame) ringFrame = requestAnimationFrame(tickRing);
      }
    };
    const onLeaveWindow = () => {
      ring.classList.remove("is-visible");
      releaseMagnet();
    };
    const onDown = () => ring.classList.add("is-pressed");
    const onUp = () => ring.classList.remove("is-pressed");

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(ringFrame);
      releaseMagnet();
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
