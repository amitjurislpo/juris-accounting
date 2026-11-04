import type { Metadata } from "next";
import type { BlogImage, BlogPost } from "@/content/blog";
import { siteUrl } from "@/content/site";

/** A field cleared to an empty string (or just spaces) counts as empty. */
export function clean(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

const base = () => siteUrl.replace(/\/$/, "");

export function absoluteUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `${base()}${url.startsWith("/") ? "" : "/"}${url}`;
}

export const postUrl = (slug: string) => `${base()}/blog/${slug}`;

export function isHttpUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    return ["http:", "https:"].includes(new URL(url).protocol);
  } catch {
    return false;
  }
}

/** One set of fallbacks, used by the public page and the checker's preview. */
export function resolveBlogSeo(post: BlogPost) {
  const title = clean(post.metaTitle) ?? post.title;
  const ownUrl = postUrl(post.slug);
  const override = clean(post.seo?.canonical);
  const canonical = isHttpUrl(override) ? override : ownUrl;
  const image: BlogImage | undefined = post.seo?.ogImage ?? post.image;
  return {
    title,
    description: post.excerpt,
    ogTitle: clean(post.seo?.ogTitle) ?? title,
    ogDescription: clean(post.seo?.ogDescription) ?? post.excerpt,
    ogImage: image ? { ...image, url: absoluteUrl(image.url) } : undefined,
    canonical,
    ownUrl,
    canonicalIsExternal: new URL(canonical).host !== new URL(ownUrl).host,
  };
}

export function buildBlogMetadata(post: BlogPost): Metadata {
  const seo = resolveBlogSeo(post);
  const images = seo.ogImage ? [{ url: seo.ogImage.url, width: seo.ogImage.width, height: seo.ogImage.height, alt: seo.ogImage.alt }] : undefined;
  return {
    title: seo.title,
    description: seo.description,
    keywords: post.keywords.length > 0 ? post.keywords.join(", ") : undefined,
    alternates: { canonical: seo.canonical, languages: { "en-US": seo.ownUrl, "x-default": seo.ownUrl } },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      type: "article",
      url: seo.canonical,
      publishedTime: post.date,
      images,
    },
    twitter: {
      card: seo.ogImage ? "summary_large_image" : "summary",
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: seo.ogImage ? [seo.ogImage.url] : undefined,
    },
  };
}
