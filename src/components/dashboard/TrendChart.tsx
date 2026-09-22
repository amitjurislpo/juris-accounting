"use client";

import { useState } from "react";
import { monthlyTrend } from "@/content/dashboard";

const WIDTH = 640;
const HEIGHT = 220;
const PAD_LEFT = 8;
const PAD_RIGHT = 8;
const PAD_TOP = 12;
const PAD_BOTTOM = 28;

export function TrendChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...monthlyTrend.map((m) => Math.max(m.revenue, m.expenses)));
  const chartW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const chartH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const groupW = chartW / monthlyTrend.length;
  const barW = groupW * 0.28;
  const gap = groupW * 0.06;

  const scaleY = (v: number) => chartH - (v / max) * chartH;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-5 font-mono text-[11px] uppercase tracking-wide text-ivory-soft">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-series-revenue" />
          Revenue
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-series-expenses" />
          Expenses
        </span>
        <span className="ml-auto text-ivory-soft">Demo data</span>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full overflow-visible"
        role="img"
        aria-label="Monthly revenue and expenses trend, demo data"
      >
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PAD_LEFT}
            x2={WIDTH - PAD_RIGHT}
            y1={PAD_TOP + chartH * (1 - f)}
            y2={PAD_TOP + chartH * (1 - f)}
            stroke="var(--chart-grid)"
            strokeWidth={1}
          />
        ))}
        <line
          x1={PAD_LEFT}
          x2={WIDTH - PAD_RIGHT}
          y1={PAD_TOP + chartH}
          y2={PAD_TOP + chartH}
          stroke="var(--chart-axis)"
          strokeWidth={1}
        />

        {monthlyTrend.map((m, i) => {
          const groupX = PAD_LEFT + i * groupW;
          const revH = chartH - scaleY(m.revenue);
          const expH = chartH - scaleY(m.expenses);
          const isHover = hover === i;
          return (
            <g
              key={m.month}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            >
              <rect
                x={groupX}
                y={PAD_TOP}
                width={groupW}
                height={chartH}
                fill="transparent"
              />
              <rect
                x={groupX + gap}
                y={PAD_TOP + scaleY(m.revenue)}
                width={barW}
                height={revH}
                rx={2}
                fill="var(--series-revenue)"
                opacity={isHover || hover === null ? 1 : 0.35}
              />
              <rect
                x={groupX + gap * 2 + barW}
                y={PAD_TOP + scaleY(m.expenses)}
                width={barW}
                height={expH}
                rx={2}
                fill="var(--series-expenses)"
                opacity={isHover || hover === null ? 1 : 0.35}
              />
              <text
                x={groupX + groupW / 2}
                y={HEIGHT - 6}
                textAnchor="middle"
                fontSize={10}
                className="font-mono"
                fill="var(--ivory-soft)"
              >
                {m.month}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="relative h-0">
        {hover !== null && (
          <div
            className="pointer-events-none absolute -top-[196px] rounded-sm border border-chart-grid bg-forest-deep px-3 py-2 font-mono text-[11px] text-ivory shadow-lg"
            style={{
              left: `${((hover + 0.5) / monthlyTrend.length) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <p className="mb-1 text-ivory-soft">{monthlyTrend[hover].month}</p>
            <p>
              <span className="text-series-revenue">Revenue</span>{" "}
              ${monthlyTrend[hover].revenue}k
            </p>
            <p>
              <span className="text-series-expenses">Expenses</span>{" "}
              ${monthlyTrend[hover].expenses}k
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
      <table>
        <caption>Monthly revenue and expenses, demo data</caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {monthlyTrend.map((m) => (
            <tr key={m.month}>
              <td>{m.month}</td>
              <td>${m.revenue}k</td>
              <td>${m.expenses}k</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
