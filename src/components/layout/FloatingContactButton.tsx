import { Phone } from "lucide-react";
import { Link } from "@/components/ui/AppLink";

export function FloatingContactButton() {
  return (
    <Link
      href="/contact"
      aria-label="Contact us"
      className="beacon group fixed bottom-5 right-4 z-30 flex h-13 w-13 md:bottom-auto md:top-1/2 md:-translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface/80 text-fg shadow-float backdrop-blur-md transition-[scale,border-color,background-color] duration-300 hover:scale-105 hover:border-white/40 hover:bg-surface-hover md:right-6 md:h-14 md:w-14"
    >
      <Phone size={20} className="transition-transform duration-500 group-hover:-rotate-12" aria-hidden />
    </Link>
  );
}
