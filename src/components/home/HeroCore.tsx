"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { serviceList } from "@/content/services";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The homepage hero's centrepiece: a holographic "ledger core" — four
 * glass panes stacked in 3D, one per core service. The stack breathes,
 * the active service's pane lifts out and lights up, a light beam with
 * rising data particles runs through the middle, and on desktop the
 * whole structure tilts toward the cursor. Decorative (aria-hidden);
 * the caption beneath repeats real service copy from content/services.ts.
 */

const CYCLE_MS = 3600;
const W = 200;

const S = { fill: "none", stroke: "white", strokeLinecap: "round", strokeLinejoin: "round" } as const;

function d(seconds: number) {
  return { "--d": `${seconds}s` } as CSSProperties;
}

/** Bookkeeping — ledger rows posting and reconciling. */
function LedgerPane() {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((r) => {
        const y = 62 + r * 26;
        return (
          <g key={r}>
            <line x1="24" x2="52" y1={y} y2={y} {...S} strokeOpacity="0.35" strokeWidth="3" />
            <line x1="64" x2={110 + ((r * 29) % 40)} y1={y} y2={y} {...S} strokeOpacity="0.55" strokeWidth="3" />
            <path d={`M 158 ${y} l 5 5 l 10 -10`} {...S} strokeWidth="3" pathLength={1} className="core-draw" style={d(r * 0.35)} />
          </g>
        );
      })}
    </g>
  );
}

/** Accounting — bars growing with a trend line. */
function ChartPane() {
  const bars = [40, 62, 52, 84, 104];
  return (
    <g>
      {bars.map((h, n) => (
        <rect key={n} x={26 + n * 32} y={176 - h} width="20" height={h} rx="2" fill="white" fillOpacity={0.12 + n * 0.1} className="core-bar" style={d(n * 0.12)} />
      ))}
      <polyline points="36,128 68,106 100,116 132,84 164,62" {...S} strokeWidth="2.5" pathLength={1} className="core-draw" style={d(0.5)} />
    </g>
  );
}

/** Taxation — a return checklist ticking off. */
function TaxPane() {
  return (
    <g>
      {[0, 1, 2, 3].map((r) => {
        const y = 66 + r * 30;
        return (
          <g key={r}>
            <rect x="28" y={y - 10} width="20" height="20" rx="3" {...S} strokeOpacity="0.5" strokeWidth="2" />
            <path d={`M 33 ${y} l 4 4 l 8 -9`} {...S} strokeWidth="3" pathLength={1} className="core-draw" style={d(r * 0.35)} />
            <line x1="60" x2={170 - r * 14} y1={y} y2={y} {...S} strokeOpacity="0.45" strokeWidth="3" />
          </g>
        );
      })}
      <text x="172" y="180" textAnchor="end" fontSize="26" fill="white" fillOpacity="0.8" className="font-serif italic">
        %
      </text>
    </g>
  );
}

/** Controller — oversight shield with a sweeping check. */
function ControlPane() {
  return (
    <g>
      <path d="M100 44 l44 16 v34 c0 30 -18 50 -44 62 c-26 -12 -44 -32 -44 -62 v-34 z" {...S} strokeOpacity="0.6" strokeWidth="2.5" />
      <path d="M82 102 l12 12 l26 -28" {...S} strokeWidth="4" pathLength={1} className="core-draw" />
      <circle cx="100" cy="100" r="78" {...S} strokeOpacity="0.2" strokeDasharray="2 8" className="core-spin" />
    </g>
  );
}

const PANES = [LedgerPane, ChartPane, TaxPane, ControlPane];

// Illustrative accounting shorthand, not figures.
const CHIPS = ["DR", "CR", "Σ", "GL", "1099", "K-1", "%", "P&L"];

