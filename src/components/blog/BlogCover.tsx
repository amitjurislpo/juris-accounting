import { BookOpen, Calculator, ChartColumn, Compass, Landmark, Laptop, ShieldCheck, Store } from "lucide-react";
import type { BlogCategoryId } from "@/content/blog";
import { cn } from "@/lib/cn";

const covers: Record<BlogCategoryId, { Icon: typeof BookOpen; angle: number; glow: string }> = {
  bookkeeping: { Icon: BookOpen, angle: 135, glow: "201,151,79" },
  accounting: { Icon: ChartColumn, angle: 160, glow: "127,214,164" },
  taxation: { Icon: Calculator, angle: 120, glow: "224,192,132" },
  payroll: { Icon: Landmark, angle: 150, glow: "201,151,79" },
  "cfo-controller": { Icon: Compass, angle: 125, glow: "127,214,164" },
  compliance: { Icon: ShieldCheck, angle: 165, glow: "224,192,132" },
  software: { Icon: Laptop, angle: 140, glow: "127,214,164" },
  "industry-guides": { Icon: Store, angle: 130, glow: "201,151,79" },
};

/**
 * Illustrated cover for a post: a themed gradient, a fine grid, and a large
 * category icon. Drawn in code so the blog needs no stock photography.
 */
export function BlogCover({ category, className }: { category: BlogCategoryId; className?: string }) {
  const { Icon, angle, glow } = covers[category];
  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      style={{ background: `linear-gradient(${angle}deg, #0b241b 0%, #0d2a20 55%, #113328 100%)` }}
      aria-hidden
    >
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{ background: `radial-gradient(60% 80% at 75% 20%, rgba(${glow},0.28), transparent 70%)` }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(190,240,215,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(190,240,215,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(70% 90% at 70% 30%, #000, transparent)",
          WebkitMaskImage: "radial-gradient(70% 90% at 70% 30%, #000, transparent)",
        }}
      />
      <div className="flex h-full w-full items-center justify-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-line-strong bg-[rgba(6,23,17,0.55)] text-silver md:h-20 md:w-20">
          <Icon className="h-7 w-7 md:h-9 md:w-9" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  );
}
