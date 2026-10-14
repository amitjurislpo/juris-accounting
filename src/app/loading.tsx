/** Shown while a route's payload loads during client-side navigation. */
export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-silver">
        Loading
      </span>
      <span className="loader-line" aria-hidden />
    </div>
  );
}
