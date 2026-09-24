import { UserRound } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { team } from "@/content/team";

/**
 * Six team cards. The portrait is a placeholder frame (no stock photos or
 * invented people) with a slow scan and orbiting ring until approved
 * headshots are supplied.
 */
export function TeamGrid() {
  return (
    <Reveal staggerChildren stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member, i) => (
        <article key={i} className="lux-card group flex flex-col rounded-card p-6">
          <div className="flex items-center gap-4">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-line-strong bg-[radial-gradient(circle_at_35%_25%,#222,#0b0b0b_70%)]">
              <UserRound size={26} className="text-fg-subtle transition-colors duration-500 group-hover:text-fg-muted" aria-hidden />
              <span className="team-scan pointer-events-none absolute inset-x-0 top-0 h-1/2" aria-hidden />
              <span
                className="team-orbit pointer-events-none absolute -inset-px rounded-full border border-transparent border-t-white/50"
                aria-hidden
              />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle">
                {member.focus}
              </p>
              <h3 className="mt-1.5 truncate text-lg tracking-[-0.02em] text-fg">{member.name}</h3>
              <p className="mt-0.5 truncate text-sm text-fg-muted">{member.title}</p>
            </div>
          </div>

          <p className="mt-5 flex-1 text-sm leading-relaxed text-fg-muted">{member.bio}</p>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <span className="rounded-xs border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
              {member.credentials}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal opacity-60 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
          </div>
        </article>
      ))}
    </Reveal>
  );
}
