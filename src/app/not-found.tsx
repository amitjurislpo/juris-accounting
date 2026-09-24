import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-canvas py-28 text-fg md:py-36">
      <div className="bg-grid absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--platinum), transparent)" }}
        aria-hidden
      />
      <Container className="max-w-lg text-center">
        <p className="enter font-display text-7xl italic text-metal md:text-8xl">404</p>
        <h1
          className="enter mt-6 text-3xl text-fg md:text-4xl"
          style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
        >
          That page doesn&apos;t exist
        </h1>
        <p
          className="enter mt-4 text-fg-muted"
          style={{ "--enter-delay": "0.2s" } as React.CSSProperties}
        >
          The page you&apos;re looking for may have moved. Try the homepage or
          get in touch if you expected to find something here.
        </p>
        <div
          className="enter mt-10 flex flex-wrap justify-center gap-3"
          style={{ "--enter-delay": "0.3s" } as React.CSSProperties}
        >
          <Button href="/">Back to homepage</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
