import { cn } from "@/lib/cn";

export function Badge({
  children,
  tone = "emerald",
  className,
}: {
  children: React.ReactNode;
  tone?: "emerald" | "forest" | "muted" | "emerald-on-dark";
  className?: string;
}) {
  const toneClasses = {
    emerald: "border-forest/40 text-forest bg-emerald/8",
    forest: "border-forest/30 text-forest bg-forest/5",
    muted: "border-hairline text-charcoal-soft bg-cream",
    // For use on dark surfaces (e.g. the dashboard concept card) —
    // forest is tuned for contrast against ivory and fails on dark.
    "emerald-on-dark": "border-emerald/40 text-emerald bg-forest-deep",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
