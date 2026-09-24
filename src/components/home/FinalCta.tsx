import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <Section tone="deep" border={false} id="final-cta" className="isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div
          className="absolute -right-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--platinum), transparent)" }}
        />
      </div>
      <Reveal className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl leading-[1.08] md:text-[2.75rem]">
            Ready to see which service fits your business?
          </h2>
          <p className="mt-3 text-fg/80">
            A short consultation is the fastest way to get a clear answer on
            scope and pricing — no obligation, no guesswork.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" variant="on-void" glow>
            Book a consultation
          </Button>
          <Button
            href="/pricing"
            variant="secondary"
          >
            Explore pricing
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
