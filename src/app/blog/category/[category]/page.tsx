import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import { FinalCta } from "@/components/home/FinalCta";
import { blogCategories, getCategory, postsInCategory } from "@/content/blog";

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Category not found | Juris CFO" };
  return {
    title: `${cat.name} Articles | Juris CFO Blog`,
    description: cat.description,
    keywords: cat.keywords.join(", "),
  };
}

export default async function BlogCategoryPage({ params }: PageProps<"/blog/category/[category]">) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <>
      <PageHero
        eyebrow="Blog category"
        title={cat.name}
        description={cat.description}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: cat.name }]}
      />
      <BlogIndex posts={postsInCategory(cat.id)} active={cat.id} />
      <TrendingPosts />
      <FinalCta />
    </>
  );
}
