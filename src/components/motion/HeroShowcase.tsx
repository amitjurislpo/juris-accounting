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

/** Services — four nodes converging toward a center point. */
function ServicesVisual({ active }: { active: boolean }) {
  const nodes = [
    { x: 90, y: 70 },
    { x: 310, y: 70 },
    { x: 90, y: 190 },
    { x: 310, y: 190 },
  ];
  const center = { x: 200, y: 130 };
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full overflow-visible">
      <g className={active ? "is-active" : ""}>
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={center.x}
            y2={center.y}
            stroke="var(--hairline)"
            strokeWidth="1.5"
            style={{
              opacity: active ? 1 : 0,
              transition: "opacity 0.6s ease-out",
              ...stag(i, 0.1),
            }}
          />
        ))}
      </g>
      <circle
        cx={center.x}
        cy={center.y}
        r="7"
        fill="var(--surface)"
        stroke="var(--forest)"
        strokeWidth="2.5"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0.5)",
          transformOrigin: "200px 130px",
          transition: "opacity 0.4s ease-out 0.4s, transform 0.4s cubic-bezier(.34,1.56,.64,1) 0.4s",
        }}
      />
      <g className={`stagger-in ${active ? "is-active" : ""}`}>
        {nodes.map((n, i) => (
          <g key={i} style={stag(i)}>
            <circle cx={n.x} cy={n.y} r="16" fill="var(--surface)" stroke="var(--emerald)" strokeWidth="2" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="9" className="font-mono" fill="var(--forest)">
              {i + 1}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Engagement — Consultation → Scope → Pricing, line draws left to right. */
function EngagementVisual({ active }: { active: boolean }) {
  const stages = ["Consultation", "Scope", "Pricing"];
  const xs = [70, 200, 330];
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full overflow-visible">
      <line x1="70" y1="120" x2="330" y2="120" stroke="var(--hairline)" strokeWidth="1.5" />
      <line
        x1="70"
        y1="120"
        x2="330"
        y2="120"
        stroke="var(--emerald)"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        style={{
          strokeDashoffset: active ? 0 : 100,
          transition: "stroke-dashoffset 1.1s cubic-bezier(.65,0,.35,1) 0.15s",
        }}
      />
      <g className={`stagger-in ${active ? "is-active" : ""}`}>
        {xs.map((x, i) => (
          <g key={i} style={stag(i, 0.3)}>
            <circle cx={x} cy="120" r="9" fill="var(--surface)" stroke="var(--forest)" strokeWidth="2.5" />
            <text x={x} y="152" textAnchor="middle" fontSize="11" className="font-mono" fill="var(--charcoal)">
              {stages[i]}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Bookkeeping — transaction rows that appear and reconcile. */
function BookkeepingVisual({ active }: { active: boolean }) {
  const rows = 4;
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full overflow-visible">
      <g className={`stagger-in ${active ? "is-active" : ""}`}>
        {Array.from({ length: rows }).map((_, i) => {
          const y = 66 + i * 40;
          return (
            <g key={i} style={stag(i, 0.14)}>
              <rect x="60" y={y} width="220" height="24" rx="5" fill="var(--surface)" stroke="var(--hairline)" />
              <line x1="76" y1={y + 12} x2="220" y2={y + 12} stroke="var(--charcoal-soft)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="304" cy={y + 12} r="11" fill="var(--cream)" stroke="var(--emerald)" strokeWidth="2" />
              <path
                d={`M 298 ${y + 12} l 4 4 l 8 -8`}
                fill="none"
                stroke="var(--forest)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** Accounting — an ascending bar chart that grows in. */
function AccountingVisual({ active }: { active: boolean }) {
  const bars = [70, 100, 85, 130, 160];
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full overflow-visible">
      <line x1="60" y1="210" x2="340" y2="210" stroke="var(--hairline)" strokeWidth="1.5" />
      <g className={`stagger-in ${active ? "is-active" : ""}`}>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={80 + i * 52}
            y={210 - h}
            width="30"
            height={h}
            rx="4"
            fill={i === bars.length - 1 ? "var(--forest)" : "var(--emerald)"}
            opacity={i === bars.length - 1 ? 1 : 0.55 + i * 0.08}
            style={{ transformOrigin: `${80 + i * 52 + 15}px 210px`, ...stag(i, 0.1) }}
          />
        ))}
      </g>
    </svg>
  );
}

/** Taxation — a document checklist that ticks off sequentially. */
function TaxationVisual({ active }: { active: boolean }) {
  const lines = 4;
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full overflow-visible">
      <rect x="130" y="40" width="140" height="180" rx="8" fill="var(--surface)" stroke="var(--hairline)" strokeWidth="1.5" />
      <line x1="150" y1="62" x2="230" y2="62" stroke="var(--charcoal-soft)" strokeWidth="3" strokeLinecap="round" />
      <g className={`stagger-in ${active ? "is-active" : ""}`}>
        {Array.from({ length: lines }).map((_, i) => {
          const y = 92 + i * 32;
          return (
            <g key={i} style={stag(i, 0.16)}>
              <rect x="150" y={y - 8} width="16" height="16" rx="4" fill="var(--cream)" stroke="var(--forest)" strokeWidth="1.5" />
              <path
                d={`M 154 ${y} l 3 3 l 6 -7`}
                fill="none"
                stroke="var(--forest)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="176" y1={y} x2="250" y2={y} stroke="var(--charcoal-soft)" strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        })}
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
    <div className={`relative ${className ?? ""}`} aria-hidden>
      <div
        className="relative rounded-2xl border border-emerald/25 bg-surface p-3 shadow-[0_30px_60px_-25px_rgba(16,28,46,0.25)]"
      >
        <div
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] opacity-40 blur-2xl"
          style={{ background: "radial-gradient(closest-side, var(--emerald), transparent)" }}
        />
        <div
          key={index}
          className={`showcase-visual aspect-[4/3] w-full rounded-xl bg-cream ${out ? "is-out" : ""}`}
        >
          {state.render(active)}
        </div>
      </div>

      <div
        className={`showcase-card absolute -right-4 -top-6 hidden w-52 sm:block ${out ? "is-out" : ""}`}
        style={{ transform: `translate(${state.offset.x}px, ${state.offset.y}px)` }}
      >
        <div key={`card-${index}`} className="idle-float rounded-xl border border-hairline bg-surface p-4 shadow-lg">
          <p className="font-mono text-[10px] uppercase tracking-wide text-charcoal-soft">
            {state.card.title}
          </p>
          <p className="mt-1 text-sm font-medium leading-snug text-charcoal">
            {state.card.body}
          </p>
        </div>
      </div>
    </div>
  );
}
