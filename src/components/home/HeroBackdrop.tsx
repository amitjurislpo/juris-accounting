import type { CSSProperties } from "react";

/*
 * The homepage hero's living backdrop — an accounting "data space":
 * a perspective grid floor flowing toward the viewer, columns of ledger
 * entries streaming upward, a trend line tracing across, and large
 * finance/tax symbols drifting in the depths. Purely decorative
 * (aria-hidden); every entry is illustrative, never a real figure.
 * All motion is CSS transform/background animation (see .hb-* in
 * globals.css) and stops under prefers-reduced-motion.
 */

const LEDGER_A = [
  "GL 4010 · REVENUE",
  "DR  12,480.00",
  "CR  12,480.00",
  "Σ   BALANCED",
  "BANK REC · ✓",
  "AP  NET-30",
  "AR  NET-45",
  "JE-0412 POSTED",
  "ACCRUAL · MAR",
  "DEPR · STRAIGHT",
];
const LEDGER_B = [
  "FORM 1120-S",
  "SCH C · LINE 31",
  "Q3 EST. TAX",
  "SALES TAX · FILED",
  "1099-NEC · ISSUED",
  "W-2 · RECONCILED",
  "K-1 · PREPARED",
  "EXT · 7004",
  "NEXUS · REVIEW",
  "RETURN · E-FILED",
];
const LEDGER_C = [
  "P&L · MTD",
  "GROSS MARGIN  41.2%",
  "CASH  +8.6%",
  "BURN · 14 MO",
  "BUDGET vs ACTUAL",
  "VARIANCE  -2.1%",
  "CLOSE · DAY 5",
  "EBITDA · Q2",
  "FORECAST · FY",
  "AUDIT TRAIL · ✓",
];

function Stream({ lines, className, duration }: { lines: string[]; className: string; duration: number }) {
  const doubled = [...lines, ...lines];
  return (
    <div className={`hb-stream-mask absolute top-0 h-full overflow-hidden ${className}`}>
      <div className="hb-stream" style={{ "--dur": `${duration}s` } as CSSProperties}>
        {doubled.map((line, i) => (
          <p key={i} className="whitespace-pre py-3 font-mono text-[10px] tracking-[0.18em] text-fg">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

const SYMBOLS = [
  { ch: "Σ", left: "8%", top: "18%", size: "7rem", delay: "0s" },
  { ch: "%", left: "46%", top: "62%", size: "5rem", delay: "-6s" },
  { ch: "$", left: "88%", top: "70%", size: "6rem", delay: "-12s" },
  { ch: "§", left: "30%", top: "8%", size: "4.5rem", delay: "-3s" },
  { ch: "Δ", left: "70%", top: "12%", size: "5.5rem", delay: "-9s" },
];

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Perspective grid floor with a glowing horizon */}
      <div className="hb-floor-wrap absolute inset-x-0 bottom-0 h-[58%]">
        <div className="hb-floor absolute inset-x-[-40%] bottom-[-30%] top-0" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute inset-x-[10%] top-0 h-24 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl" />
      </div>

      {/* Ledger streams */}
      <Stream lines={LEDGER_A} className="left-[2%] w-44 opacity-[0.06] md:opacity-[0.13]" duration={46} />
      <Stream lines={LEDGER_B} className="left-[40%] hidden w-44 opacity-[0.08] lg:block" duration={60} />
      <Stream lines={LEDGER_C} className="right-[2%] hidden w-48 opacity-[0.12] md:block" duration={52} />

      {/* Trend line tracing across the space */}
      <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="absolute inset-x-0 top-[18%] h-[45%] w-full opacity-[0.22]">
        <polyline
          points="0,320 120,300 220,310 320,250 420,270 520,200 620,220 720,150 820,170 920,110 1020,130 1200,60"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="hb-trace"
        />
        {[
          [320, 250],
          [520, 200],
          [720, 150],
          [920, 110],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="white" className="hb-node" style={{ animationDelay: `${i * 0.9}s` }} />
        ))}
      </svg>

      {/* Drifting finance & tax symbols */}
      {SYMBOLS.map((s) => (
        <span
          key={s.ch}
          className="hb-symbol absolute font-serif italic leading-none text-fg"
          style={{ left: s.left, top: s.top, fontSize: s.size, animationDelay: s.delay }}
        >
          {s.ch}
        </span>
      ))}
    </div>
  );
}
