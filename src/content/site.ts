// Site-wide constants and placeholders.
// Anything not yet confirmed by the business is marked as a placeholder string
// wrapped in [ ] so it is impossible to mistake for a real fact.

export const site = {
  name: "Juris Accounting",
  shortName: "Juris",
  tagline: "Bookkeeping, accounting, and taxation — one accountable partner.",
  description:
    "Juris Accounting provides bookkeeping, accounting, and taxation services for businesses and individuals, structured around what your engagement actually needs.",
  email: "[Add approved contact email]",
  phone: "[Add approved contact phone]",
  address: "[Add approved business address]",
  hours: "[Confirm business hours]",
  socials: {
    linkedin: "[Add LinkedIn URL]",
  },
} as const;

export const legalNotice =
  "Juris Accounting is an accounting, bookkeeping, and taxation service provider. Nothing on this website is legal, investment, or audit assurance advice. Service availability, credentials, and jurisdictions are confirmed directly with our team.";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  /** Footer row shown under a dropdown's children — a note plus one link. */
  footer?: { note: string; label: string; href: string };
};

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/services/compare",
    children: [
      {
        label: "Bookkeeping",
        href: "/bookkeeping",
        description: "Transaction recording and the foundation of clean books.",
      },
      {
        label: "Catch-Up Bookkeeping",
        href: "/catch-up-bookkeeping",
        description: "Bringing books that have fallen behind back up to date.",
      },
      {
        label: "Accounting",
        href: "/accounting",
        description: "Review, reconciliation, reporting, and analysis.",
      },
      {
        label: "Taxation",
        href: "/taxation",
        description: "Personal and business return preparation and support.",
      },
      {
        label: "Outsourced Controller Services",
        href: "/controller-services",
        description: "Senior-level oversight of your accounting function.",
      },
      {
        label: "Outsourced CFO Services",
        href: "/cfo-services",
        description: "Forecasting, budgeting, and forward-looking strategy.",
      },
      {
        label: "Payroll Services",
        href: "/payroll",
        description: "Pay runs, tax deposits and filings, and year-end forms.",
      },
      {
        label: "Compliance Services",
        href: "/compliance",
        description: "Registrations, annual filings, and internal controls.",
      },
      {
        label: "Accounts Payable & Receivable Management",
        href: "/accounts-payable-receivable",
        description: "Keeping what you owe and what's owed to you current.",
      },
      {
        label: "Sales Tax Compliance",
        href: "/sales-tax-compliance",
        description: "Registration, filing, and ongoing compliance support.",
      },
    ],
    footer: { note: "Every service has its own page.", label: "Compare services", href: "/services/compare" },
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Industries",
    href: "/industries",
    children: [
      {
        label: "SaaS & Startups",
        href: "/industries/saas-startups",
        description: "Deferred revenue, burn rate, and investor-ready reporting.",
      },
      {
        label: "E-commerce & DTC",
        href: "/industries/ecommerce-dtc",
        description: "Marketplace payouts, platform fees, and inventory.",
      },
      {
        label: "Healthcare Practices",
        href: "/industries/healthcare-practices",
        description: "Insurance reimbursement timing and provider compensation.",
      },
      {
        label: "Real Estate & Property",
        href: "/industries/real-estate-property",
        description: "Per-property performance and trust or escrow accounting.",
      },
      {
        label: "Construction & Trades",
        href: "/industries/construction-trades",
        description: "Job costing, percentage-of-completion, and retainage.",
      },
      {
        label: "Agencies, Consultancies & Law Firms",
        href: "/industries/agencies-consultancies-law-firms",
        description: "Billable time, retainers, and trust or IOLTA accounts.",
      },
    ],
    footer: { note: "Industry pages carry the long-tail traffic.", label: "All industries", href: "/industries" },
  },
  { label: "Process", href: "/process" },
  { label: "Why Juris Accounting", href: "/why-juris" },
  { label: "About", href: "/about" },
];

export const footerNav = {
  services: [
    { label: "Bookkeeping", href: "/bookkeeping" },
    { label: "Accounting", href: "/accounting" },
    { label: "Taxation", href: "/taxation" },
    { label: "Controller Services", href: "/controller-services" },
    { label: "CFO Services", href: "/cfo-services" },
    { label: "Payroll Services", href: "/payroll" },
    { label: "Compliance Services", href: "/compliance" },
    { label: "Compare services", href: "/services/compare" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Why Juris Accounting", href: "/why-juris" },
    { label: "Process", href: "/process" },
    { label: "Industries", href: "/industries" },
  ],
  resources: [
    { label: "Resources & articles", href: "/resources" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};
