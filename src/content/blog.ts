// Blog content: categories and articles. Typed data, separate from
// presentation, so a CMS can replace this file later.

// Long article copy lives in ./blogPosts/ and is imported here.
import { BOOKKEEPING_WORKFLOW_HTML, BOOKKEEPING_WORKFLOW_FAQ } from "./blogPosts/bookkeeping-workflow";
import { VIRTUAL_CFO_SERVICES_HTML, VIRTUAL_CFO_SERVICES_FAQ } from "./blogPosts/virtual-cfo-services";
import {
  OUTSOURCED_BOOKKEEPING_SERVICES_HTML,
  OUTSOURCED_BOOKKEEPING_SERVICES_FAQ,
} from "./blogPosts/outsourced-bookkeeping-services";
import {
  OUTSOURCED_ACCOUNTING_SERVICES_SMALL_BUSINESS_HTML,
  OUTSOURCED_ACCOUNTING_SERVICES_SMALL_BUSINESS_FAQ,
} from "./blogPosts/outsourced-accounting-services-small-business";
import { YEAR_END_ACCOUNTING_CHECKLIST_HTML, YEAR_END_ACCOUNTING_CHECKLIST_FAQ } from "./blogPosts/year-end-accounting-checklist";

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
  {
    slug: "virtual-cfo-services",
    title: "Virtual CFO Services: What a Fractional CFO Does, What It Costs, and When You Need One",
    metaTitle: "Virtual CFO Services: What a Fractional CFO Does & Costs",
    excerpt:
      "Virtual CFO services explained: what a fractional CFO does, when to hire one, what it costs per month ($3K-$15K), and how to choose the right partner.",
    category: "cfo-controller",
    date: "2026-10-28",
    readTime: "13 min",
    keywords: [
      "virtual cfo services",
      "fractional cfo services",
      "outsourced cfo",
      "cfo advisory services",
      "part-time cfo for small business",
      "what does a fractional cfo do",
      "when to hire a fractional cfo",
      "at what revenue should I hire a fractional cfo",
      "how much does a virtual cfo cost per month",
      "bookkeeper vs controller vs cfo",
      "financial modeling",
      "budget vs actual variance",
      "unit economics",
      "pricing strategy",
      "KPI framework",
      "board reporting",
      "fundraising support",
      "lender covenant reporting",
      "cash flow forecasting",
    ],
    image: {
      url: "/images/blog/virtual-cfo-services.jpg",
      alt: "Fractional CFO reviewing a cash flow forecast with a business owner",
      width: 1707,
      height: 921,
    },
    bodyHtml: VIRTUAL_CFO_SERVICES_HTML,
    faq: VIRTUAL_CFO_SERVICES_FAQ,
  },
  {
    slug: "outsourced-bookkeeping-services",
    title: "Outsourced Bookkeeping Services for Small Business: Costs, Scope & How to Choose (2026)",
    metaTitle: "Outsourced Bookkeeping Services for Small Business (2026)",
    excerpt:
      "What outsourced bookkeeping services include, what they cost per month in 2026, outsourced vs. in-house math, and how to choose a provider without overpaying.",
    category: "bookkeeping",
    date: "2026-10-30",
    readTime: "15 min",
    keywords: [
      "outsourced bookkeeping services",
      "outsourced bookkeeping for small business",
      "virtual bookkeeping services",
      "remote bookkeeping services",
      "outsourced bookkeeping company",
      "online bookkeeping services",
    ],
    image: {
      url: "/images/blog/outsourced-bookkeeping-services.jpg",
      alt: "Outsourced bookkeeping services for small business: monthly cost and scope overview",
      width: 1536,
      height: 1024,
    },
    bodyHtml: OUTSOURCED_BOOKKEEPING_SERVICES_HTML,
    faq: OUTSOURCED_BOOKKEEPING_SERVICES_FAQ,
  },
  {
    slug: "outsourced-accounting-services-small-business",
    title: "Is It Time to Outsource Your Accounting? A Guide for US Small Businesses",
    metaTitle: "Outsourced Accounting Services for Small Business (2026)",
    excerpt:
      "Thinking about outsourced accounting services? See the 6 signs it's time, real costs vs. an in-house hire, the first 90 days, and how to pick a US partner.",
    category: "accounting",
    date: "2026-10-31",
    readTime: "10 min",
    keywords: [
      "outsourced accounting services",
      "outsource your accounting",
      "outsourced bookkeeping",
      "in-house accountant",
      "small business accounting",
      "month-end close",
      "virtual CFO",
      "fractional CFO",
      "catch-up bookkeeping",
      "accounting partner",
      "financial statements",
    ],
    author: "Jyoti Upadhyay",
    image: {
      url: "/images/blog/outsourced-accounting-services-small-business.jpg",
      alt: "Checklist of signs a small business should outsource its accounting next to a rising bar chart",
      width: 840,
      height: 441,
    },
    bodyHtml: OUTSOURCED_ACCOUNTING_SERVICES_SMALL_BUSINESS_HTML,
    faq: OUTSOURCED_ACCOUNTING_SERVICES_SMALL_BUSINESS_FAQ,
  },
  {
    slug: "year-end-accounting-checklist",
    title: "Year-End Accounting Checklist for Small Businesses: 9 Steps to Close 2026 Cleanly",
    metaTitle: "Year-End Accounting Checklist for Small Businesses (2026)",
    excerpt:
      "Use this year-end accounting checklist to reconcile accounts, review payroll and 1099s, check inventory and depreciation, and hand your CPA clean books.",
    category: "taxation",
    date: "2026-10-31",
    readTime: "11 min",
    keywords: [
      "year-end accounting checklist",
      "year-end accounting",
      "year-end close",
      "small business year-end checklist",
      "reconciliations",
      "Form W-2",
      "Form 1099",
      "financial statements",
      "depreciation",
      "sales tax",
      "tax professional",
      "CPA",
    ],
    author: "Jyoti Upadhyay",
    image: {
      url: "/images/blog/year-end-accounting-checklist.jpg",
      alt: "Small business owner working through a year-end accounting checklist with reconciled bank statements",
      width: 964,
      height: 642,
    },
    bodyHtml: YEAR_END_ACCOUNTING_CHECKLIST_HTML,
    faq: YEAR_END_ACCOUNTING_CHECKLIST_FAQ,
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
