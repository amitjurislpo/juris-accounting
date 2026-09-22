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
    <div className="rounded-sm border border-chart-grid bg-forest-deep p-4">
      <p className="font-mono text-[10px] uppercase tracking-wide text-ivory-soft">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl text-ivory">
        $<AnimatedNumber value={value} />
        {unit}
      </p>
      <p className="mt-1 flex items-center gap-1 text-xs text-status-good">
        <TrendingUp size={12} aria-hidden />
        {delta}
        <span className="text-ivory-soft">vs. last month</span>
      </p>
    </div>
  );
}
