import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogToc, type TocItem } from "@/components/blog/BlogToc";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import { FinalCta } from "@/components/home/FinalCta";
import { formatPostDate, getCategory, getPost } from "@/content/blog";
import { site, siteUrl } from "@/content/site";

export function getArticleMetadata(slug: string): Metadata {
  const post = getPost(slug);
  if (!post) return { title: "Article not found | Juris CFO" };
  return {
    title: post.metaTitle,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
    openGraph: {
      title: post.metaTitle,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image.url, width: post.image.width, height: post.image.height, alt: post.image.alt }],
    },
  };
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, "").replace(/&rsquo;/g, "’").replace(/&amp;/g, "&");
}

/** Adds an id to every plain <h2> and returns the matching table of contents. */
function prepareBody(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const out = html.replace(/<h2>(.*?)<\/h2>/g, (_, inner: string) => {
    const title = stripTags(inner);
    const id = slugify(title);
    toc.push({ id, title });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export function BlogArticle({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) notFound();
  const category = getCategory(post.category)!;
  const { html, toc } = prepareBody(post.bodyHtml);
  const tocItems: TocItem[] = post.faq.length > 0 ? [...toc, { id: "faq", title: "Frequently asked questions" }] : toc;
  const url = `${siteUrl}/blog/${post.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${post.image.url}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-US",
    mainEntityOfPage: url,
    keywords: post.keywords.join(", "),
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: site.name },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {post.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <PageHero
        eyebrow={`${category.name} · ${formatPostDate(post.date)}`}
        title={post.title}
        description={post.excerpt}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: category.name }]}
      />
      <Section>
        <Link
          href="/blog"
          className="link-draw mb-6 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={16} aria-hidden /> Back to blog
        </Link>

        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized */}
        <img
          src={post.image.url}
          alt={post.image.alt}
          width={post.image.width}
          height={post.image.height}
          className="mx-auto h-96 w-full rounded-3xl border border-line object-cover md:h-[490px]"
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-subtle">
            <span>By {post.author ?? "Juris CFO team"}</span>
            <span className="h-3 w-px bg-line-strong" aria-hidden />
            <span>{formatPostDate(post.date)}</span>
            <span className="h-3 w-px bg-line-strong" aria-hidden />
            <span className="inline-flex items-center gap-1">
              <Clock size={11} aria-hidden /> {post.readTime} read
            </span>
          </p>
          <ShareButtons title={post.title} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <BlogToc items={tocItems} />
          </aside>

          <article className="min-w-0 max-w-3xl">
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
            <p className="mt-10 border-t border-line pt-6 text-sm text-fg-subtle">
              This article is general information, not tax, legal or investment advice. Talk to our team about
              your specific situation.
            </p>
            {post.faq.length > 0 && (
              <section id="faq" className="mt-12 scroll-mt-28">
                <h2 className="text-2xl tracking-[-0.03em] text-fg">Frequently asked questions</h2>
                <div className="mt-5">
                  <FaqAccordion
                    compact
                    items={post.faq.map((f, i) => ({ slug: `${post.slug}-${i}`, question: f.q, answer: f.a, category: "Bookkeeping" }))}
                  />
                </div>
              </section>
            )}
          </article>
        </div>
      </Section>
      <TrendingPosts exclude={post.slug} />
      <FinalCta />
    </>
  );
}
