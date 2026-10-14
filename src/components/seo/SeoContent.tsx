import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { seoPages } from "@/content/seo";
import { site } from "@/content/site";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Keyword-targeted copy for a route: a direct answer, page-specific sections,
 * and 5–6 FAQs — rendered with the site's existing Section / heading / list
 * styles — plus FAQPage structured data for search and AI answer engines.
 */
export function SeoContent({ path, part }: { path: string; part: "intro" | "faq" }) {
  const page = seoPages[path];
  if (!page) return null;

  const faqItems = page.faqs.map((faq) => ({
    slug: `${slugify(path) || "home"}-${slugify(faq.question).slice(0, 48)}`,
    category: "General" as const,
    question: faq.question,
    answer: faq.answer,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.metaDescription,
        isPartOf: { "@type": "WebSite", name: site.name },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  if (part === "faq") {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Section id="faq">
          <SectionHeading eyebrow="Before you reach out" title="Frequently asked questions" />
          <Reveal className="mt-8">
            <FaqAccordion items={faqItems} />
          </Reveal>
        </Section>
      </>
    );
  }

  return (
    <>
      {page.sections.map((section, i) => (
        <Section key={section.heading} tone={i % 2 === 0 ? "canvas" : "raised"}>
          <SectionHeading eyebrow={section.eyebrow} title={section.heading} />
          <Reveal className="mt-6 max-w-3xl">
            {i === 0 && <p className="text-base font-medium leading-relaxed text-fg">{page.answer}</p>}
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-relaxed text-fg-muted first:mt-0">
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-6 flex flex-col gap-3">
                {section.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-fg-muted">
                    <Check size={18} className="mt-0.5 shrink-0 text-silver" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.subsections?.map((sub) => (
              <div key={sub.heading} className="mt-8">
                <h3 className="text-lg text-fg">{sub.heading}</h3>
                {sub.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-base leading-relaxed text-fg-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </Reveal>
        </Section>
      ))}
    </>
  );
}
