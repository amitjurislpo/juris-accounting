"use client";

type Build = (url: string, text: string) => string;

const targets: { label: string; build: Build }[] = [
  { label: "LinkedIn", build: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { label: "X", build: (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  { label: "Facebook", build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { label: "WhatsApp", build: (u, t) => `https://wa.me/?text=${t}%20${u}` },
];

/** Opens each network's share dialog for the current page URL. */
export function ShareButtons({ title }: { title: string }) {
  function share(build: Build) {
    const url = encodeURIComponent(window.location.href);
    window.open(build(url, encodeURIComponent(title)), "_blank", "noopener,noreferrer");
  }
  return (
    <div className="flex flex-wrap gap-2">
      {targets.map(({ label, build }) => (
        <button
          key={label}
          type="button"
          onClick={() => share(build)}
          aria-label={`Share on ${label}`}
          className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-fg-muted transition-colors hover:border-gold hover:text-fg"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
