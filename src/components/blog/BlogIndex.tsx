import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCard } from "./BlogCard";
import { BlogSidebar } from "./BlogSidebar";
import { blogCategories, type BlogCategoryId, type BlogPost } from "@/content/blog";
import { cn } from "@/lib/cn";

const filters: { id?: BlogCategoryId; name: string; href: string }[] = [
  { name: "All categories", href: "/blog" },
  ...blogCategories.map((c) => ({ id: c.id, name: c.name, href: `/blog/category/${c.id}` })),
];

/** Shared listing layout for /blog and each category page. */
export function BlogIndex({ posts, active }: { posts: BlogPost[]; active?: BlogCategoryId }) {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
        <BlogSidebar active={active} />

        <div>
          {active && (
            <Link
              href="/blog"
              className="link-draw mb-6 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={16} aria-hidden /> Back to all articles
            </Link>
          )}

          <nav aria-label="Filter articles by category" className="mb-8 flex flex-wrap gap-2">
            {filters.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.id === active ? "page" : undefined}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs transition-colors",
                  item.id === active
                    ? "border-gold bg-platinum text-[#0a1a12]"
                    : "border-line text-fg-muted hover:border-gold hover:text-fg",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {posts.length === 0 ? (
            <p className="text-fg-muted">No articles in this category yet.</p>
          ) : (
            <Reveal staggerChildren className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
