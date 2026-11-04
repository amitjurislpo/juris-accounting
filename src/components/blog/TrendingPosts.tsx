import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/content/blog";

/** `posts` comes from getVisiblePosts, so nothing unapproved can appear here. */
export function TrendingPosts({ posts: all, exclude }: { posts: BlogPost[]; exclude?: string }) {
  const posts = all.filter((p) => p.slug !== exclude);
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
