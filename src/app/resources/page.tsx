import type { Metadata } from "next";
import { Link } from "@/components/ui/AppLink";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { articles } from "@/content/articles";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Resources | Juris Accounting",
  description:
    "Guides and explainers on bookkeeping, accounting, and taxation basics.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Guides on bookkeeping, accounting, and tax basics"
        description="A starting library of explainer content. This is a placeholder structure ahead of our full content and digital marketing program."
      />
      <Section>
        <Reveal staggerChildren className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="lux-card flex flex-col rounded-control p-5"
            >
              <Badge tone="muted" className="w-fit">
                {article.category}
              </Badge>
              <h2 className="mt-3 text-lg leading-snug text-fg">{article.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                {article.excerpt}
              </p>
              <span className="mt-4 font-mono text-xs text-fg-muted">
                {article.readTime} read
              </span>
            </Link>
          ))}
        </Reveal>
      </Section>
      <FinalCta />
    </>
  );
}
