import { blogCategories, blogPosts, type BlogCategoryId } from "@/content/blog";
import { cn } from "@/lib/cn";

const itemClass = "-ml-px flex w-full justify-between gap-3 border-l px-4 py-2 text-left text-sm transition-colors";

/**
 * Left column of the blog: categories, with article counts once posts exist.
 * Selecting one filters the list in place; it never changes the URL.
 */
export function BlogSidebar({
  active,
  onSelect,
}: {
  active?: BlogCategoryId;
  onSelect: (id?: BlogCategoryId) => void;
}) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Blog categories">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver">Categories</p>
      <ul className="mt-4 flex flex-col border-l border-line">
        <li>
          <button
            type="button"
            onClick={() => onSelect(undefined)}
            aria-pressed={!active}
            className={cn(itemClass, !active ? "border-gold text-fg" : "border-transparent text-fg-muted hover:text-fg")}
          >
            <span>All articles</span>
            {blogPosts.length > 0 && <span className="font-mono text-xs text-fg-subtle">{blogPosts.length}</span>}
          </button>
        </li>
        {blogCategories.map((category) => {
          const count = blogPosts.filter((p) => p.category === category.id).length;
          const isActive = active === category.id;
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onSelect(category.id)}
                aria-pressed={isActive}
                className={cn(itemClass, isActive ? "border-gold text-fg" : "border-transparent text-fg-muted hover:text-fg")}
              >
                <span>{category.name}</span>
                {count > 0 && <span className="font-mono text-xs text-fg-subtle">{count}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
