import type { CSSProperties } from "react";

type GlyphKind = "ledger" | "chart" | "receipt" | "controller";

function d(seconds: number) {
  return { "--d": `${seconds}s` } as CSSProperties;
}

const STROKE = { fill: "none", stroke: "var(--fg)", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/**
 * Small looping illustrations tied to what each service actually does —
 * entries being posted, a chart updating, a return being checked off, a
 * review sweeping the books — in place of a generic floating icon.
 * Decorative only; loops are CSS (see .glyph-* in globals.css) and stop
 * under prefers-reduced-motion.
 */
export function ServiceGlyph({ kind }: { kind: GlyphKind }) {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
      {kind === "ledger" && (
        <g>
          <rect x="22" y="18" width="52" height="60" rx="3" {...STROKE} stroke="var(--fg-muted)" />
          <line x1="34" y1="18" x2="34" y2="78" stroke="var(--line-strong)" strokeWidth="1" />
          {[32, 44, 56, 68].map((y, i) => (
            <line key={y} x1="40" x2="66" y1={y} y2={y} {...STROKE} pathLength={1} className="glyph-write" style={d(i * 0.45)} />
          ))}
        </g>
      )}

      {kind === "chart" && (
        <g>
          <line x1="18" y1="76" x2="78" y2="76" stroke="var(--fg-muted)" strokeWidth="1.5" />
          {[30, 44, 58, 72].map((x, i) => (
            <rect
              key={x}
              x={x - 5}
              y={36 - i * 4}
              width="10"
              height={40 + i * 4}
              rx="1.5"
              fill="var(--fg)"
              opacity={0.3 + i * 0.2}
              className="glyph-bar"
              style={d(i * 0.2)}
            />
          ))}
        </g>
      )}

      {kind === "receipt" && (
        <g>
          <path d="M28 16 h40 v64 l-6 -4 l-7 4 l-7 -4 l-7 4 l-7 -4 l-6 4 z" {...STROKE} stroke="var(--fg-muted)" />
          <line x1="36" x2="60" y1="30" y2="30" stroke="var(--fg-subtle)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" x2="54" y1="40" y2="40" stroke="var(--fg-subtle)" strokeWidth="1.5" strokeLinecap="round" />
          <text x="48" y="58" textAnchor="middle" fontSize="11" className="font-mono" fill="var(--fg-muted)">
            %
          </text>
          <path d="M38 64 l5 5 l12 -12" {...STROKE} strokeWidth={2} pathLength={1} className="glyph-write" />
        </g>
      )}

      {kind === "controller" && (
        <g>
          <path d="M48 16 l24 9 v18 c0 16 -10 27 -24 34 c-14 -7 -24 -18 -24 -34 v-18 z" {...STROKE} stroke="var(--fg-muted)" />
          <path d="M38 47 l7 7 l13 -14" {...STROKE} strokeWidth={2} pathLength={1} className="glyph-write" />
          <g className="glyph-orbit">
            <circle cx="48" cy="6" r="2.5" fill="var(--signal)" />
          </g>
        </g>
      )}
    </svg>
  );
}
