import { Link } from "@/components/ui/AppLink";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { articles } from "@/content/articles";

export function ResourcesPreview() {
  return (
    <Section tone="raised" id="resources">
      <SectionHeading
        eyebrow="For later reading"
        title="Guides on bookkeeping, accounting, and tax basics"
        description="A starting set of explainer articles. More will be added as our content and digital marketing program develops."
      />
      <Reveal staggerChildren className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="lux-card flex flex-col rounded-control p-5"
          >
            <Badge tone="muted" className="w-fit">
              {article.category}
            </Badge>
            <h3 className="mt-3 text-base leading-snug text-fg">{article.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
              {article.excerpt}
            </p>
            <span className="mt-4 font-mono text-xs text-fg-muted">
              {article.readTime} read
            </span>
          </Link>
        ))}
      </Reveal>
      <Reveal className="mt-6">
        <Button href="/resources" variant="ghost">
          View all resources →
        </Button>
      </Reveal>
    </Section>
  );
}
