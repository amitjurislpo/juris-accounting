"use client";

import { useEffect, useState } from "react";

/**
 * Keeps an element mounted for `exitMs` after `open` turns false, so it
 * can play an exit animation (driven by a data-state="open|closed"
 * attribute in CSS) before unmounting. Unmounted panels stay out of the
 * DOM entirely — out of the tab order and the accessibility tree.
 *
 * "Mounted" is derived as `open || exiting`, so it can never disagree
 * with `open` — the extra state only covers the exit window.
 */
export function usePresence(open: boolean, exitMs = 240) {
  const [exiting, setExiting] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  // React's "adjusting state when a prop changes" pattern: start the exit
  // window in the same render that `open` flips to false.
  if (open !== prevOpen) {
    setPrevOpen(open);
    setExiting(!open);
  }

  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(() => setExiting(false), exitMs);
    return () => window.clearTimeout(timer);
  }, [exiting, exitMs]);

  return open || exiting;
}
