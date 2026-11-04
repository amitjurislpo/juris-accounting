import "server-only";

import { draftReadClient, readClient } from "./client";
import type { SanityPost, SanityReviewPost } from "./types";

const IMAGE = `{ alt, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;

const FIELDS = `
  "id": _id, "revision": _rev, "createdAt": _createdAt, "updatedAt": _updatedAt,
  "slug": slug.current, title, subtitle, description, "mainImage": mainImage${IMAGE},
  author, category, tags, readTime, publishedAt, trending,
  "body": body[]{ ..., _type == "image" => { "_type": "image", _key, alt, caption, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height } },
  faq[]{ question, answer }, deletionRequested,
  metaTitle, "metaOgImage": metaOgImage${IMAGE}, ogTitle, ogDescription, canonicalOverride
`;

const PUBLIC_POSTS = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${FIELDS} }`;
const REVIEW_POSTS = `*[_type == "post"] | order(_updatedAt desc) { ${FIELDS}, focusKeyword }`;
const REVIEW_POST = `*[_type == "post" && _id == $id][0] { ${FIELDS}, focusKeyword }`;

/** Purged together with the approval cache by every decision. */
export const SANITY_POSTS_TAG = "sanity-posts";
export const PUBLIC_REVALIDATE_SECONDS = 60;

/** Public read, cached about 60 seconds so edits and outside deletions are noticed.
 *  Any failure returns no posts: the site keeps working with its static posts. */
export async function getPublicSanityPosts(): Promise<SanityPost[]> {
  if (!readClient) return [];
  try {
    const posts = await readClient.fetch<SanityPost[]>(PUBLIC_POSTS, {}, {
      next: { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [SANITY_POSTS_TAG] },
    } as object);
    return posts ?? [];
  } catch (error) {
    console.error("[blog] Sanity read failed; showing static posts only:", error);
    return [];
  }
}

const UNCACHED = { cache: "no-store" as const };

/** Uncached, skips the CDN. Throws so the review page can say Sanity is down. */
export async function getPostsForReview(): Promise<SanityReviewPost[]> {
  if (!readClient) return [];
  return (await readClient.fetch<SanityReviewPost[]>(REVIEW_POSTS, {}, UNCACHED)) ?? [];
}

export async function getPostForReview(id: string): Promise<SanityReviewPost | null> {
  if (!readClient) return null;
  return readClient.fetch<SanityReviewPost | null>(REVIEW_POST, { id }, UNCACHED);
}

/** Which of these posts still have a draft, or null if there is no read token. */
export async function getExistingDraftIds(postIds: string[]): Promise<Set<string> | null> {
  if (!draftReadClient) return null;
  const ids = await draftReadClient.fetch<string[]>(
    `*[_id in $ids]._id`,
    { ids: postIds.map((id) => `drafts.${id}`) },
    UNCACHED,
  );
  return new Set(ids.map((id) => id.replace(/^drafts\./, "")));
}

/** A rejected post's draft, for a read-only preview. Null without a read token. */
export async function getDraftForReview(id: string): Promise<SanityReviewPost | null> {
  if (!draftReadClient) return null;
  return draftReadClient.fetch<SanityReviewPost | null>(
    `*[_type == "post" && _id == $id][0] { ${FIELDS}, focusKeyword }`,
    { id: `drafts.${id}` },
    UNCACHED,
  );
}
