import { ArrowRight } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "on-void";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-charcoal text-ivory hover:bg-forest focus-visible:outline-forest",
  secondary:
    "bg-transparent text-forest border border-forest hover:bg-forest hover:text-ivory focus-visible:outline-forest",
  ghost:
    "bg-transparent text-charcoal hover:text-forest underline underline-offset-4 decoration-hairline",
  "on-void":
    "bg-emerald text-void hover:opacity-90 focus-visible:outline-emerald",
};

const arrowAccent: Record<Variant, string> = {
  primary: "text-emerald",
  secondary: "",
  ghost: "",
  "on-void": "text-void",
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
  /** Moving-light sweep across the button surface — used on every "Book a
      consultation" CTA, kept off other buttons so it stays an accent. */
  glow?: boolean;
};

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
}: ButtonProps) {
  const showArrow = arrow ?? variant !== "ghost";

  const base = cn(
    "group inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variant === "ghost" ? "px-0 py-1" : "px-6 py-3.5",
    variantClasses[variant],
    glow && "btn-glow",
    className,
  );

  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight
            size={16}
            className={cn(
              "transition-transform duration-300 group-hover:translate-x-1",
              arrowAccent[variant],
            )}
            aria-hidden
          />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={base} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={base}
      onClick={onClick}
      disabled={disabled}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
