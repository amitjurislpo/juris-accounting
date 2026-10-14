import { ArrowRight } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "on-void";

const PRIMARY =
  "bg-platinum text-canvas shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_-16px_rgba(255,255,255,0.25)] hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_0_0_1px_rgba(255,255,255,0.25),0_18px_50px_-16px_rgba(255,255,255,0.35)]";

const variantClasses: Record<Variant, string> = {
  primary: PRIMARY,
  secondary:
    "border border-line-strong bg-white/[0.02] text-fg backdrop-blur-sm hover:border-white/35 hover:bg-white/[0.06]",
  ghost: "link-draw bg-transparent text-fg-muted hover:text-fg",
  // Kept as an alias so existing callers on dark bands keep working —
  // every surface is dark now, so it matches primary.
  "on-void": PRIMARY,
};

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaExpanded?: boolean;
  ariaLabel?: string;
  arrow?: boolean;
  /** Light that orbits the button edge — used on every "Book a consultation". */
  glow?: boolean;
  /** Replaces the arrow with a spinner and disables the button. */
  loading?: boolean;
};

/** Arrow that slides out to the right while a fresh one slides in. */
function SlideArrow() {
  return (
    <span className="relative inline-flex h-4 w-4 overflow-hidden" aria-hidden>
      <ArrowRight
        size={16}
        className="absolute inset-0 transition-transform duration-500 ease-lux group-hover:translate-x-5"
      />
      <ArrowRight
        size={16}
        className="absolute inset-0 -translate-x-5 transition-transform duration-500 ease-lux group-hover:translate-x-0"
      />
    </span>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  href,
  onClick,
  type = "button",
  disabled,
  ariaExpanded,
  ariaLabel,
  arrow,
  glow,
  loading,
}: ButtonProps) {
  const showArrow = arrow ?? variant !== "ghost";
  const magnetic = variant !== "ghost";

  const base = cn(
    "group relative inline-flex items-center justify-center gap-2.5 rounded-control text-sm font-medium tracking-[0.01em] transition-[background-color,color,border-color,box-shadow,scale,translate] duration-300 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    variant === "ghost" ? "px-0 py-1" : "px-6 py-3.5",
    variantClasses[variant],
    glow && "btn-orbit",
    className,
  );

  const content = (
    <span className="relative z-10 inline-flex items-center gap-2.5">
      {children}
      {loading ? <span className="spinner" aria-hidden /> : showArrow && <SlideArrow />}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={base} aria-label={ariaLabel} data-magnetic={magnetic || undefined}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={base}
      onClick={onClick}
      disabled={disabled || loading}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      data-magnetic={magnetic || undefined}
    >
      {content}
    </button>
  );
}
