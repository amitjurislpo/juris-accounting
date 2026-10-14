// SEO / AIO / GEO page content. One entry per route, rendered by
// components/seo/SeoContent.tsx inside the existing Section layout — no new
// design elements. Kept as typed data, separate from presentation.

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoSubsection = {
  heading: string;
  paragraphs: string[];
};

export type SeoSection = {
  /** Small mono label above the heading (2–4 words). */
  eyebrow: string;
  /** H2. Should carry a target keyword naturally where it reads well. */
  heading: string;
  paragraphs: string[];
  /** Optional checklist rendered with the existing tick-list style. */
  bullets?: string[];
  /** Optional H3 blocks inside the section. */
  subsections?: SeoSubsection[];
};

export type SeoPageContent = {
  /** Route this content belongs to, e.g. "/bookkeeping". */
  path: string;
  /** <title>. 50–60 characters including the brand. */
  title: string;
  /** Meta description. 140–160 characters. */
  metaDescription: string;
  /** Optional H1 override when the current hero title lacks the primary keyword. */
  h1?: string;
  /** 40–60 word direct answer to the page's core question (AI-overview friendly). */
  answer: string;
  /** 5–7 sections, ~1,200–1,600 words in total across sections + FAQs. */
  sections: SeoSection[];
  /** 5–6 page-specific FAQs. */
  faqs: SeoFaq[];
};

export type SeoKeywords = {
  path: string;
  page: string;
  intent: "Commercial" | "Informational" | "Navigational";
  primary: string;
  secondary: string[];
  longTail: string[];
};
