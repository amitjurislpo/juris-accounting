import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="max-w-lg text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-forest">
          404
        </p>
        <h1 className="mt-4 text-3xl text-charcoal md:text-4xl">
          That page doesn&apos;t exist
        </h1>
        <p className="mt-4 text-charcoal-soft">
          The page you&apos;re looking for may have moved. Try the homepage or
          get in touch if you expected to find something here.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to homepage</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
