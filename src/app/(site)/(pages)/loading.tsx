/** Shown while a route loads during client-side navigation. The blog routes sit outside this
 * group on purpose: a loading boundary starts the response early, which would turn a missing
 * post into HTTP 200 instead of 404. */
export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver">
        Loading
      </span>
      <span className="loader-line" aria-hidden />
    </div>
  );
}
