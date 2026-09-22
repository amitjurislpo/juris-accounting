import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { HeroShowcase } from "@/components/motion/HeroShowcase";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-ivory">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--emerald), transparent)" }}
        aria-hidden
      />

      <Container className="relative grid gap-12 pb-14 pt-8 md:pb-20 md:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-charcoal-soft shadow-sm">
              <Sparkles size={13} className="text-forest" aria-hidden />
              Bookkeeping · Accounting · Taxation · Controller
            </span>
          </Reveal>
          <h1 className="mt-6 text-5xl leading-[1.05] text-charcoal sm:text-6xl md:text-7xl">
            <SplitHeadline text="Clarity behind" className="block" />
            <SplitHeadline
              text="every number."
              baseDelay={0.35}
              className="block italic text-forest"
            />
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-charcoal-soft">
              Bookkeeping, accounting, taxation, and controller oversight —
              engineered as one accountable system, structured around what
              your business actually needs.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/contact" glow>
                Book a consultation
              </Button>
              <Button href="/services/compare" variant="secondary">
                Explore services
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <HeroShowcase className="w-full max-w-lg lg:max-w-none" />
        </Reveal>
      </Container>
    </section>
  );
}
