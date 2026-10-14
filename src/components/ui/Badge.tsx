import { cn } from "@/lib/cn";

export function Badge({
  children,
  tone = "platinum",
  className,
}: {
  children: React.ReactNode;
  tone?: "platinum" | "silver" | "muted" | "platinum-on-dark";
  className?: string;
}) {
  const toneClasses = {
    platinum: "border-silver/40 text-silver bg-platinum/10",
    silver: "border-silver/30 text-silver bg-silver/5",
    muted: "border-line text-fg-muted bg-raised",
    // For use on dark surfaces (e.g. the dashboard concept card) — silver
    // is tuned for contrast against ivory and fails on dark.
    "platinum-on-dark": "border-platinum/40 text-platinum bg-graphite",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
