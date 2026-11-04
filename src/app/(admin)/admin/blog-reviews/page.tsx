import Link from "next/link";
import { requireAdmin } from "@/lib/admin/session";
import { isBlogChecker } from "@/lib/blog/checkers";
import type { ReviewItem } from "@/lib/blog/queue";
import { studioWriteConfigured } from "@/lib/blog/studioWrite";
import { sanityConfigured } from "@/sanity/env";
import { logOut } from "../auth-actions";
import { DecisionButtons } from "./DecisionButtons";
import { loadQueue } from "./data";
import { Marker, ReadOnlyNotice, Warning, formatDate } from "./parts";

export const dynamic = "force-dynamic";

export default async function BlogReviewsPage() {
  const actor = await requireAdmin();
  const canDecide = await isBlogChecker(actor);

  let items: ReviewItem[] | null = null;
  if (sanityConfigured) {
    try {
      items = await loadQueue();
    } catch (error) {
      console.error("[blog] review queue failed:", error);
    }
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl text-fg">Blog reviews</h1>
          <p className="mt-1 text-sm text-fg-muted">Authors publish in the Studio. A post goes live only when a checker approves that exact version here.</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/studio" target="_blank" className="text-silver underline">Open Studio</Link>
          <span className="text-fg-muted">{actor.email}</span>
          <form action={logOut}><button className="text-silver underline">Sign out</button></form>
        </div>
      </header>

      {!canDecide && <ReadOnlyNotice email={actor.email} />}
      {!sanityConfigured && <Warning>Sanity isn&apos;t connected: NEXT_PUBLIC_SANITY_PROJECT_ID is not set for this deployment.</Warning>}
      {sanityConfigured && !items && <Warning>Couldn&apos;t load posts. Please refresh in a moment.</Warning>}
      {!studioWriteConfigured && sanityConfigured && (
        <Warning>SANITY_API_WRITE_TOKEN is not set, so rejected posts can&apos;t return to authors and approved deletions can&apos;t be carried out. Such posts stay off the website, and a retry appears here.</Warning>
      )}

      {items && (
        <>
          <Section title="Waiting" empty="Nothing to review." items={items.filter((i) => i.state === "submitted")} canDecide={canDecide} />
          <Section title="Approved" empty="No approved Sanity posts yet." items={items.filter((i) => i.state === "approved")} canDecide={canDecide} />
          <Section title="Rejected" empty="No rejected posts." items={items.filter((i) => i.state === "rejected")} canDecide={canDecide} />
        </>
      )}
    </main>
  );
}

function Section({ title, items, empty, canDecide }: { title: string; items: ReviewItem[]; empty: string; canDecide: boolean }) {
  return (
    <section aria-labelledby={`section-${title}`} className="rounded-2xl border border-line-strong bg-surface">
      <h2 id={`section-${title}`} className="border-b border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-muted">
        {title} ({items.length})
      </h2>
      {items.length === 0 ? (
        <p className="px-5 py-5 text-sm text-fg-subtle">{empty}</p>
      ) : (
        <ul className="divide-y divide-line">
          {items.map((item) => (
            <Row key={item.id} item={item} canDecide={canDecide} />
          ))}
        </ul>
      )}
    </section>
  );
}

function Row({ item, canDecide }: { item: ReviewItem; canDecide: boolean }) {
  const d = item.lastDecision;
  return (
    <li data-post-id={item.id} className="flex flex-wrap items-start justify-between gap-4 px-5 py-4">
      <div className="min-w-0 flex-1 text-sm">
        <p className="text-base text-fg">{item.title}</p>
        <p className="font-mono text-xs text-fg-subtle">/blog/{item.slug ?? "(no slug)"} · edited {formatDate(item.updatedAt)}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {item.deletionRequested && <Marker tone="red">Deletion requested</Marker>}
          {!item.slugValid && <Marker tone="red">Invalid slug: the author must fix it</Marker>}
          {item.slugClashesWithStatic && <Marker tone="red">Slug used by an existing article</Marker>}
          {item.editedSinceDecision && <Marker tone="amber">Edited since last decision</Marker>}
          {item.sendBackFailed && <Marker tone="amber">Not sent back yet: still published in Sanity</Marker>}
          {item.deleteFailed && <Marker tone="amber">Deletion approved: not deleted yet</Marker>}
        </div>
        {item.sendBackFailed && (
          <p role="alert" className="mt-2 text-xs text-amber-300">
            Rejected, but not sent back to the author yet. The post stays off the website. Use “Send back to author”.
          </p>
        )}
        {item.deleteFailed && (
          <p role="alert" className="mt-2 text-xs text-amber-300">
            Deletion approved, but the post is still in Sanity. It stays off the website. Use “Delete now”.
          </p>
        )}
        {d && (
          <p className="mt-2 text-xs text-fg-muted">
            Last decision: {d.state} by {d.decidedBy}, {formatDate(d.decidedAt)}
            {d.reason && <span className="block italic">“{d.reason}”</span>}
          </p>
        )}
        <p className="mt-2 flex gap-3 text-xs">
          <Link className="text-silver underline" href={`/admin/blog-reviews/preview/${encodeURIComponent(item.id)}`}>Preview</Link>
          {item.state === "approved" && !item.deletionRequested && (
            <Link className="text-silver underline" href={`/blog/${item.slug}`} target="_blank">View live</Link>
          )}
        </p>
      </div>
      <DecisionButtons item={item} canDecide={canDecide} />
    </li>
  );
}
