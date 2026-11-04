import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { requireAdmin } from "@/lib/admin/session";
import { PrismaApprovalStore } from "@/lib/approval/prismaStore";
import { BLOG_POST } from "@/lib/approval/types";
import { isBlogChecker } from "@/lib/blog/checkers";
import { buildQueue, toReviewItem } from "@/lib/blog/queue";
import { resolveBlogSeo } from "@/lib/blog/seo";
import { toBlogPost } from "@/lib/blog/toBlogPost";
import { getDraftForReview, getPostForReview } from "@/sanity/queries";
import { DecisionButtons } from "../../DecisionButtons";
import { staticSlugs } from "../../data";
import { Marker, ReadOnlyNotice, Warning } from "../../parts";

export const dynamic = "force-dynamic";

const STATE_LABEL = {
  submitted: "Waiting: not on the website",
  rejected: "Rejected: not on the website",
  approved: "Approved: live on the website",
} as const;

/** The current revision, with the same components as the public page, approved or not. */
export default async function PreviewPage({ params }: PageProps<"/admin/blog-reviews/preview/[id]">) {
  const actor = await requireAdmin();
  const id = decodeURIComponent((await params).id);
  if (id.startsWith("drafts.")) notFound();

  const store = new PrismaApprovalStore();
  const [published, record, canDecide] = await Promise.all([getPostForReview(id), store.getApproval(BLOG_POST, id), isBlogChecker(actor)]);

  // A post sent back to its author exists only as a draft now.
  const raw = published ?? (record?.state === "rejected" ? await getDraftForReview(id) : null);
  if (!raw && record?.state !== "rejected") notFound();
  const item = published
    ? toReviewItem(published, record, staticSlugs)
    : buildQueue([], record ? [record] : [], null, staticSlugs)[0];
  const blog = raw ? toBlogPost(raw) : null;
  const seo = blog ? resolveBlogSeo(blog) : null;
  const state = item.deleteFailed ? "Deletion approved: not on the website" : item.deletionRequested ? "Deletion requested: not on the website" : STATE_LABEL[item.state];

  return (
    <main className="space-y-4 pb-16">
      <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-line-strong bg-surface px-6 py-4">
        <div className="text-sm">
          <Link className="text-silver underline" href="/admin/blog-reviews">Back to reviews</Link>
          <p className="mt-1 text-fg">{state}</p>
          {item.deletionRequested && <p className="mt-1"><Marker tone="red">The author asked to delete this post. Approving deletes it.</Marker></p>}
          {item.lastDecision?.reason && item.state === "rejected" && <p className="mt-1 italic text-fg-muted">“{item.lastDecision.reason}”</p>}
        </div>
        <DecisionButtons item={item} canDecide={canDecide} />
      </div>

      <div className="mx-auto max-w-5xl space-y-4 px-6">
        {!canDecide && <ReadOnlyNotice email={actor.email} />}
        {!published && <Warning>This post was sent back and is now a draft in the Studio. {raw ? "Showing that draft, read-only." : "Set SANITY_API_READ_TOKEN to preview drafts here."}</Warning>}

        {seo && raw && (
          <section aria-label="Search and social sharing" className="rounded-2xl border border-line-strong bg-surface p-5">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-muted">What readers don&apos;t see on the page</h2>
            <dl className="grid gap-x-6 gap-y-2 text-sm md:grid-cols-[10rem_1fr]">
              <dt className="text-fg-muted">Page title</dt><dd className="text-fg">{seo.title}</dd>
              <dt className="text-fg-muted">Share title</dt><dd className="text-fg">{seo.ogTitle}</dd>
              <dt className="text-fg-muted">Share description</dt><dd className="text-fg">{seo.ogDescription}</dd>
              <dt className="text-fg-muted">Canonical URL</dt>
              <dd data-testid="canonical" className="break-all text-fg">
                {seo.canonical}{" "}
                {seo.canonicalIsExternal && <Marker tone="red">Points to another site: this page will tell search engines the original is elsewhere</Marker>}
              </dd>
              <dt className="text-fg-muted">Focus keyword</dt><dd className="text-fg">{raw.focusKeyword?.trim() || "Not set"}</dd>
              <dt className="text-fg-muted">Share image</dt>
              <dd>
                {seo.ogImage ? (
                  // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized
                  <img src={seo.ogImage.url} alt={seo.ogImage.alt} className="max-h-48 rounded-xl border border-line" />
                ) : (
                  <span className="text-fg">None</span>
                )}
              </dd>
            </dl>
          </section>
        )}
      </div>

      {blog && <BlogArticle post={blog} preview />}
    </main>
  );
}
