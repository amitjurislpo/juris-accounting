// Service definitions for Bookkeeping, Accounting, Taxation, and Outsourced
// Controller Services. Kept as typed data, separate from presentation, so a
// future CMS (e.g. Sanity) can replace this file without touching components.

export type ServiceId = "bookkeeping" | "accounting" | "taxation" | "controller";

export type ServiceDefinition = {
  id: ServiceId;
  order: number;
  name: string;
  shortName: string;
  oneLiner: string;
  positioning: string;
  href: string;
  icon: "ledger" | "chart" | "receipt" | "controller";
  /** Four short action words used in the interactive services composition. */
  keyActions: [string, string, string, string];
  includes: string[];
  outputs: string[];
  goodFor: string[];
  notIncluded: string[];
  faqSlugs: string[];
};

export const services: Record<ServiceId, ServiceDefinition> = {
  bookkeeping: {
    id: "bookkeeping",
    order: 1,
    name: "Bookkeeping",
    shortName: "Bookkeeping",
    oneLiner: "Recording every transaction accurately, so the numbers underneath your business are never in question.",
    positioning:
      "Bookkeeping is the foundation. It is the disciplined, ongoing recording of what actually happened in your business — every sale, expense, and bank transaction — organized so it can be trusted later.",
    href: "/bookkeeping",
    icon: "ledger",
    keyActions: ["Recording", "Reconciling", "Categorizing", "Organizing"],
    includes: [
      "Recording business transactions as they occur",
      "Data entry from invoices, receipts, and source documents",
      "Recording and categorizing bank transactions",
      "Managing and organizing bank statements",
      "Recording day-to-day expenses",
      "Recording income and other financial transactions",
      "Organizing source financial information for later use",
      "Maintaining an accurate, up-to-date set of transaction records",
    ],
    outputs: [
      "An organized, transaction-level record of your business",
      "Reconciled bank and card feeds",
      "Categorized expense and income records",
      "A clean data set ready for accounting review",
    ],
    goodFor: [
      "Business owners who need accurate records but not yet analysis",
      "Anyone behind on data entry and reconciliation",
      "Businesses preparing their records before an accountant reviews them",
    ],
    notIncluded: [
      "Financial statement preparation and analysis (see Accounting)",
      "Tax filing and return preparation (see Taxation)",
    ],
    faqSlugs: ["bookkeeping-vs-accounting", "what-is-bookkeeping"],
  },
  accounting: {
    id: "accounting",
    order: 2,
    name: "Accounting",
    shortName: "Accounting",
    oneLiner: "Turning recorded transactions into reviewed, reconciled, and explained financial performance.",
    positioning:
      "Accounting goes beyond entering transactions. It reviews, checks, and interprets your financial data — so you understand what your numbers actually mean for the business.",
    href: "/accounting",
    icon: "chart",
    keyActions: ["Review", "Reconcile", "Analyze", "Report"],
    includes: [
      "Reviewing financial data recorded through bookkeeping",
      "Reconciling and checking records for accuracy and completeness",
      "Preparing financial reports and statements",
      "Performing financial analysis",
      "Understanding and explaining profit and loss",
      "Understanding and explaining financial position",
      "Explaining business performance in plain terms",
      "Supporting financial decision-making",
    ],
    outputs: [
      "Reviewed and reconciled financial records",
      "Profit and loss statements",
      "A view of financial position",
      "Plain-language performance explanations",
    ],
    goodFor: [
      "Business owners who need to understand performance, not just record it",
      "Businesses making decisions that depend on accurate financials",
      "Anyone who has bookkeeping in place but needs it reviewed and explained",
    ],
    notIncluded: [
      "Day-to-day transaction data entry (see Bookkeeping)",
      "Tax return preparation and filing (see Taxation)",
    ],
    faqSlugs: ["bookkeeping-vs-accounting", "what-is-accounting"],
  },
  taxation: {
    id: "taxation",
    order: 3,
    name: "Taxation",
    shortName: "Taxation",
    oneLiner: "Preparing personal and business tax returns based on your recorded and reviewed financial information.",
    positioning:
      "Taxation covers preparing your return and supporting documentation, based on your income and business activity — separate from, but informed by, your bookkeeping and accounting.",
    href: "/taxation",
    icon: "receipt",
    keyActions: ["Prepare", "Review", "File", "Support"],
    includes: [
      "Personal tax return preparation",
      "Business tax return preparation",
      "Tax preparation support and documentation",
      "Tax calculations based on recorded income",
      "Organizing tax-related documentation",
      "Tax support tailored to your business requirements",
    ],
    outputs: [
      "A prepared personal or business tax return",
      "Supporting tax documentation and calculations",
    ],
    goodFor: [
      "Individuals who need a personal return prepared",
      "Businesses that need a business return prepared",
      "Clients who want tax preparation informed by accurate books",
    ],
    notIncluded: [
      "Ongoing transaction recording (see Bookkeeping)",
      "Financial statement analysis (see Accounting)",
      "Legal representation or jurisdiction-specific filing guarantees — confirmed directly with our team",
    ],
    faqSlugs: ["what-is-taxation", "which-tax-service"],
  },
  controller: {
    id: "controller",
    order: 4,
    name: "Outsourced Controller Services",
    shortName: "Controller Services",
    oneLiner: "Senior-level oversight of your accounting function — without hiring a full-time controller.",
    positioning:
      "Outsourced Controller Services sit above day-to-day bookkeeping and periodic accounting. A controller supervises the accounting process itself — closes, reconciliations, reporting, and internal controls — so growing businesses get management-level financial oversight without the cost of an in-house hire.",
    href: "/controller-services",
    icon: "controller",
    keyActions: ["Oversight", "Reporting", "Controls", "Management"],
    includes: [
      "Monthly close & financial statement review",
      "Account reconciliation & balance-sheet management",
      "Accounting team supervision",
      "AR/AP oversight",
      "Payroll accounting oversight",
      "Internal controls & accounting procedures",
      "Audit & tax support",
      "Financial reporting & management reporting",
      "Accounting system/process optimization",
    ],
    outputs: [
      "A reviewed and closed monthly financial package",
      "Reconciled balance-sheet accounts",
      "Management reports built for decision-making",
      "Documented internal controls and accounting procedures",
    ],
    goodFor: [
      "Growing businesses that have outgrown basic bookkeeping and accounting",
      "Businesses with an internal bookkeeping or accounting team that needs senior supervision",
      "Companies preparing for an audit, financing, or ownership change",
    ],
    notIncluded: [
      "Day-to-day transaction data entry (see Bookkeeping)",
      "Tax return preparation and filing (see Taxation)",
      "Full-time, in-house CFO or controller employment",
    ],
    faqSlugs: ["what-is-controller-services"],
  },
};

export const serviceList: ServiceDefinition[] = Object.values(services).sort(
  (a, b) => a.order - b.order,
);
