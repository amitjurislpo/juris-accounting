import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { articles } from "@/content/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

function findArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: "Resource not found | Juris Accounting" };
  return {
    title: `${article.title} | Juris Accounting`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
      />
      <Section>
        <Reveal className="max-w-2xl">
          <Badge tone="platinum" className="mb-6">
            Placeholder article
          </Badge>
          <p className="text-base leading-relaxed text-fg-muted">
            This article is a placeholder card ahead of our full content and
            digital marketing program. The final version will include a
            complete, reviewed write-up on this topic — for now, this page
            demonstrates the resource structure the site is built to support.
          </p>
          <div className="mt-8">
            <Button href="/resources" variant="ghost">
              ← Back to all resources
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
