import { dashboardStats, taxReadiness, financialHealth, dashboardDisclaimer } from "@/content/dashboard";
import { StatTile } from "./StatTile";
import { TrendChart } from "./TrendChart";
import { StatusList } from "./StatusList";
import { Gauge } from "./Gauge";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

export function DashboardConcept() {
  return (
    <div className="rounded-sm border border-hairline-dark bg-void p-5 shadow-2xl md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-emerald">
            Financial dashboard — concept preview
          </p>
          <p className="mt-1 text-sm text-ivory-soft">
            A visual concept for what a client dashboard could look like. Design and data source to be finalized.
          </p>
        </div>
        <Badge tone="emerald-on-dark">Demo data</Badge>
      </div>

      <Reveal staggerChildren stagger={0.08} delay={0.15} className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile {...dashboardStats.revenue} />
        <StatTile {...dashboardStats.expenses} />
        <StatTile {...dashboardStats.profit} />
        <StatTile {...dashboardStats.cash} />
      </Reveal>

      <Reveal staggerChildren delay={0.5} className="mt-4 grid gap-4 md:grid-cols-[1.6fr_1fr]">
        <div className="rounded-sm border border-chart-grid bg-forest-deep p-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-ivory-soft">
            Monthly trend (demo)
          </p>
          <TrendChart />
        </div>
        <div className="flex flex-col gap-4">
          <Gauge
            label={taxReadiness.label}
            score={taxReadiness.score}
            status={taxReadiness.status}
            note={taxReadiness.note}
          />
          <Gauge
            label={financialHealth.label}
            score={financialHealth.score}
            status={financialHealth.status}
          />
        </div>
      </Reveal>

      <Reveal delay={0.7} className="mt-4">
        <StatusList />
      </Reveal>

      <p className="mt-5 text-xs leading-relaxed text-ivory-soft">
        {dashboardDisclaimer}
      </p>
    </div>
  );
}
