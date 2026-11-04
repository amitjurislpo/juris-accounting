export function ReadOnlyNotice({ email }: { email: string }) {
  return (
    <p role="status" className="rounded-xl border border-amber-500/50 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
      <strong>{email}</strong> is an admin but not a blog checker, so this page is read-only. A checker has to be listed in the BlogChecker table.
    </p>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return <p role="alert" className="rounded-xl border border-amber-500/50 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{children}</p>;
}

export function Marker({ tone, children }: { tone: "red" | "amber"; children: React.ReactNode }) {
  const colors = tone === "red" ? "bg-red-700 text-white" : "bg-amber-500/20 text-amber-200";
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${colors}`}>{children}</span>;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }) + " UTC";
}
