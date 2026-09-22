import { Link } from "@/components/ui/AppLink";
import { Container } from "@/components/ui/Container";
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
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-emerald">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ivory-soft transition-colors hover:text-ivory"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-void text-ivory">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <span className="font-display text-2xl">{site.name}</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory-soft">
              {site.tagline}
            </p>
          </div>
          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Resources" links={footerNav.resources} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hairline-dark pt-6 text-xs text-ivory-soft md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl leading-relaxed">{legalNotice}</p>
          <div className="flex gap-5">
            {footerNav.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ivory">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
