"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCard } from "./BlogCard";
import { BlogSidebar } from "./BlogSidebar";
import { blogCategories, type BlogCategoryId, type BlogPost } from "@/content/blog";
import { cn } from "@/lib/cn";

const filters: { id?: BlogCategoryId; name: string }[] = [
  { name: "All categories" },
  ...blogCategories.map((c) => ({ id: c.id, name: c.name })),
];

/**
 * Blog listing. The category filter is client-side state, so choosing a
 * category never creates a URL for search engines to index.
 */
export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<BlogCategoryId | undefined>();
  const visible = active ? posts.filter((p) => p.category === active) : posts;

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
        <BlogSidebar active={active} onSelect={setActive} />

        <div>
          {active && (
            <button
              type="button"
              onClick={() => setActive(undefined)}
              className="link-draw mb-6 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={16} aria-hidden /> Back to all articles
            </button>
          )}

          <div role="group" aria-label="Filter articles by category" className="mb-8 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(item.id)}
                aria-pressed={item.id === active}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs transition-colors",
                  item.id === active
                    ? "border-gold bg-platinum text-[#0a1a12]"
                    : "border-line text-fg-muted hover:border-gold hover:text-fg",
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          {visible.length > 0 ? (
            <Reveal staggerChildren className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </Reveal>
          ) : (
            <div className="rounded-card border border-line-strong bg-surface p-8 md:p-10">
              <Badge tone="platinum">Coming soon</Badge>
              <h2 className="mt-5 text-2xl tracking-[-0.03em] text-fg">Articles are on the way</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-fg-muted">
                {active
                  ? "We are preparing articles for this category. In the meantime, talk to our team about your requirement."
                  : "We are preparing our first articles. In the meantime, talk to our team about your requirement."}
              </p>
              <div className="mt-6">
                <Button href="/contact">Contact us</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
