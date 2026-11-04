export type SanityImage = {
  alt?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
} | null;

/** A published post as the public site reads it. Has no focusKeyword and no
 *  reviewFeedback: neither can reach a page because neither is ever fetched. */
export type SanityPost = {
  id: string;
  revision: string;
  createdAt: string;
  updatedAt: string;
  slug: string | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  mainImage: SanityImage;
  author: string | null;
  category: string | null;
  tags: string[] | null;
  readTime: string | null;
  publishedAt: string | null;
  trending: boolean | null;
  body: unknown[] | null;
  faq: { question?: string | null; answer?: string | null }[] | null;
  deletionRequested: boolean | null;
  metaTitle: string | null;
  metaOgImage: SanityImage;
  ogTitle: string | null;
  ogDescription: string | null;
  canonicalOverride: string | null;
};

export type SanityReviewPost = SanityPost & { focusKeyword: string | null };
