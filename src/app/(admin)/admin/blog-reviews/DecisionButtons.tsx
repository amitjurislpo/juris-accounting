"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ReviewItem } from "@/lib/blog/queue";
import { approveBlogPost, deleteNow, rejectBlogPost, sendBackToAuthor, type DecisionResult } from "./actions";

const base = "rounded-xl px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40";
const NOT_CHECKER = "Only blog checkers can do this.";

/** Buttons match the state. The server re-checks everything; this is only the UI. */
export function DecisionButtons({ item, canDecide }: { item: ReviewItem; canDecide: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<{ tone: "error" | "warning"; text: string } | null>(null);

  const run = (fn: () => Promise<DecisionResult>) =>
    start(async () => {
      const result = await fn();
      if (!result.ok) setMessage({ tone: "error", text: result.error });
      else if (result.warning) setMessage({ tone: "warning", text: result.warning });
      else setMessage(null);
      if (result.ok) {
        setRejecting(false);
        setReason("");
      }
      router.refresh();
    });

  const revision = item.revision;
  if (!revision) return null;
  const ids = { postId: item.id, revision };
  let controls = null;

  if (item.deleteFailed) {
    controls = (
      <button type="button" disabled={pending || !canDecide} title={canDecide ? undefined : NOT_CHECKER} onClick={() => run(() => deleteNow(ids))} className={`${base} bg-red-700 text-white`}>
        {pending ? "Deleting…" : "Delete now"}
      </button>
    );
  } else if (item.sendBackFailed) {
    controls = (
      <button type="button" disabled={pending || !canDecide} title={canDecide ? undefined : NOT_CHECKER} onClick={() => run(() => sendBackToAuthor(ids))} className={`${base} bg-amber-600 text-white`}>
        {pending ? "Sending…" : "Send back to author"}
      </button>
    );
  } else if (item.state === "submitted" && rejecting) {
    controls = (
      <div className="flex w-full max-w-md flex-col gap-2">
        <label className="text-sm text-fg-muted" htmlFor={`reason-${item.id}`}>What should the author change?</label>
        <textarea id={`reason-${item.id}`} rows={3} value={reason} onChange={(e) => setReason(e.target.value)} className="rounded-xl border border-line-strong bg-surface px-3 py-2 text-sm text-fg" />
        <div className="flex justify-end gap-2">
          <button type="button" disabled={pending} onClick={() => setRejecting(false)} className={`${base} text-fg-muted`}>Cancel</button>
          <button type="button" disabled={pending || !reason.trim()} onClick={() => run(() => rejectBlogPost({ ...ids, reason }))} className={`${base} bg-red-700 text-white`}>
            {pending ? "Rejecting…" : "Confirm reject"}
          </button>
        </div>
      </div>
    );
  } else if (item.state === "submitted") {
    const tip = canDecide ? undefined : NOT_CHECKER;
    controls = (
      <>
        <button type="button" disabled={pending || !canDecide} title={tip} onClick={() => run(() => approveBlogPost(ids))} className={`${base} ${item.deletionRequested ? "bg-red-700" : "bg-emerald-700"} text-white`}>
          {pending ? "Working…" : item.deletionRequested ? "Approve deletion" : "Approve"}
        </button>
        <button type="button" disabled={pending || !canDecide} title={tip} onClick={() => setRejecting(true)} className={`${base} border border-red-400 text-red-300`}>
          Reject
        </button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex flex-wrap justify-end gap-2">{controls}</div>
      {message && (
        <p role="alert" className={`max-w-md text-right text-sm ${message.tone === "error" ? "text-red-400" : "text-amber-400"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
