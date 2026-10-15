import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import { FinalCta } from "@/components/home/FinalCta";
import { blogPosts, postsByDate } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog | Juris CFO",
  description:
    "Articles on bookkeeping, accounting, taxation, payroll, compliance and finance leadership for small businesses.",
  // Keep the placeholder page out of search results until real articles exist.
  robots: blogPosts.length === 0 ? { index: false, follow: true } : undefined,
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical guides for your books, taxes and finances"
        description="Articles on bookkeeping, accounting, tax, payroll, compliance and more are coming soon."
      />
      <BlogIndex posts={postsByDate()} />
      <TrendingPosts />
      <FinalCta />
    </>
  );
}
