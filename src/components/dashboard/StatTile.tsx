import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { TrendingUp } from "lucide-react";

export function StatTile({
  label,
  value,
  unit,
  delta,
}: {
  label: string;
  value: number;
  unit: string;
  delta: string;
}) {
  return (
    <div className="rounded-control border border-chart-grid bg-graphite p-4 transition-colors duration-500 hover:border-platinum/35">
      <p className="font-mono text-[10px] uppercase tracking-wide text-fg-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-[1.7rem] tracking-[-0.02em] text-fg">
        $<AnimatedNumber value={value} />
        {unit}
      </p>
      <p className="mt-1 flex items-center gap-1 text-xs text-status-good">
        <TrendingUp size={12} aria-hidden />
        {delta}
        <span className="text-fg-muted">vs. last month</span>
      </p>
    </div>
  );
}
