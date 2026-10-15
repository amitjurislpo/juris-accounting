import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import { FinalCta } from "@/components/home/FinalCta";
import { postsByDate } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog | Juris CFO",
  description:
    "Articles on bookkeeping, accounting, taxation, payroll, compliance and finance leadership for small businesses.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical guides for your books, taxes and finances"
        description="Browse by category to find plain-language articles on bookkeeping, accounting, tax, payroll, compliance and more."
      />
      <BlogIndex posts={postsByDate()} />
      <TrendingPosts />
      <FinalCta />
    </>
  );
}
