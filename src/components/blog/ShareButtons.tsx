"use client";

type Build = (url: string, text: string) => string;

const paths = {
  facebook: "M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z",
  x: "M18.2 2.3h3.3l-7.2 8.3 8.5 11.2h-6.7l-5.2-6.8-6 6.8H1.6l7.7-8.8L1.2 2.3H8l4.7 6.2 5.5-6.2Zm-1.2 17.5h1.8L7 4.2H5.1L17 19.8Z",
  linkedin: "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1Zm1.8 13.1H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z",
  whatsapp: "M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-3.6.9 1-3.5A9.8 9.8 0 1 1 12 21.8ZM12 0A12 12 0 0 0 1.6 18L0 24l6.2-1.6A12 12 0 1 0 12 0Z",
};

const targets: { label: string; icon: keyof typeof paths; build: Build }[] = [
  { label: "Facebook", icon: "facebook", build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { label: "X", icon: "x", build: (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  { label: "LinkedIn", icon: "linkedin", build: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { label: "WhatsApp", icon: "whatsapp", build: (u, t) => `https://wa.me/?text=${t}%20${u}` },
];

/** Opens each network's share dialog for the current page URL. */
export function ShareButtons({ title }: { title: string }) {
  function share(build: Build) {
    const url = encodeURIComponent(window.location.href);
    window.open(build(url, encodeURIComponent(title)), "_blank", "noopener,noreferrer");
  }
  return (
    <div className="flex flex-wrap gap-3">
      {targets.map(({ label, icon, build }) => (
        <button
          key={label}
          type="button"
          onClick={() => share(build)}
          aria-label={`Share on ${label}`}
          className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-gold hover:text-fg"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d={paths[icon]} />
          </svg>
        </button>
      ))}
    </div>
  );
}
