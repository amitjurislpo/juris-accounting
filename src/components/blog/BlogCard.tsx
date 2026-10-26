import { ArrowRight, Clock } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { formatPostDate, getCategory, type BlogPost } from "@/content/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  const category = getCategory(post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="lux-card group flex h-full flex-col overflow-hidden rounded-3xl"
    >
      <div className="p-2 pb-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized */}
        <img
          src={post.image.url}
          alt={post.image.alt}
          width={post.image.width}
          height={post.image.height}
          loading="lazy"
          className="aspect-[16/9] w-full rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-silver">
          <span>{category?.name}</span>
          <span className="h-3 w-px bg-line-strong" aria-hidden />
          <span className="inline-flex items-center gap-1 text-fg-subtle">
            <Clock size={11} aria-hidden /> {post.readTime} read
          </span>
        </p>
        <h3 className="mt-3 text-lg leading-snug tracking-[-0.02em] text-fg">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
          {post.excerpt}
        </p>
        <p className="mt-5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-subtle">
          <span>{formatPostDate(post.date)}</span>
          <ArrowRight
            size={14}
            aria-hidden
            className="text-silver transition-transform group-hover:translate-x-1"
          />
        </p>
      </div>
    </Link>
  );
}
