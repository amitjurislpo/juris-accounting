import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import { FinalCta } from "@/components/home/FinalCta";
import { getVisiblePosts, trendingOf } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog | Juris CFO",
  description:
    "Articles on bookkeeping, accounting, taxation, payroll, compliance and finance leadership for small businesses.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getVisiblePosts();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical guides for your books, taxes and finances"
        description="Articles on bookkeeping, accounting, tax, payroll, compliance and more for growing businesses and accounting firms."
      />
      {/* BlogIndex is a client component: don't send article bodies to the browser for cards. */}
      <BlogIndex posts={posts.map((p) => ({ ...p, bodyHtml: "", faq: [] }))} />
      <TrendingPosts posts={trendingOf(posts)} />
      <FinalCta />
    </>
  );
}
