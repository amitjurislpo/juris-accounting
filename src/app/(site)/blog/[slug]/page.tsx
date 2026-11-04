import { cache } from "react";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { blogPosts } from "@/content/blog";
import { getVisiblePosts, trendingOf } from "@/lib/blog/posts";
import { buildBlogMetadata } from "@/lib/blog/seo";

// Static posts are prebuilt; approved Sanity posts render on first request.
export const dynamicParams = true;
export const revalidate = 60;
export const generateStaticParams = () => blogPosts.map((p) => ({ slug: p.slug }));

const load = cache(async (slug: string) => {
  const posts = await getVisiblePosts();
  return { post: posts.find((p) => p.slug === slug), related: trendingOf(posts) };
});

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { post } = await load((await params).slug);
  return post ? buildBlogMetadata(post) : { title: "Article not found | Juris CFO" };
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { post, related } = await load((await params).slug);
  if (!post) notFound();
  return <BlogArticle post={post} related={related} />;
}