export function HeroCore({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % PANES.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  // Cursor tilt (fine pointers only): writes CSS vars straight to the DOM.
  useEffect(() => {
    const wrap = wrapRef.current;
    const stack = stackRef.current;
    if (!wrap || !stack || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = wrap.getBoundingClientRect();
        const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
        stack.style.setProperty("--tilt-x", `${(-dy * 7).toFixed(2)}deg`);
        stack.style.setProperty("--tilt-z", `${(dx * 9).toFixed(2)}deg`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const service = serviceList[active];

  return (
    <div ref={wrapRef} className={`relative mx-auto w-full max-w-[min(32rem,calc(100svh-14rem))] ${className ?? ""}`} aria-hidden>
      <div className="relative aspect-square">
        {/* Floor glow + orbit ellipse */}
        <div className="absolute inset-x-[12%] bottom-[10%] h-[22%] rounded-[50%] bg-white/[0.07] blur-2xl" />
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible">
          <ellipse cx="200" cy="262" rx="170" ry="62" fill="none" stroke="white" strokeOpacity="0.12" />
          <ellipse cx="200" cy="262" rx="170" ry="62" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" pathLength={1} className="core-orbit" />
          <ellipse cx="200" cy="262" rx="130" ry="46" fill="none" stroke="white" strokeOpacity="0.08" strokeDasharray="2 6" />
        </svg>

        {/* The 3D stack */}
        <div className="core-scene absolute inset-0">
          <div ref={stackRef} className="core-stack absolute inset-[17%]">
            <div className="core-base absolute inset-0 rounded-card" />
            <div className="core-scanner absolute inset-0 rounded-card" />
            {PANES.map((Pane, i) => (
              <div
                key={i}
                className={`core-pane absolute inset-0 rounded-card ${i === active ? "is-active" : ""}`}
                style={{ "--z": i + 1 } as CSSProperties}
              >
                <svg viewBox={`0 0 ${W} ${W}`} className={`h-full w-full ${i === active ? "is-live" : ""}`}>
                  <text x="22" y="32" fontSize="10" letterSpacing="2" fill="white" fillOpacity="0.55" className="font-mono">
                    {serviceList[i].shortName.toUpperCase()}
                  </text>
                  <line x1="22" x2="178" y1="42" y2="42" stroke="white" strokeOpacity="0.15" />
                  <Pane />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Data chips orbiting the core on the floor ellipse. Each arm
            rotates; the chip counter-rotates and un-squashes so it stays
            upright, dimming as it passes behind the stack. */}
        <div className="core-orbit-ring pointer-events-none absolute left-[7.5%] top-[23%] aspect-square w-[85%]">
          {CHIPS.map((chip, k) => (
            <div key={chip} className="core-arm absolute inset-0" style={{ "--k": k } as CSSProperties}>
              <span className="core-chip absolute left-1/2 top-0">
                <span className="core-chip-counter block">
                  <span className="core-chip-face block whitespace-nowrap rounded-xs border border-line-strong bg-canvas/80 px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-fg shadow-[0_0_16px_rgba(255,255,255,0.12)] backdrop-blur-sm">
                    {chip}
                  </span>
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Light beam with rising data particles */}
        <div className="core-beam pointer-events-none absolute bottom-[26%] left-1/2 top-[4%] w-px -translate-x-1/2">
          {[0, 1, 2, 3, 4, 5].map((p) => (
            <span key={p} className="core-particle" style={{ animationDelay: `${p * 0.55}s`, left: `${(p % 3) - 1}px` }} />
          ))}
        </div>
      </div>

      {/* Caption: the active service */}
      <div className="relative -mt-20 flex items-end justify-between gap-6 border-t border-line pt-4 sm:-mt-24">
        <div key={active} className="recommendation-fade min-w-0">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-fg-subtle">
            <span className="beacon relative h-1.5 w-1.5 rounded-full bg-signal" />
            {service.shortName}
          </p>
          <p className="mt-2 truncate text-sm font-medium text-fg">{service.keyActions.join(" · ")}</p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {PANES.map((_, i) => (
            <span key={i} className={`h-px w-6 transition-colors duration-700 ${i === active ? "bg-fg" : "bg-line-strong"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
