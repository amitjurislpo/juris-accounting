import { Link } from "@/components/ui/AppLink";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { footerNav, site, legalNotice } from "@/content/site";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
        <span className="h-px w-5 bg-line-strong" aria-hidden />
        {title}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
            >
              <span
                className="h-px w-0 bg-fg transition-[width] duration-500 ease-lux group-hover:w-3"
                aria-hidden
              />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [first, ...rest] = site.name.split(" ");
  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-void text-fg">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[70rem] -translate-x-1/2 rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #fff, transparent)" }}
        aria-hidden
      />

      {/* Oversized brand wordmark as the footer's backdrop, behind all
          content. */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center justify-center overflow-hidden" aria-hidden>
        <p
          className="scroll-rise whitespace-nowrap text-[9.5vw] font-semibold uppercase leading-none tracking-[-0.04em]"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.015))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {first} {rest.join(" ")}
        </p>
      </div>

      <Container className="pt-14 md:pt-20">
        {/* Statement + CTA */}
        <Reveal className="flex flex-col justify-between gap-10 border-b border-line pb-12 md:flex-row md:items-end">
          <p className="max-w-xl text-2xl leading-[1.1] tracking-[-0.035em] text-fg md:text-4xl">
            {site.tagline.split("—")[0].trim()}{" "}
            <span className="font-serif italic tracking-[-0.01em] text-fg-muted">
              — {site.tagline.split("—")[1]?.trim()}
            </span>
          </p>
          <Button href="/contact" glow className="self-start md:self-auto">
            Book a consultation
          </Button>
        </Reveal>

        <Reveal staggerChildren className="grid grid-cols-2 gap-x-10 gap-y-10 py-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">Practice</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-fg-muted">{site.description}</p>
          </div>
          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Resources" links={footerNav.resources} />
        </Reveal>

        <div className="flex flex-col gap-4 border-t border-line py-7 text-xs text-fg-subtle md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl leading-relaxed">{legalNotice}</p>
          <div className="flex gap-6">
            {footerNav.legal.map((link) => (
              <Link key={link.href} href={link.href} className="link-draw hover:text-fg">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>

    </footer>
  );
}
