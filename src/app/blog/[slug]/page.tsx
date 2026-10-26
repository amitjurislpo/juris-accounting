import { BlogArticle, getArticleMetadata } from "@/components/blog/BlogArticle";
import { blogPosts } from "@/content/blog";

export const dynamicParams = false;

export const generateStaticParams = () => blogPosts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  return getArticleMetadata((await params).slug);
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  return <BlogArticle slug={(await params).slug} />;
}
