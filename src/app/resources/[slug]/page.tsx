import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
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
  if (!article) return { title: "Resource not found | Juris CFO" };
  return {
    title: `${article.title} | Juris CFO`,
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
          <div className="flex flex-col gap-5">
            {article.body.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-fg-muted">
                {paragraph}
              </p>
            ))}
          </div>
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
