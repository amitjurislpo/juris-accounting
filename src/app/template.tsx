"use client";

import { useEffect, useState } from "react";

// Module scope survives remounts, so only the very first mount (the
// initial page load) skips the curtain; every client navigation after
// that gets it. Read in render, written in an effect, so React Strict
// Mode's double render can't flip it early.
let hasMountedOnce = false;

/**
 * Re-mounts on every top-level route change. On client navigations a
 * black curtain lifts off the incoming page while the content rises in
 * (see .page-curtain / .page-enter in globals.css). The first load skips
 * the curtain so above-the-fold content is never delayed.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [showCurtain] = useState(() => typeof window !== "undefined" && hasMountedOnce);

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  return (
    <>
      {showCurtain && <div className="page-curtain" aria-hidden />}
      <div className="page-enter">{children}</div>
    </>
  );
}
