// Blog content: categories and articles. Typed data, separate from
// presentation, so a CMS can replace this file later.

// Long article copy lives in ./blogPosts/ and is imported here.
import { BOOKKEEPING_WORKFLOW_HTML, BOOKKEEPING_WORKFLOW_FAQ } from "./blogPosts/bookkeeping-workflow";

export type BlogCategoryId =
  | "bookkeeping"
  | "accounting"
  | "taxation"
  | "payroll"
  | "cfo-controller"
  | "compliance"
  | "software"
  | "industry-guides";

export type BlogCategory = {
  id: BlogCategoryId;
  name: string;
  description: string;
  /** Topic keywords shown in the blog sidebar; each links to this category. */
  keywords: string[];
};

export const blogCategories: BlogCategory[] = [
  {
    id: "bookkeeping",
    name: "Bookkeeping",
    description: "Recording, reconciling, and catching up on the transactions behind your business.",
    keywords: ["bookkeeping services", "bank reconciliation", "catch-up bookkeeping"],
  },
  {
    id: "accounting",
    name: "Accounting",
    description: "Reviewing, reporting, and understanding what your numbers mean.",
    keywords: ["accounting services", "financial statements", "profit and loss"],
  },
  {
    id: "taxation",
    name: "Taxation",
    description: "Getting records and decisions ready for personal and business tax filing.",
    keywords: ["business tax preparation", "tax planning", "tax-ready books"],
  },
  {
    id: "payroll",
    name: "Payroll",
    description: "Pay runs, payroll taxes, and year-end forms for small teams.",
    keywords: ["payroll services", "payroll taxes", "W-2 and 1099"],
  },
  {
    id: "cfo-controller",
    name: "CFO & Controller",
    description: "Senior finance oversight, forecasting, and planning without a full-time hire.",
    keywords: ["outsourced CFO", "fractional controller", "financial forecasting"],
  },
  {
    id: "compliance",
    name: "Compliance",
    description: "Registrations, annual filings, and the controls that keep a business in good standing.",
    keywords: ["annual report filing", "business compliance", "internal controls"],
  },
  {
    id: "software",
    name: "QuickBooks & Software",
    description: "Setting up, cleaning up, and getting more from your accounting software.",
    keywords: ["QuickBooks Online", "bank feeds", "QuickBooks cleanup"],
  },
  {
    id: "industry-guides",
    name: "Industry Guides",
    description: "How accounting questions show up in specific kinds of business.",
    keywords: ["ecommerce accounting", "SaaS accounting", "restaurant accounting"],
  },
];

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  /** H1 and card title. */
  title: string;
  /** Meta title for the page <title> and Open Graph. */
  metaTitle: string;
  /** Meta description; also the card text and hero lede. */
  excerpt: string;
  category: BlogCategoryId;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  readTime: string;
  /** Meta keywords for the article page. */
  keywords: string[];
  trending?: boolean;
  /** Only set when the source names a real author. */
  author?: string;
  /** Featured image: shown on the card and as the banner on the article page. */
  image: { url: string; alt: string; width: number; height: number };
  /**
   * The whole article body. Every plain <h2>Heading</h2> becomes a table-of-contents
   * entry (see BlogArticle), so keep h2s attribute-free with no nested tags. Do not
   * put the FAQ here; it lives in `faq` and renders (with FAQPage schema) after the body.
   */
  bodyHtml: string;
  faq: BlogFaq[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "bookkeeping-workflow-for-accounting-firms",
    title: "Before You Add Clients, Fix Your Bookkeeping Workflow: A Step-by-Step Guide for Accounting Firms",
    metaTitle: "Bookkeeping Workflow: Fix It Before You Add Clients | Juris CFO",
    excerpt:
      "A step-by-step bookkeeping workflow for US accounting firms: month-end close checklist, document cutoff policy, automation, outsourcing controls, and KPIs.",
    category: "bookkeeping",
    date: "2026-10-27",
    readTime: "12 min",
    keywords: [
      "bookkeeping workflow",
      "bookkeeping workflow for accounting firms",
      "month-end close checklist",
      "month-end close process",
      "bookkeeping process",
      "scale bookkeeping practice",
      "outsourced bookkeeping for CPA firms",
      "bank reconciliation process",
      "document cutoff policy",
      "bookkeeping automation",
      "bookkeeping KPIs",
      "practice management software",
      "bookkeeping review process",
    ],
    author: "Jyoti Upadhyay",
    image: {
      url: "/images/blog/bookkeeping-workflow-for-accounting-firms.jpg",
      alt: "Accountant reviewing a bookkeeping workflow dashboard during month-end close",
      width: 975,
      height: 531,
    },
    bodyHtml: BOOKKEEPING_WORKFLOW_HTML,
    faq: BOOKKEEPING_WORKFLOW_FAQ,
  },
];

export function getCategory(id: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.id === id);
}

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function postsByDate(posts: BlogPost[] = blogPosts): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function postsInCategory(id: BlogCategoryId): BlogPost[] {
  return postsByDate(blogPosts.filter((p) => p.category === id));
}

export const trendingPosts: BlogPost[] = postsByDate(blogPosts.filter((p) => p.trending)).slice(0, 3);

export function formatPostDate(iso: string): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [y, m, d] = iso.split("-").map(Number);
  return `${months[m - 1]} ${d}, ${y}`;
}
