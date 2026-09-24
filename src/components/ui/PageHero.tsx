"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/components/ui/AppLink";
import { Container } from "./Container";
import { Eyebrow } from "./Section";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Parallax } from "@/components/motion/Parallax";

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

export type Crumb = { label: string; href?: string };

function humanize(segment: string) {
  return SEGMENT_LABELS[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function usePathCrumbs(): Crumb[] {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, i) => ({
    label: humanize(segment),
    href: i === segments.length - 1 ? undefined : "/" + segments.slice(0, i + 1).join("/"),
  }));
}

function enter(delay: number) {
  return { "--enter-delay": `${delay}s` } as CSSProperties;
}

/**
 * The dark "ink" hero band at the top of every interior page. Content
 * enters with pure-CSS load animations (never waiting on JS); the grid
 * and glow drift with a light parallax.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Breadcrumb trail after "Home". Defaults to one derived from the URL. */
  crumbs?: Crumb[];
  /** Optional actions (buttons) under the description. */
  children?: React.ReactNode;
}) {
  const pathCrumbs = usePathCrumbs();
  const trail = crumbs ?? pathCrumbs;

  return (
    <section className="relative isolate overflow-hidden border-b border-line text-fg">
      <Parallax speed={0.18} className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-80" />
        <div
          className="absolute -left-[15%] -top-[60%] h-[180%] w-[55%] rotate-[-24deg] opacity-[0.06] blur-3xl"
          style={{ background: "linear-gradient(90deg, transparent, #fff 45%, transparent)" }}
        />
        <div
          className="ambient-drift absolute -right-32 -top-32 h-[26rem] w-[26rem] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "radial-gradient(closest-side, #fff, transparent)" }}
        />
      </Parallax>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 90% at 30% 0%, transparent 45%, rgba(0,0,0,0.65) 100%)" }}
        aria-hidden
      />

      <Container className="relative pb-14 pt-6 md:pb-16 md:pt-8">
        {/* HUD row: breadcrumb left, section index right */}
        <div
          className="enter flex items-center justify-between gap-6 border-b border-line pb-5"
          style={enter(0)}
        >
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle">
              <li>
                <Link href="/" className="link-draw transition-colors hover:text-fg">
                  Home
                </Link>
              </li>
              {trail.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="link-draw transition-colors hover:text-fg">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-fg-muted" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle sm:flex" aria-hidden>
            <span className="h-1 w-1 rounded-full bg-signal" />
            Section {String(trail.length + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-10 max-w-4xl md:mt-12">
          {eyebrow && (
            <div className="enter" style={enter(0.08)}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className="mt-5 text-[2.2rem] leading-[1.04] tracking-[-0.04em] text-balance text-fg md:text-[3.4rem]">
            {typeof title === "string" ? (
              <SplitHeadline text={title} trigger="load" baseDelay={0.12} stagger={0.045} />
            ) : (
              title
            )}
          </h1>
          {description && (
            <p
              className="enter mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted"
              style={enter(0.35)}
            >
              {description}
            </p>
          )}
          {children && (
            <div className="enter mt-10 flex flex-wrap items-center gap-4" style={enter(0.45)}>
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
