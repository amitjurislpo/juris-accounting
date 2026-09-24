import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { HeroCore } from "./HeroCore";
import { Parallax } from "@/components/motion/Parallax";
import { Container } from "@/components/ui/Container";
import { HeroBackdrop } from "./HeroBackdrop";

function enter(delay: number) {
  return { "--enter-delay": `${delay}s` } as CSSProperties;
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      {/* Atmosphere: a single soft key light raking in from the top-left
          (like a studio light across a desk), a fine grid, and a slowly
          drifting ambient glow, over a living accounting backdrop. */}
      <div className="enter-fade absolute inset-0 -z-10">
        <HeroBackdrop />
      </div>
      <Parallax speed={0.25} className="enter-fade absolute inset-0 -z-10">
        <div
          className="absolute -left-[20%] -top-[40%] h-[140%] w-[70%] rotate-[-24deg] opacity-[0.07] blur-3xl"
          style={{ background: "linear-gradient(90deg, transparent, #fff 45%, transparent)" }}
        />
        <div
          className="ambient-drift absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "radial-gradient(closest-side, #fff, transparent)" }}
        />
      </Parallax>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(0,0,0,0.7) 100%)" }}
        aria-hidden
      />

      <Container className="relative pb-12 pt-6 md:pb-14 md:pt-8">
        {/* HUD metadata row */}
        <div
          className="enter flex items-center justify-between gap-6 border-b border-line pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle"
          style={enter(0)}
        >
          <span className="flex items-center gap-3">
            <span className="beacon relative h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
            <span className="sm:hidden">Books · Accounts · Tax</span>
            <span className="hidden sm:inline">Bookkeeping · Accounting · Taxation · Controller</span>
          </span>
          <span className="hidden md:inline">Scroll to explore</span>
        </div>

        <div className="mt-10 grid gap-12 md:mt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
          <div>
            <h1 className="hero-title text-[2.7rem] font-semibold leading-[0.95] tracking-[-0.055em] text-fg sm:text-[4rem] lg:text-[4.6rem] xl:text-[5.2rem]">
              <SplitHeadline text="Clarity behind" trigger="load" baseDelay={0.1} className="block" wordClassName="hero-title-word" />
              <SplitHeadline
                text="every number."
                trigger="load"
                baseDelay={0.3}
                className="block font-serif text-[1.12em] font-normal italic leading-[0.9] tracking-[-0.02em]"
                wordClassName="text-metal hero-title-glow pr-[0.04em]"
              />
            </h1>
            <p className="enter mt-7 max-w-lg border-l border-white/25 pl-5 text-base font-medium leading-relaxed text-fg/80 sm:text-[1.15rem]" style={enter(0.55)}>
              <span className="text-fg">Bookkeeping, accounting, taxation, and controller oversight</span> —
              engineered as <span className="font-semibold text-fg">one accountable system</span>, structured around what
              your business actually needs.
            </p>
            <div className="enter mt-8 flex flex-wrap items-center gap-3 sm:gap-4" style={enter(0.65)}>
              <Button href="/contact" glow>
                Book a consultation
              </Button>
              <Button href="/services/compare" variant="secondary">
                Explore services
              </Button>
            </div>
          </div>

          <div className="enter relative" style={enter(0.4)}>
            <HeroCore className="lg:mr-0" />
          </div>
        </div>
      </Container>
    </section>
  );
}
