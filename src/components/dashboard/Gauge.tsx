import type { CSSProperties } from "react";
import type { StatusLevel } from "@/content/dashboard";
import { cn } from "@/lib/cn";

const statusColor: Record<StatusLevel, string> = {
  good: "var(--status-good)",
  warning: "var(--status-warning)",
  serious: "var(--status-serious)",
  critical: "var(--status-critical)",
};

const statusText: Record<StatusLevel, string> = {
  good: "On track",
  warning: "Needs attention",
  serious: "Action required",
  critical: "Urgent",
};

export function Gauge({
  label,
  score,
  status,
  note,
}: {
  label: string;
  score: number;
  status: StatusLevel;
  note?: string;
}) {
  const radius = 42;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="rounded-control border border-chart-grid bg-graphite p-4 transition-colors duration-500 hover:border-platinum/35">
      <p className="font-mono text-[10px] uppercase tracking-wide text-fg-muted">
        {label}
      </p>
      <div className="mt-2 flex items-center gap-4">
        <svg viewBox="0 0 100 55" className="h-16 w-28" role="img" aria-label={`${label}: ${score} out of 100, ${statusText[status]}`}>
          <path
            d="M 8 50 A 42 42 0 0 1 92 50"
            fill="none"
            stroke="var(--chart-grid)"
            strokeWidth={8}
            strokeLinecap="round"
          />
          <path
            d="M 8 50 A 42 42 0 0 1 92 50"
            fill="none"
            stroke={statusColor[status]}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="gauge-arc"
            style={{ "--gauge-length": circumference } as CSSProperties}
          />
          <text
            x="50"
            y="46"
            textAnchor="middle"
            fontSize={20}
            className="font-display"
            fill="var(--fg)"
          >
            {score}
          </text>
        </svg>
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              status === "good" && "text-status-good",
              status === "warning" && "text-status-warning",
              status === "serious" && "text-status-serious",
              status === "critical" && "text-status-critical",
            )}
          >
            {statusText[status]}
          </p>
          {note && <p className="mt-1 text-xs text-fg-muted">{note}</p>}
        </div>
      </div>
    </div>
  );
}
