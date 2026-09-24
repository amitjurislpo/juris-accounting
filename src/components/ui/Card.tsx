import { cn } from "@/lib/cn";

/**
 * Static premium surface — graphite gradient, fine border, top-edge light
 * and pointer spotlight on hover (see .lux-card in globals.css). Link
 * cards apply the same `lux-card` class directly to their <Link>.
 */
export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return <Tag className={cn("lux-card rounded-card p-7", className)}>{children}</Tag>;
}
