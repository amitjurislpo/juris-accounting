"use client";

import { useEffect, useState } from "react";
import { services } from "@/content/services";

/**
 * The hero's right-side visual: a fixed frame whose contents cycle through
 * five short, real-content states (Services, Engagement, Bookkeeping,
 * Accounting, Taxation), each with its own small SVG micro-animation and a
 * floating card of real copy. No stock imagery, no invented stats — every
 * label here already exists in content/services.ts or the hero's own copy.
 */

const CYCLE_MS = 4800;
const TRANSITION_MS = 420;

type State = {
  key: string;
  card: { title: string; body: string };
  /** Small offset (px) from the card's fixed anchor — kept within ~20-50px
      so the card drifts subtly between states rather than relocating. */
  offset: { x: number; y: number };
  render: (active: boolean) => React.ReactNode;
};

function useEntranceReveal(key: string | number) {
  const [active, setActive] = useState(false);
  const [prevKey, setPrevKey] = useState(key);

  // Reset synchronously during render when the key changes (the React
  // docs' "adjusting state when a prop changes" pattern), so each new
  // state starts from a real false -> true transition instead of
  // inheriting "true" from the previous cycle.
  if (key !== prevKey) {
    setPrevKey(key);
    setActive(false);
  }

  useEffect(() => {
    const id = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(id);
  }, [key]);
  return active;
}

function stag(i: number, base = 0.08) {
  return { transitionDelay: `${i * base}s` };
}

function delay(seconds: number) {
  return { "--d": `${seconds}s` } as React.CSSProperties;
}

const LABEL = { className: "font-mono", fill: "var(--fg-subtle)", fontSize: 9, letterSpacing: "0.12em" } as const;

/** Services — four disciplines feeding one accountable ledger: data
    packets travel along each connector into the centre. */
