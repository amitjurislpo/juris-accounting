import { articles } from "@/content/articles";
import { extraServiceList } from "@/content/extraServices";
import { industryPageList } from "@/content/industryPages";
import { getVisiblePosts } from "@/lib/blog/posts";
import { serviceList } from "@/content/services";
import { footerNav, site, siteUrl } from "@/content/site";

// Built from the same content as the pages so it never drifts from the site.
// Regenerated on the public cache window, because blog posts come and go with approvals.
export const revalidate = 60;

const link = (title: string, href: string, note?: string) =>
  `- [${title}](${siteUrl}${href})${note ? `: ${note}` : ""}`;

export async function GET() {
  const blogPosts = await getVisiblePosts();
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
