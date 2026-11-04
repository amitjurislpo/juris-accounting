import type { BlogImage, BlogPost } from "@/content/blog";
import { blogCategories } from "@/content/blogCategories";
import type { SanityImage, SanityPost } from "@/sanity/types";
import { portableTextToHtml } from "./portableText";
import { clean } from "./seo";

function toImage(image: SanityImage, width: number, fallbackAlt: string): BlogImage | undefined {
  if (!image?.url) return undefined;
  const w = image.width ?? 1200;
  const h = image.height ?? 630;
  return {
    url: `${image.url}?w=${width}&auto=format&fit=max`,
    alt: clean(image.alt) ?? fallbackAlt,
    width: Math.min(w, width),
    height: Math.round((h * Math.min(w, width)) / w),
  };
}

/** Category is free text. Text naming one of the site's categories joins that category,
 *  so "payroll" and "Payroll" filter together with the static posts. */
function toCategory(text: string | null): string | undefined {
  const category = clean(text);
  if (!category) return undefined;
  const lower = category.toLowerCase();
  return blogCategories.find((c) => c.id === lower || c.name.toLowerCase() === lower)?.id ?? category;
}

/** A Sanity post in the shape the blog components render. */
export function toBlogPost(post: SanityPost): BlogPost {
  const title = clean(post.title) ?? "Untitled";
  const tags = (post.tags ?? []).map(clean).filter((t): t is string => Boolean(t));
  return {
    slug: post.slug ?? "",
    title,
    metaTitle: clean(post.metaTitle) ?? title,
    excerpt: clean(post.description) ?? "",
    subtitle: clean(post.subtitle),
    category: toCategory(post.category),
    date: (clean(post.publishedAt) ?? post.createdAt).slice(0, 10),
    updatedAt: post.updatedAt,
    readTime: clean(post.readTime),
    keywords: tags,
    tags,
    fromSanity: true,
    trending: post.trending === true,
    author: clean(post.author),
    image: toImage(post.mainImage, 1600, title),
    bodyHtml: portableTextToHtml(post.body),
    faq: (post.faq ?? [])
      .map((f) => ({ q: clean(f.question) ?? "", a: clean(f.answer) ?? "" }))
      .filter((f) => f.q && f.a),
    seo: {
      ogTitle: clean(post.ogTitle),
      ogDescription: clean(post.ogDescription),
      ogImage: toImage(post.metaOgImage, 1200, title),
      canonical: clean(post.canonicalOverride),
    },
  };
}
