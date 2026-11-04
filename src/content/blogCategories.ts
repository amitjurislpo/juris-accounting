// Kept apart from blog.ts so mapping a Sanity post doesn't import every article.

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