function ServicesVisual({ active }: { active: boolean }) {
  const nodes = [
    { x: 80, y: 62, label: "BOOKS" },
    { x: 320, y: 62, label: "ACCOUNTS" },
    { x: 80, y: 198, label: "TAX" },
    { x: 320, y: 198, label: "CONTROL" },
  ];
  const c = { x: 200, y: 130 };
  return (
    <svg viewBox="0 0 400 260" className={`h-full w-full overflow-visible ${active ? "is-active" : ""}`}>
      {nodes.map((n, i) => (
        <g key={i}>
          <line x1={n.x} y1={n.y} x2={c.x} y2={c.y} stroke="var(--line-strong)" strokeWidth="1" />
          <line
            x1={n.x}
            y1={n.y}
            x2={c.x}
            y2={c.y}
            stroke="var(--fg)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            className="sv-flow"
            style={delay(i * 0.55)}
          />
        </g>
      ))}
      {/* Central ledger */}
      <circle cx={c.x} cy={c.y} r="22" fill="none" stroke="var(--fg)" strokeWidth="1" className="sv-pulse" />
      <rect x={c.x - 20} y={c.y - 20} width="40" height="40" rx="4" fill="var(--surface)" stroke="var(--fg)" strokeWidth="1.5" />
      {[0, 1, 2].map((r) => (
        <line key={r} x1={c.x - 11} x2={c.x + 11} y1={c.y - 8 + r * 8} y2={c.y - 8 + r * 8} stroke="var(--fg-muted)" strokeWidth="1.5" />
      ))}
      <g className={`stagger-in ${active ? "is-active" : ""}`}>
        {nodes.map((n, i) => (
          <g key={i} style={stag(i)}>
            <circle cx={n.x} cy={n.y} r="15" fill="var(--surface)" stroke="var(--fg-muted)" strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="3" fill="var(--fg)" />
            <text x={n.x} y={n.y + (n.y < c.y ? -24 : 32)} textAnchor="middle" {...LABEL}>
              {n.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Engagement — a progress marker travels Consultation → Scope → Pricing,
    lighting each stage as it passes. */
function EngagementVisual({ active }: { active: boolean }) {
  const stages = ["Consultation", "Scope", "Pricing"];
  const xs = [70, 200, 330];
  return (
    <svg viewBox="0 0 400 260" className={`h-full w-full overflow-visible ${active ? "is-active" : ""}`}>
      <line x1="70" y1="120" x2="330" y2="120" stroke="var(--line-strong)" strokeWidth="1.5" />
      <line x1="70" y1="120" x2="330" y2="120" stroke="var(--fg)" strokeWidth="2" pathLength={1} className="sv-draw" style={delay(0.15)} />
      {/* travelling marker */}
      <line x1="70" y1="120" x2="330" y2="120" stroke="var(--fg)" strokeWidth="6" strokeLinecap="round" pathLength={1} className="sv-travel" />
      {xs.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="120" r="11" fill="var(--surface)" stroke="var(--fg-muted)" strokeWidth="1.5" />
          <circle cx={x} cy="120" r="5" className="sv-stage" style={delay(i * 1.45)} />
          <text x={x} y="154" textAnchor="middle" fontSize="11" className="font-mono" fill="var(--fg)">
            {stages[i]}
          </text>
          <text x={x} y="92" textAnchor="middle" {...LABEL}>
            {`STEP ${i + 1}`}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Bookkeeping — a ledger being posted: a cursor row scans down while each
    entry is ticked off as reconciled. */
function BookkeepingVisual({ active }: { active: boolean }) {
  const rows = [0.7, 0.45, 0.85, 0.55];
  return (
    <svg viewBox="0 0 400 260" className={`h-full w-full overflow-visible ${active ? "is-active" : ""}`}>
      <text x="60" y="48" {...LABEL}>DATE</text>
      <text x="120" y="48" {...LABEL}>ENTRY</text>
      <text x="262" y="48" textAnchor="end" {...LABEL}>DR / CR</text>
      <line x1="56" x2="344" y1="58" y2="58" stroke="var(--line-strong)" />
      <rect x="56" y="66" width="288" height="30" rx="3" fill="var(--fg)" opacity="0.06" className="sv-scan" />
      <g className={`stagger-in ${active ? "is-active" : ""}`}>
        {rows.map((w, i) => {
          const y = 81 + i * 40;
          return (
            <g key={i} style={stag(i, 0.14)}>
              <line x1="60" x2="92" y1={y} y2={y} stroke="var(--fg-subtle)" strokeWidth="2" strokeLinecap="round" />
              <line x1="120" x2={120 + 110 * w} y1={y} y2={y} stroke="var(--fg-muted)" strokeWidth="2" strokeLinecap="round" />
              <line x1={262 - 40 * w} x2="262" y1={y} y2={y} stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="310" cy={y} r="10" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
              <path
                d={`M 305 ${y} l 3.5 3.5 l 7 -7`}
                fill="none"
                stroke="var(--fg)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                className="sv-draw"
                style={delay(0.5 + i * 0.45)}
              />
              <line x1="56" x2="344" y1={y + 20} y2={y + 20} stroke="var(--line)" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** Accounting — bars grow in, then a trend line is plotted across them and
    the latest period pulses. */
function AccountingVisual({ active }: { active: boolean }) {
  const bars = [70, 100, 85, 130, 160];
  const pts = bars.map((h, i) => `${95 + i * 52},${210 - h - 14}`).join(" ");
  const last = { x: 95 + 4 * 52, y: 210 - bars[4] - 14 };
  return (
    <svg viewBox="0 0 400 260" className={`h-full w-full overflow-visible ${active ? "is-active" : ""}`}>
      {[0, 1, 2, 3].map((r) => (
        <line key={r} x1="60" x2="340" y1={210 - r * 50} y2={210 - r * 50} stroke={r === 0 ? "var(--line-strong)" : "var(--line)"} />
      ))}
      <g className={`stagger-in ${active ? "is-active" : ""}`}>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={80 + i * 52}
            y={210 - h}
            width="30"
            height={h}
            rx="3"
            fill={`rgba(242, 242, 240, ${(0.12 + i * 0.1).toFixed(2)})`}
            stroke="rgba(255, 255, 255, 0.18)"
            style={{ transformOrigin: `${80 + i * 52 + 15}px 210px`, ...stag(i, 0.1) }}
          />
        ))}
      </g>
      <polyline points={pts} fill="none" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" pathLength={1} className="sv-draw" style={delay(0.7)} />
      <circle cx={last.x} cy={last.y} r="4" fill="var(--fg)" />
      <circle cx={last.x} cy={last.y} r="4" fill="none" stroke="var(--fg)" className="sv-pulse" />
      <text x="60" y="232" {...LABEL}>JAN</text>
      <text x="340" y="232" textAnchor="end" {...LABEL}>MAY</text>
    </svg>
  );
}

/** Taxation — a return being prepared: items tick off, the progress bar
    fills, and a "Filed" stamp lands. */
function TaxationVisual({ active }: { active: boolean }) {
  const lines = 4;
  return (
    <svg viewBox="0 0 400 260" className={`h-full w-full overflow-visible ${active ? "is-active" : ""}`}>
      <rect x="126" y="30" width="148" height="200" rx="6" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
      <text x="144" y="56" {...LABEL}>RETURN</text>
      <line x1="144" y1="68" x2="230" y2="68" stroke="var(--fg-muted)" strokeWidth="2.5" strokeLinecap="round" />
      {Array.from({ length: lines }).map((_, i) => {
        const y = 96 + i * 28;
        return (
          <g key={i}>
            <rect x="144" y={y - 8} width="16" height="16" rx="3" fill="none" stroke="var(--fg-muted)" strokeWidth="1.5" />
            <path
              d={`M 148 ${y} l 3 3 l 6 -7`}
              fill="none"
              stroke="var(--fg)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className="sv-draw"
              style={delay(0.2 + i * 0.3)}
            />
            <line x1="170" y1={y} x2="252" y2={y} stroke="var(--fg-subtle)" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      })}
      <rect x="144" y="206" width="112" height="4" rx="2" fill="var(--line-strong)" />
      <rect x="144" y="206" width="112" height="4" rx="2" fill="var(--fg)" className="sv-fill" />
      <g className="sv-stamp">
        <rect x="222" y="160" width="78" height="30" rx="3" fill="var(--canvas)" stroke="var(--fg)" strokeWidth="1.5" />
        <text x="261" y="180" textAnchor="middle" fontSize="12" className="font-mono" fill="var(--fg)" letterSpacing="0.2em">
          FILED
        </text>
      </g>
    </svg>
  );
}

const b = services.bookkeeping;
const a = services.accounting;
const t = services.taxation;

const STATES: State[] = [
  {
    key: "services",
    card: { title: "Services", body: "Bookkeeping · Accounting · Taxation · Controller" },
    offset: { x: 0, y: 0 },
    render: (active) => <ServicesVisual active={active} />,
  },
  {
    key: "engagement",
    card: { title: "Engagement", body: "Consultation → Scope → Pricing" },
    offset: { x: -32, y: 18 },
    render: (active) => <EngagementVisual active={active} />,
  },
  {
    key: "bookkeeping",
    card: { title: b.name, body: b.keyActions.join(" · ") },
    offset: { x: -12, y: -30 },
    render: (active) => <BookkeepingVisual active={active} />,
  },
  {
    key: "accounting",
    card: { title: a.name, body: a.keyActions.join(" · ") },
    offset: { x: 18, y: 24 },
    render: (active) => <AccountingVisual active={active} />,
  },
  {
    key: "taxation",
    card: { title: t.name, body: t.keyActions.join(" · ") },
    offset: { x: -24, y: -10 },
    render: (active) => <TaxationVisual active={active} />,
  },
];

export function HeroShowcase({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const cycle = setInterval(() => {
      setOut(true);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % STATES.length);
        setOut(false);
      }, TRANSITION_MS);
      return () => clearTimeout(swap);
    }, CYCLE_MS);
    return () => clearInterval(cycle);
  }, []);

  const state = STATES[index];
  const active = useEntranceReveal(index) && !out;

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[min(28rem,calc(100svh-15rem))] min-w-[16rem] ${className ?? ""}`} aria-hidden>
      {/* Ambient glow behind the instrument */}
      <div
        className="pointer-events-none absolute inset-[6%] -z-10 rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #fff, transparent)" }}
      />

      {/* Outer bezel — precision ticks, turning very slowly */}
      <svg viewBox="0 0 400 400" className="orbit-spin-slow absolute inset-0 h-full w-full">
        <circle cx="200" cy="200" r="197" fill="none" stroke="var(--line)" />
        {Array.from({ length: 120 }).map((_, i) => (
          <line
            key={i}
            x1="200"
            x2="200"
            y1={i % 10 === 0 ? 5 : 10}
            y2="16"
            transform={`rotate(${i * 3} 200 200)`}
            stroke={i % 10 === 0 ? "var(--fg-muted)" : "var(--line-strong)"}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* A point of light orbiting the bezel */}
      <div className="orbit-spin pointer-events-none absolute inset-0">
        <span className="absolute left-1/2 top-[0.9%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-fg shadow-[0_0_14px_4px_rgba(255,255,255,0.45)]" />
      </div>

      {/* Inner dashed ring, counter-rotating */}
      <svg viewBox="0 0 400 400" className="orbit-spin-reverse absolute inset-[6.5%] h-[87%] w-[87%]">
        <circle cx="200" cy="200" r="198" fill="none" stroke="var(--line-strong)" strokeDasharray="1 9" />
      </svg>

      {/* The lens: a glass disc holding the live visual */}
      <div className="absolute inset-[12%] overflow-hidden rounded-full border border-line-strong bg-[radial-gradient(circle_at_30%_22%,#1d1d1d,#0a0a0a_72%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-40px_80px_rgba(0,0,0,0.6),0_40px_90px_-30px_rgba(0,0,0,0.95)]">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <p className="absolute inset-x-0 top-[11%] flex items-center justify-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.26em] text-fg-muted">
          <span className="beacon relative h-1.5 w-1.5 rounded-full bg-signal" />
          {state.card.title}
        </p>
        <div
          key={index}
          className={`showcase-visual absolute inset-x-[7%] top-1/2 aspect-[400/260] -translate-y-[46%] ${out ? "is-out" : ""}`}
        >
          {state.render(active)}
        </div>
        <div className="scan-line" />
        {/* glass glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, transparent 38%)" }}
        />
        <p className="absolute inset-x-0 bottom-[10%] text-center font-mono text-[9.5px] tracking-[0.3em] text-fg-subtle">
          {String(index + 1).padStart(2, "0")} / {String(STATES.length).padStart(2, "0")}
        </p>
      </div>

      {/* State indicators along the lower arc */}
      {STATES.map((s, i) => {
        const angle = ((90 + (i - (STATES.length - 1) / 2) * 11) * Math.PI) / 180;
        return (
          <span
            key={s.key}
            className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[background-color,border-color,scale] duration-700 ${
              i === index ? "scale-125 border-fg bg-fg" : "border-line-strong bg-canvas"
            }`}
            style={{ left: `${50 + 44.2 * Math.cos(angle)}%`, top: `${50 + 44.2 * Math.sin(angle)}%` }}
          />
        );
      })}

      <div
        className={`showcase-card absolute -right-10 -top-6 hidden w-48 sm:block ${out ? "is-out" : ""}`}
        style={{ transform: `translate(${state.offset.x}px, ${state.offset.y}px)` }}
      >
        <div
          key={`card-${index}`}
          className="idle-float rounded-card border border-line bg-surface/90 p-4 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver">{state.card.title}</p>
          <p className="mt-1.5 text-sm font-medium leading-snug text-fg">{state.card.body}</p>
        </div>
      </div>
    </div>
  );
}
