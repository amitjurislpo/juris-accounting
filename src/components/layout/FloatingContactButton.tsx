import { Phone } from "lucide-react";
import { Link } from "@/components/ui/AppLink";

export function FloatingContactButton() {
  return (
    <Link
      href="/contact"
      aria-label="Contact us"
      className="group fixed right-6 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-void text-ivory shadow-[0_12px_30px_-8px_rgba(16,28,46,0.5)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
    >
      <Phone size={22} aria-hidden />
    </Link>
  );
}
