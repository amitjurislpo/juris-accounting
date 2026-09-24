"use client";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

declare global {
  interface Window {
    __jaMotionReady?: boolean;
  }
}

/**
 * Tells the inline <head> script (see app/layout.tsx) that client JS is
 * running, so it doesn't fall back to un-hiding reveal content. Called
 * from any always-mounted client component.
 */
export function markMotionReady() {
  if (typeof window !== "undefined") window.__jaMotionReady = true;
}

/**
 * Inline script that runs before first paint: flags the document as
 * JS-capable (enabling the pre-reveal hidden states in globals.css) and,
 * if the app bundle hasn't hydrated within a few seconds (slow network,
 * blocked script), removes the flag so no content is ever left hidden.
 */
export const motionBootScript = `(function(){var d=document.documentElement;d.setAttribute("data-js","");setTimeout(function(){if(!window.__jaMotionReady)d.removeAttribute("data-js")},4000)})();`;
