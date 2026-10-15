import { Clock } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { BlogCover } from "./BlogCover";
import { formatPostDate, getCategory, type BlogPost } from "@/content/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  const category = getCategory(post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="lux-card group flex h-full flex-col overflow-hidden rounded-card"
    >
      <BlogCover category={post.category} className="h-36 w-full" />
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-silver">
          <span>{category?.name}</span>
          <span className="h-3 w-px bg-line-strong" aria-hidden />
          <span className="inline-flex items-center gap-1 text-fg-subtle">
            <Clock size={11} aria-hidden /> {post.readTime} read
          </span>
        </p>
        <h3 className="mt-3 text-lg leading-snug tracking-[-0.02em] text-fg">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
        <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-subtle">
          {formatPostDate(post.date)}
        </p>
      </div>
    </Link>
  );
}
