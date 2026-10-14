import { BookOpen, ChartLine, Receipt, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/AppLink";
import { serviceList } from "@/content/services";

const ICON = { bookkeeping: BookOpen, accounting: ChartLine, taxation: Receipt, controller: ShieldCheck } as const;

export function HeroSplitCards() {
  return (
    <section className="hv">
      <Container className="hv-grid">
        <div>
          <p className="hv-kicker"><span className="hv-dot" aria-hidden />Bookkeeping · Accounting · Taxation · Controller</p>
          <h1 className="hv-title">Clarity behind <span className="hv-accent">every number.</span></h1>
          <p className="hv-lede">
            Bookkeeping, accounting, taxation, and controller oversight — engineered as{" "}
            <strong>one accountable system</strong>, structured around what your business actually needs.
          </p>
          <div className="hv-ctas">
            <Button href="/contact">Book a consultation</Button>
            <Button href="/services/compare" variant="secondary">Explore services</Button>
          </div>
        </div>
        <div className="hv-svc">
          {serviceList.map((s) => {
            const Icon = ICON[s.id] ?? BookOpen;
            return (
              <Link key={s.id} href={s.href} className="hv-svc-card">
                <span className="hv-ic"><Icon size={20} aria-hidden /></span>
                <span className="hv-svc-name">{s.name}</span>
                <span className="hv-svc-desc">{s.oneLiner}</span>
                <ArrowUpRight size={16} className="hv-svc-go" aria-hidden />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
