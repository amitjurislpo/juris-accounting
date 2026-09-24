import type { CSSProperties } from "react";
import { Phone } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { BRAND_GOLD } from "@/components/ui/Logo";

export function FloatingContactButton() {
  return (
    <Link
      href="/contact"
      aria-label="Contact us"
      style={{ "--brand": BRAND_GOLD, color: BRAND_GOLD } as CSSProperties}
      className="beacon beacon-brand group fixed bottom-5 right-4 z-30 flex h-13 w-13 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--brand)_45%,transparent)] bg-surface/80 shadow-float backdrop-blur-md transition-[scale,border-color,background-color] duration-300 hover:scale-105 hover:border-[var(--brand)] hover:bg-surface-hover md:bottom-auto md:right-6 md:top-1/2 md:h-14 md:w-14 md:-translate-y-1/2"
    >
      <Phone size={20} className="transition-transform duration-500 group-hover:-rotate-12" aria-hidden />
    </Link>
  );
}
