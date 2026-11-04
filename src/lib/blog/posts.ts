import "server-only";

import { unstable_cache } from "next/cache";
import { blogPosts, postsByDate, type BlogPost } from "@/content/blog";
import { PrismaApprovalStore } from "@/lib/approval/prismaStore";
import { BLOG_POST } from "@/lib/approval/types";
import { getPublicSanityPosts, PUBLIC_REVALIDATE_SECONDS } from "@/sanity/queries";
import { toBlogPost } from "./toBlogPost";
import { loadVisibleSanityPosts } from "./visibility";

/** Purged together with SANITY_POSTS_TAG by every decision. */
export const APPROVALS_TAG = "blog-approvals";

// A thrown error is not cached, so a database blip heals on the next revalidation.
const listApproved = unstable_cache(() => new PrismaApprovalStore().listApproved(BLOG_POST), ["approvals", BLOG_POST], {
  revalidate: PUBLIC_REVALIDATE_SECONDS,
  tags: [APPROVALS_TAG],
});

const staticSlugs = new Set(blogPosts.map((p) => p.slug));

/** Everything the public may see, newest first. Used by every public surface: list,
 *  post page, trending posts, sitemap and llms.txt. */
export async function getVisiblePosts(): Promise<BlogPost[]> {
  const sanity = await loadVisibleSanityPosts({
    fetchPosts: getPublicSanityPosts,
    fetchApprovals: listApproved,
    staticSlugs,
  });
  return postsByDate([...blogPosts, ...sanity.map(toBlogPost)]);
}

export function trendingOf(posts: BlogPost[]): BlogPost[] {
  return posts.filter((p) => p.trending).slice(0, 3);
}
