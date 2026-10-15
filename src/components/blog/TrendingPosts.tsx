import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCard } from "./BlogCard";
import { trendingPosts, type BlogPost } from "@/content/blog";

export function TrendingPosts({ exclude }: { exclude?: string }) {
  const posts: BlogPost[] = trendingPosts.filter((p) => p.slug !== exclude);
  if (posts.length === 0) return null;
  return (
    <Section tone="raised">
      <SectionHeading eyebrow="Reader favourites" title="Most trending articles" />
      <Reveal staggerChildren className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </Reveal>
    </Section>
  );
}
