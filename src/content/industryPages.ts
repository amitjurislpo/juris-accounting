// Dedicated industry pages, linked from the header's Industries dropdown.
// Kept separate from content/industries.ts (the lightweight, illustrative
// list used in the homepage's industry scroller) since these are real,
// SEO-facing pages with their own content. Descriptions here are generic,
// factual statements about how accounting challenges typically show up in
// each industry — no client counts, testimonials, or other unconfirmed
// specifics about Juris CFO itself.

export type IndustryPageId =
  | "saas-startups"
  | "ecommerce-dtc"
  | "healthcare-practices"
  | "real-estate-property"
  | "construction-trades"
  | "agencies-consultancies-law-firms"
  | "restaurants"
  | "consulting-services";

export type IndustryPageDefinition = {
  id: IndustryPageId;
  name: string;
  shortName: string;
  oneLiner: string;
  positioning: string;
  href: string;
  challenges: string[];
  weHelp: string[];
  goodFor: string[];
};

export const industryPages: Record<IndustryPageId, IndustryPageDefinition> = {
  "saas-startups": {
    id: "saas-startups",
    name: "SaaS & Startups",
    shortName: "SaaS & Startups",
    oneLiner: "Bookkeeping and accounting built around deferred revenue, burn rate, and investor reporting.",
    positioning:
      "SaaS and early-stage companies run on metrics that standard bookkeeping doesn't naturally produce — burn rate, runway, and revenue recognized over a subscription term rather than at the point of sale.",
    href: "/industries/saas-startups",
    challenges: [
      "Recognizing subscription revenue over the service period rather than when cash is received",
      "Tracking burn rate and runway alongside standard financial statements",
      "Reporting formatted for investors and board members, not just tax filing",
      "Managing bookkeeping questions that come with funding rounds",
      "Keeping R&D and payroll costs tracked separately for tax credit eligibility",
    ],
    weHelp: [
      "Bookkeeping built around deferred and recognized revenue, not just cash in and out",
      "Monthly reporting that includes the metrics investors actually ask for",
      "Accounting that keeps pace with a fast-changing, often pre-revenue business",
      "Tax preparation aware of the elections relevant to early-stage companies",
    ],
    goodFor: [
      "Software and SaaS companies with subscription revenue",
      "Venture-backed or bootstrapped startups preparing for their next round",
      "Companies that need investor-ready reporting, not just a filed return",
    ],
  },
  "ecommerce-dtc": {
    id: "ecommerce-dtc",
    name: "E-commerce & DTC",
    shortName: "E-commerce & DTC",
    oneLiner: "Bookkeeping that reconciles marketplace payouts, platform fees, and inventory — not just bank deposits.",
    positioning:
      "E-commerce businesses collect revenue through platforms that net out fees, refunds, and holds before anything reaches the bank — so what hit the bank and what you actually sold are two different numbers that need to be reconciled separately.",
    href: "/industries/ecommerce-dtc",
    challenges: [
      "Reconciling marketplace and payment processor payouts against actual sales",
      "Tracking platform fees, chargebacks, and refunds separately from revenue",
      "Inventory and cost of goods sold across one or more sales channels",
      "Multi-state sales tax obligations tied to where customers are located",
    ],
    weHelp: [
      "Bookkeeping that reconciles marketplace and storefront platforms down to the transaction",
      "Inventory-aware accounting so cost of goods sold reflects reality",
      "Sales tax registration and filing support across the states you sell into",
      "Reporting that separates revenue, fees, and refunds instead of netting them together",
    ],
    goodFor: [
      "Direct-to-consumer brands selling through their own site or marketplaces",
      "Businesses selling across multiple platforms or states",
      "Companies that need inventory and COGS tracked accurately, not estimated",
    ],
  },
  "healthcare-practices": {
    id: "healthcare-practices",
    name: "Healthcare Practices",
    shortName: "Healthcare Practices",
    oneLiner: "Accounting for practices balancing insurance reimbursement timing with day-to-day operating costs.",
    positioning:
      "Healthcare practices deal with a gap between when a service is provided and when insurance actually pays for it, plus a mix of patient payments, provider compensation, and equipment costs that general bookkeeping doesn't always account for well.",
    href: "/industries/healthcare-practices",
    challenges: [
      "Revenue that arrives weeks or months after the service, net of insurance adjustments",
      "Separating patient collections, insurance reimbursement, and write-offs",
      "Provider compensation models — salary, production-based, or a mix",
      "Equipment financing and depreciation specific to a clinical practice",
    ],
    weHelp: [
      "Bookkeeping that tracks reimbursement timing separately from billed charges",
      "Accounting built around how the practice actually gets paid, not a generic template",
      "Tax preparation aware of practice-specific deductions and entity structures",
      "Reporting that gives owners a clear read on practice profitability",
    ],
    goodFor: [
      "Medical, dental, and other healthcare practices",
      "Practices billing insurance alongside direct patient payment",
      "Multi-provider practices needing compensation tracked accurately",
    ],
  },
  "real-estate-property": {
    id: "real-estate-property",
    name: "Real Estate & Property",
    shortName: "Real Estate & Property",
    oneLiner: "Accounting for property-level performance, not just one combined set of books.",
    positioning:
      "Real estate businesses — whether an agency, an investor, or a property manager — usually need financials broken out per property or per deal, since one blended number hides which properties are actually performing.",
    href: "/industries/real-estate-property",
    challenges: [
      "Tracking income and expenses per property or per unit, not just in aggregate",
      "Security deposits, escrow, and trust accounting handled separately from operating funds",
      "Depreciation schedules across multiple properties with different acquisition dates",
      "Distinguishing capital improvements from routine repairs and maintenance",
    ],
    weHelp: [
      "Bookkeeping structured by property or entity so performance is visible individually",
      "Accounting that keeps trust and escrow funds properly separated from operating accounts",
      "Depreciation and capital-versus-expense tracking handled consistently",
      "Tax preparation for real estate-specific structures and elections",
    ],
    goodFor: [
      "Real estate agencies and brokerages",
      "Property investors with one or more rental properties",
      "Property management companies handling owner and tenant funds",
    ],
  },
  "construction-trades": {
    id: "construction-trades",
    name: "Construction & Trades",
    shortName: "Construction & Trades",
    oneLiner: "Job-costed bookkeeping so you know which projects are actually profitable.",
    positioning:
      "Construction and trades businesses run on projects, not months — a single profit-and-loss statement can hide a profitable job and a losing one sitting right next to each other.",
    href: "/industries/construction-trades",
    challenges: [
      "Tracking costs and revenue by job or project, not just by month",
      "Percentage-of-completion revenue recognition on longer projects",
      "Retainage held back by clients until project completion",
      "Subcontractor payments and related recordkeeping",
    ],
    weHelp: [
      "Job-costed bookkeeping that shows profitability per project, not just overall",
      "Accounting familiar with percentage-of-completion and retainage",
      "Subcontractor payment tracking and 1099 preparation handled together",
      "Reporting that separates job costs from general overhead",
    ],
    goodFor: [
      "General contractors and subcontractors",
      "Trades businesses running multiple simultaneous projects",
      "Construction companies that need job-level profitability, not just a company-wide number",
    ],
  },
  "agencies-consultancies-law-firms": {
    id: "agencies-consultancies-law-firms",
    name: "Agencies, Consultancies & Law Firms",
    shortName: "Agencies & Law Firms",
    oneLiner: "Accounting built around billable time, client retainers, and trust or IOLTA accounts.",
    positioning:
      "Professional service firms sell time and expertise rather than a physical product, which puts the accounting focus on utilization, retainers, and — for law firms — client funds that must be kept completely separate from the firm's own money.",
    href: "/industries/agencies-consultancies-law-firms",
    challenges: [
      "Tracking revenue against retainers and unbilled work in progress",
      "Trust or IOLTA account recordkeeping kept fully separate from operating funds",
      "Partner or owner compensation and profit-sharing calculations",
      "Utilization and realization reporting tied to billable time",
    ],
    weHelp: [
      "Bookkeeping that reconciles retainers, trust accounts, and operating funds separately",
      "Accounting that reports on utilization and realization alongside standard financials",
      "Support for partner compensation and profit-distribution calculations",
      "Tax preparation for partnership and professional-services entity structures",
    ],
    goodFor: [
      "Consulting and advisory firms",
      "Marketing, creative, and other professional service agencies",
      "Law firms needing trust accounting kept separate from operating accounts",
    ],
  },
  restaurants: {
    id: "restaurants",
    name: "Restaurants",
    shortName: "Restaurants",
    oneLiner: "Bookkeeping that tracks food cost, tips, and daily sales — not just bank deposits.",
    positioning:
      "Restaurants run on thin margins and high daily volume — sales split across card, cash, and delivery apps, with food cost, labor, and tips all moving at once. Without them tracked separately, it's hard to tell what's actually profitable.",
    href: "/industries/restaurants",
    challenges: [
      "Reconciling daily POS sales against card, cash, and delivery-platform payouts",
      "Tracking food and beverage cost against sales to monitor margins",
      "Tip reporting, tip pooling, and payroll for hourly and part-time staff",
      "Sales tax collected on meals and delivery orders",
      "Delivery-app commissions and fees netted out of payouts",
    ],
    weHelp: [
      "Bookkeeping that reconciles POS reports and delivery platforms to the bank",
      "Reporting that shows food cost, labor cost, and prime cost against sales",
      "Payroll and tip handling set up correctly from the start",
      "Sales tax tracking and filing support",
    ],
    goodFor: [
      "Independent restaurants, cafes, and bars",
      "Multi-location restaurant groups",
      "Food businesses selling through dine-in, takeout, and delivery apps",
    ],
  },
  "consulting-services": {
    id: "consulting-services",
    name: "Consulting Services",
    shortName: "Consulting Services",
    oneLiner: "Accounting for consultants billing by project, retainer, or hour — with cash flow that stays predictable.",
    positioning:
      "Consulting businesses sell expertise, so revenue depends on project timing, retainers, and how quickly clients pay. Clear books show which engagements are worth the time and keep cash flow and taxes under control.",
    href: "/industries/consulting-services",
    challenges: [
      "Invoicing and tracking revenue across projects, retainers, and hourly work",
      "Slow-paying clients and unpredictable cash flow",
      "Reimbursable expenses and client billing for travel and costs",
      "Contractor payments and 1099 recordkeeping",
      "Setting aside enough for estimated taxes as income fluctuates",
    ],
    weHelp: [
      "Bookkeeping that tracks revenue and profitability by client or engagement",
      "Accounts receivable follow-up and cash flow visibility",
      "Contractor payment tracking and 1099 preparation",
      "Tax preparation and planning for solo consultants and consulting firms",
    ],
    goodFor: [
      "Independent consultants and solo practitioners",
      "Boutique consulting and advisory firms",
      "Consultants working with contractors or subcontractors",
    ],
  },
};

export const industryPageList: IndustryPageDefinition[] = Object.values(industryPages);
