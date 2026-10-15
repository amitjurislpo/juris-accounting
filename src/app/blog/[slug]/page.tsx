import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/components/ui/AppLink";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCover } from "@/components/blog/BlogCover";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import { FinalCta } from "@/components/home/FinalCta";
import { blogPosts, formatPostDate, getCategory, getPost, sectionId } from "@/content/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found | Juris CFO" };
  return {
    title: `${post.title} | Juris CFO`,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const category = getCategory(post.category)!;

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={post.title}
        description={post.excerpt}
        crumbs={[
          { label: "Blog", href: "/blog" },
          { label: category.name, href: `/blog/category/${category.id}` },
          { label: post.title },
        ]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="Table of contents">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver">Table of contents</p>
              <ol className="mt-4 flex flex-col border-l border-line">
                {post.sections.map((section, i) => (
                  <li key={section.heading}>
                    <a
                      href={`#${sectionId(section.heading)}`}
                      className="-ml-px block border-l border-transparent px-4 py-2 text-sm text-fg-muted transition-colors hover:border-gold hover:text-fg"
                    >
                      {i + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-silver">Share it on</p>
            <div className="mt-4">
              <ShareButtons title={post.title} />
            </div>
          </aside>

          <article className="max-w-2xl">
            <Link
              href={`/blog/category/${category.id}`}
              className="link-draw mb-6 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={16} aria-hidden /> Back to {category.name}
            </Link>

            <BlogCover category={post.category} className="h-52 w-full rounded-card border border-line md:h-64" />
            <p className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-subtle">
              <span>By Juris CFO team</span>
              <span className="h-3 w-px bg-line-strong" aria-hidden />
              <span>{formatPostDate(post.date)}</span>
              <span className="h-3 w-px bg-line-strong" aria-hidden />
              <span className="inline-flex items-center gap-1">
                <Clock size={11} aria-hidden /> {post.readTime} read
              </span>
            </p>

            <Reveal className="mt-8">
              <p className="text-lg leading-relaxed text-fg">{post.intro}</p>
              {post.sections.map((section) => (
                <section key={section.heading} className="mt-10">
                  <h2 id={sectionId(section.heading)} className="scroll-mt-28 text-2xl tracking-[-0.03em] text-fg">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-base leading-relaxed text-fg-muted">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-base text-fg-muted marker:text-gold">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              <p className="mt-10 border-t border-line pt-6 text-sm text-fg-subtle">
                This article is general information, not tax, legal or investment advice. Talk to our team about
                your specific situation.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/blog/category/${category.id}`}
                className="inline-flex items-center gap-2 rounded-control border border-line-strong px-5 py-3 text-sm text-fg transition-colors hover:border-gold"
              >
                <ArrowLeft size={16} aria-hidden /> Back to {category.name}
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-control border border-line px-5 py-3 text-sm text-fg-muted transition-colors hover:border-gold hover:text-fg"
              >
                All articles
              </Link>
            </div>
          </article>
        </div>
      </Section>
      <TrendingPosts exclude={post.slug} />
      <FinalCta />
    </>
  );
}
