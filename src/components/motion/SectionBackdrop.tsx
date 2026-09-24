"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/*
 * Faint, looping accounting motifs behind every <Section>. All three
 * variants are rendered; CSS shows one per section by position
 * (section:nth-of-type, see .sb in globals.css) so consecutive sections
 * rotate ledger → chart → tax without any per-page configuration.
 * Animations only run while the section is on screen.
 */

function i(n: number) {
  return { "--i": n } as CSSProperties;
}

const ROWS = [0, 1, 2, 3, 4, 5];
const BARS = [38, 52, 44, 66, 58, 78, 70, 92, 84];

function Ledger() {
  return (
    <svg viewBox="0 0 400 280" className="sb-v sb-ledger" fill="none" stroke="white">
      <text x="24" y="26" className="sb-label">DATE</text>
      <text x="96" y="26" className="sb-label">ENTRY</text>
      <text x="300" y="26" className="sb-label" textAnchor="end">DR / CR</text>
      <line x1="20" x2="380" y1="36" y2="36" strokeOpacity="0.5" />
      <rect x="20" y="42" width="360" height="30" fill="white" fillOpacity="0.06" stroke="none" className="sb-scan" />
      {ROWS.map((r) => {
        const y = 58 + r * 36;
        return (
          <g key={r}>
            <line x1="24" x2="64" y1={y} y2={y} strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
            <line x1="96" x2={150 + ((r * 37) % 90)} y1={y} y2={y} strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
            <line x1={300 - ((r * 23) % 50) - 20} x2="300" y1={y} y2={y} strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
            <path d={`M 334 ${y} l 5 5 l 10 -10`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="sb-tick" style={i(r)} />
            <line x1="20" x2="380" y1={y + 18} y2={y + 18} strokeOpacity="0.18" />
          </g>
        );
      })}
    </svg>
  );
}

function Chart() {
  return (
    <div className="sb-v sb-chart">
      <div className="flex h-full items-end gap-[6%]">
        {BARS.map((h, n) => (
          <span key={n} className="sb-bar block flex-1 border border-white/50 bg-white/10" style={{ height: `${h}%`, ...i(n) }} />
        ))}
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <polyline
          points="0,70 12,56 24,62 36,40 48,46 60,28 72,34 84,14 100,20"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="hb-trace"
        />
      </svg>
    </div>
  );
}

function Tax() {
  return (
    <div className="sb-v sb-tax">
      <svg viewBox="0 0 220 280" fill="none" stroke="white" className="h-full w-auto">
        <rect x="10" y="10" width="200" height="260" rx="8" strokeOpacity="0.5" />
        <text x="30" y="42" className="sb-label">RETURN · FY</text>
        <line x1="30" x2="150" y1="56" y2="56" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((r) => {
          const y = 92 + r * 34;
          return (
            <g key={r}>
              <rect x="30" y={y - 9} width="18" height="18" rx="3" strokeOpacity="0.5" />
              <path d={`M 34 ${y} l 4 4 l 7 -8`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="sb-tick" style={i(r)} />
              <line x1="60" x2={170 - r * 12} y1={y} y2={y} strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        })}
        <line x1="30" x2="190" y1="254" y2="254" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
        <line x1="30" x2="190" y1="254" y2="254" strokeWidth="4" strokeLinecap="round" pathLength={1} className="sb-fill" />
      </svg>
      {[
        { ch: "%", l: "-30%", t: "10%", d: "0s" },
        { ch: "§", l: "110%", t: "55%", d: "-6s" },
        { ch: "$", l: "-20%", t: "70%", d: "-11s" },
      ].map((s) => (
        <span key={s.ch} className="hb-symbol absolute font-serif text-6xl italic text-white" style={{ left: s.l, top: s.t, animationDelay: s.d }}>
          {s.ch}
        </span>
      ))}
    </div>
  );
}

export function SectionBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      el?.classList.add("is-live");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => el.classList.toggle("is-live", entry.isIntersecting), {
      rootMargin: "100px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="sb pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <Ledger />
      <Chart />
      <Tax />
    </div>
  );
}
