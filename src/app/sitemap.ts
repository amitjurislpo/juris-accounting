import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { blogPosts } from "@/content/blog";
import { extraServiceList } from "@/content/extraServices";
import { industryPageList } from "@/content/industryPages";

// Static export: the sitemap is generated once at build time into out/sitemap.xml.
export const dynamic = "force-static";

// Set NEXT_PUBLIC_SITE_URL at build time when the final domain is known.
const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://juris-accounting.vercel.app").replace(/\/$/, "");

const staticRoutes = [
  "/",
  "/services/compare",
  "/bookkeeping",
  "/catch-up-bookkeeping",
  "/accounting",
  "/taxation",
  "/controller-services",
  "/cfo-services",
  "/payroll",
  "/compliance",
  "/accounts-payable-receivable",
  "/bookkeeping-software-support",
  "/sales-tax-compliance",
  "/pricing",
  "/industries",
  "/process",
  "/why-juris",
  "/about",
  "/faq",
  "/resources",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticRoutes,
    ...extraServiceList.flatMap((service) => service.subServices.map((sub) => `${service.href}/${sub.slug}`)),
    ...industryPageList.map((industry) => industry.href),
    ...articles.map((article) => `/resources/${article.slug}`),
    // The blog stays out of the sitemap while it has no articles (its page is noindex).
    ...(blogPosts.length > 0 ? ["/blog", ...blogPosts.map((post) => `/blog/${post.slug}`)] : []),
  ];

  return [...new Set(paths)].map((path) => ({
    url: path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : staticRoutes.includes(path) ? 0.8 : 0.6,
  }));
}
