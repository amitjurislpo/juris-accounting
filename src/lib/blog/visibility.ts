import { isApprovedAtRevision } from "@/lib/approval/machine";
import type { ApprovalRecord } from "@/lib/approval/types";
import type { SanityPost } from "@/sanity/types";
import { isValidSlug } from "./slug";

/** The cheap checks that need no database. Static posts win a slug clash. */
export function eligibleSanityPosts(posts: SanityPost[], staticSlugs: ReadonlySet<string>): SanityPost[] {
  return posts.filter(
    (p) => isValidSlug(p.slug) && !staticSlugs.has(p.slug as string) && p.deletionRequested !== true,
  );
}

/** The public filter: only posts approved at their current revision. */
export function approvedSanityPosts(posts: SanityPost[], approvals: ApprovalRecord[]): SanityPost[] {
  const byId = new Map(approvals.map((r) => [r.objectId, r]));
  return posts.filter((p) => isApprovedAtRevision(byId.get(p.id) ?? null, p.revision));
}

export interface PublicReadDeps {
  fetchPosts: () => Promise<SanityPost[]>;
  fetchApprovals: () => Promise<ApprovalRecord[]>;
  staticSlugs: ReadonlySet<string>;
}

/**
 * Fails closed: if the approval lookup fails, no Sanity post is shown. If there is
 * nothing to gate, the database is not queried, so a build can't fail on it.
 */
export async function loadVisibleSanityPosts({ fetchPosts, fetchApprovals, staticSlugs }: PublicReadDeps): Promise<SanityPost[]> {
  const eligible = eligibleSanityPosts(await fetchPosts(), staticSlugs);
  if (eligible.length === 0) return [];
  try {
    return approvedSanityPosts(eligible, await fetchApprovals());
  } catch (error) {
    console.error("[blog] approval lookup failed; hiding all Sanity posts:", error);
    return [];
  }
}
