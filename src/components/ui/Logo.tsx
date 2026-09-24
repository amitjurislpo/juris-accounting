import { cn } from "@/lib/cn";

/** The brand gold from the Juris Accounting logo. */
export const BRAND_GOLD = "#c9974f";

/**
 * Juris Accounting monogram, redrawn as a vector from the brand logo: a
 * "J" and a "C" mirrored about a central pillar, capped top and bottom by
 * a bar — transparent so it sits cleanly on the dark UI.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("shrink-0", className)} aria-hidden>
      <g fill="none" stroke={BRAND_GOLD} strokeWidth="6.5">
        {/* J — top arm, stem, and hook opening left */}
        <path d="M10 26 H26 Q36 26 36 36 V62 Q36 80 22 80 Q12 80 10 70" />
        {/* C — stem with top and bottom arms opening right */}
        <path d="M90 36 Q90 26 80 26 H74 Q64 26 64 36 V64 Q64 80 78 80 Q88 80 90 70" />
      </g>
      <g fill={BRAND_GOLD}>
        <rect x="6" y="6" width="88" height="7" />
        <rect x="6" y="87" width="88" height="7" />
        <rect x="47" y="13" width="6" height="74" />
      </g>
    </svg>
  );
}

/** Full lockup: mark + JURIS ACCOUNTING wordmark (+ optional tagline). */
export function Logo({ tagline = true, className }: { tagline?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-9 w-9 sm:h-10 sm:w-10" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-fg sm:text-[1.05rem]">
          Juris <span style={{ color: BRAND_GOLD }}>Accounting</span>
        </span>
        {tagline && (
          <span className="mt-1.5 hidden border-t pt-1.5 text-[8.5px] font-medium uppercase tracking-[0.2em] text-fg-muted sm:block" style={{ borderColor: `${BRAND_GOLD}80` }}>
            Your trusted accounting partner
          </span>
        )}
      </span>
    </span>
  );
}
