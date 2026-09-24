import { dashboardStats, taxReadiness, financialHealth, dashboardDisclaimer } from "@/content/dashboard";
import { StatTile } from "./StatTile";
import { TrendChart } from "./TrendChart";
import { StatusList } from "./StatusList";
import { Gauge } from "./Gauge";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

export function DashboardConcept() {
  return (
    <div className="relative isolate overflow-hidden rounded-card border border-line bg-void p-5 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)] md:p-8">
      <div className="hairline-rule absolute inset-x-0 top-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--platinum), transparent)" }}
        aria-hidden
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-platinum">
            <span className="beacon relative h-1.5 w-1.5 rounded-full bg-platinum" aria-hidden />
            Financial dashboard — concept preview
          </p>
          <p className="mt-1 text-sm text-fg-muted">
            A visual concept for what a client dashboard could look like. Design and data source to be finalized.
          </p>
        </div>
        <Badge tone="platinum-on-dark">Demo data</Badge>
      </div>

      <Reveal staggerChildren stagger={0.08} delay={0.15} className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile {...dashboardStats.revenue} />
        <StatTile {...dashboardStats.expenses} />
        <StatTile {...dashboardStats.profit} />
        <StatTile {...dashboardStats.cash} />
      </Reveal>

      <Reveal staggerChildren delay={0.5} className="mt-4 grid gap-4 md:grid-cols-[1.6fr_1fr]">
        <div className="rounded-control border border-chart-grid bg-graphite p-4 transition-colors duration-500 hover:border-platinum/35">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-fg-muted">
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

      <p className="mt-5 text-xs leading-relaxed text-fg-muted">
        {dashboardDisclaimer}
      </p>
    </div>
  );
}
