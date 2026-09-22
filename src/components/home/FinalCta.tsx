import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <Section tone="deep" border={false} id="final-cta">
      <Reveal className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl leading-tight md:text-4xl">
            Ready to see which service fits your business?
          </h2>
          <p className="mt-3 text-ivory/80">
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
            className="border-ivory/40 text-ivory hover:bg-ivory hover:text-forest"
          >
            Explore pricing
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
