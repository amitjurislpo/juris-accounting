import { CheckCircle2, AlertTriangle, AlertOctagon, XCircle } from "lucide-react";
import type { StatusLevel } from "@/content/dashboard";
import { reconciliationStatus } from "@/content/dashboard";
import { cn } from "@/lib/cn";

const statusIcon: Record<StatusLevel, typeof CheckCircle2> = {
  good: CheckCircle2,
  warning: AlertTriangle,
  serious: AlertOctagon,
  critical: XCircle,
};

const statusClass: Record<StatusLevel, string> = {
  good: "text-status-good",
  warning: "text-status-warning",
  serious: "text-status-serious",
  critical: "text-status-critical",
};

export function StatusList() {
  return (
    <div className="rounded-sm border border-chart-grid bg-forest-deep p-4">
      <p className="font-mono text-[10px] uppercase tracking-wide text-ivory-soft">
        Reconciliation status (demo)
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {reconciliationStatus.map((row) => {
          const Icon = statusIcon[row.status];
          return (
            <li key={row.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-ivory">{row.label}</span>
              <span className={cn("flex items-center gap-1.5 text-xs font-medium", statusClass[row.status])}>
                <Icon size={14} aria-hidden />
                {row.status === "good" ? "Reconciled" : "Review needed"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
