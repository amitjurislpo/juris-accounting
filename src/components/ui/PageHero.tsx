"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/ui/AppLink";
import { Container } from "./Container";
import { Eyebrow } from "./Section";
import { Reveal } from "@/components/motion/Reveal";

const SEGMENT_LABELS: Record<string, string> = {
  services: "Services",
  compare: "Compare",
  pricing: "Pricing",
  industries: "Industries",
  process: "Process",
  "why-juris": "Why Juris Accounting",
  about: "About",
  faq: "FAQ",
  resources: "Resources",
  contact: "Contact",
  privacy: "Privacy Policy",
  terms: "Terms",
  "controller-services": "Outsourced Controller Services",
};

function humanize(segment: string) {
  return SEGMENT_LABELS[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function useBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, i) => ({
    label: humanize(segment),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  const crumbs = useBreadcrumb();

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-cream">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.25] blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--emerald), transparent)" }}
        aria-hidden
      />
      <Container className="relative py-12 md:py-16">
        <Reveal staggerChildren stagger={0.1} className="max-w-2xl">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wide text-charcoal-soft">
              <li>
                <Link href="/" className="hover:text-forest">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {crumb.isLast ? (
                    <span className="text-forest">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-forest">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-4xl leading-tight text-charcoal md:text-5xl">{title}</h1>
          {description && (
            <p className="mt-5 text-lg leading-relaxed text-charcoal-soft">{description}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
