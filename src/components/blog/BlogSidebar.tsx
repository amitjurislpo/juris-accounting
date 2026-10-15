import { Link } from "@/components/ui/AppLink";
import { blogCategories, blogPosts, type BlogCategoryId } from "@/content/blog";
import { cn } from "@/lib/cn";

const itemClass = "-ml-px flex justify-between gap-3 border-l px-4 py-2 text-sm transition-colors";

/** Left column of the blog: categories with counts, plus topic keywords. */
export function BlogSidebar({ active }: { active?: BlogCategoryId }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Blog categories and keywords">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver">Categories</p>
      <ul className="mt-4 flex flex-col border-l border-line">
        <li>
          <Link
            href="/blog"
            aria-current={!active ? "page" : undefined}
            className={cn(itemClass, !active ? "border-gold text-fg" : "border-transparent text-fg-muted hover:text-fg")}
          >
            <span>All articles</span>
            <span className="font-mono text-xs text-fg-subtle">{blogPosts.length}</span>
          </Link>
        </li>
        {blogCategories.map((category) => {
          const count = blogPosts.filter((p) => p.category === category.id).length;
          const isActive = active === category.id;
          return (
            <li key={category.id}>
              <Link
                href={`/blog/category/${category.id}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(itemClass, isActive ? "border-gold text-fg" : "border-transparent text-fg-muted hover:text-fg")}
              >
                <span>{category.name}</span>
                <span className="font-mono text-xs text-fg-subtle">{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-silver">Keywords</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {blogCategories.flatMap((category) =>
          category.keywords.map((keyword) => (
            <li key={keyword}>
              <Link
                href={`/blog/category/${category.id}`}
                className="inline-block rounded-xs border border-line px-2.5 py-1 text-xs text-fg-muted transition-colors hover:border-gold hover:text-fg"
              >
                {keyword}
              </Link>
            </li>
          )),
        )}
      </ul>
    </aside>
  );
}
