import { articles } from "@/content/articles";
import { blogPosts } from "@/content/blog";
import { extraServiceList } from "@/content/extraServices";
import { industryPageList } from "@/content/industryPages";
import { serviceList } from "@/content/services";
import { footerNav, site, siteUrl } from "@/content/site";

// Static export: written once at build time to out/llms.txt, built from the
// same content files as the pages so it never drifts from the site.
export const dynamic = "force-static";

const link = (title: string, href: string, note?: string) =>
  `- [${title}](${siteUrl}${href})${note ? `: ${note}` : ""}`;

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Services",
    ...serviceList.map((s) => link(s.name, s.href, s.oneLiner)),
    ...extraServiceList.map((s) => link(s.name, s.href, s.oneLiner)),
    link("Compare services", "/services/compare", "How bookkeeping, accounting and taxation differ"),
    "",
    "## Industries",
    link("All industries", "/industries"),
    ...industryPageList.map((i) => link(i.name, i.href, i.oneLiner)),
    "",
    "## Company",
    ...footerNav.company.map((c) => link(c.label, c.href)),
    link("Pricing", "/pricing", "How pricing is scoped by service, module and entity"),
    link("FAQ", "/faq"),
    link("Contact", "/contact", `${site.email}, ${site.phone}, ${site.hours}`),
    "",
    "## Resources",
    ...articles.map((a) => link(a.title, `/resources/${a.slug}`, a.excerpt)),
    ...(blogPosts.length > 0 ? [link("Blog", "/blog"), ...blogPosts.map((p) => link(p.title, `/blog/${p.slug}`, p.excerpt))] : []),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
