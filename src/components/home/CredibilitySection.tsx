import { ShieldCheck, MessageSquare, FileLock2, UserCheck } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";

const principles = [
  {
    icon: MessageSquare,
    title: "Direct communication",
    body: "You work with people who understand your engagement, not a rotating queue.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent scope & pricing",
    body: "You always know what's included, what isn't, and why final pricing looks the way it does.",
  },
  {
    icon: FileLock2,
    title: "Your records stay yours",
    body: "Your financial records and documentation remain accessible to you throughout the engagement.",
  },
  {
    icon: UserCheck,
    title: "Right-sized service",
    body: "Bookkeeping, accounting, taxation, and controller oversight are scoped to what your business actually needs — not a bundled package.",
  },
];

export function CredibilitySection() {
  return (
    <Section tone="canvas" id="why-trust">
      <Reveal>
        <Eyebrow>Why work with us</Eyebrow>
        <p className="mt-6 max-w-3xl font-display text-3xl leading-[1.1] text-fg md:text-5xl">
          <SplitHeadline text="Precision isn't a feature." className="block" />
          <SplitHeadline
            text="It's the standard."
            baseDelay={0.3}
            className="block italic text-silver"
          />
        </p>
        <p className="mt-6 max-w-xl text-fg-muted">
          We&apos;d rather show you how an engagement actually runs than list
          certifications we haven&apos;t confirmed yet. Formal credentials and
          client proof points will appear here once approved.
        </p>
      </Reveal>

      <Reveal staggerChildren className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p) => (
          <div key={p.title} className="group">
            <span className="icon-draw grid h-11 w-11 place-items-center border border-silver/30 transition-colors duration-500 group-hover:border-silver">
              <p.icon className="text-silver" size={20} aria-hidden />
            </span>
            <h3 className="mt-5 text-lg text-fg">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{p.body}</p>
          </div>
        ))}
      </Reveal>

      <p className="mt-8 font-mono text-xs text-fg-muted">
        [Reserved for approved credentials, certifications, and client proof points]
      </p>
    </Section>
  );
}
