export type PricingPlan = {
  id: string;
  tag: string;
  name: string;
  hours: string;
  /** Billing cadence shown in the plan-selector caption. */
  billing: string;
  price: number;
  per: string;
  points: string[];
};

export type PricingService = {
  id: string;
  name: string;
  billing: string;
  /** Id of the recommended plan, selected by default. */
  hero: string;
  blurb: string;
  plans: PricingPlan[];
};

export const pricingPlans = {
  currency: "$",
  footnote: "Final rates may vary based on contract agreement.",
  ctaHref: "/contact",
  services: [
    {
      id: "bookkeeping",
      name: "Bookkeeping",
      billing: "Monthly",
      hero: "full",
      blurb: "Accurate, reconciled books — the foundation every other service builds on.",
      plans: [
        {
          id: "full",
          tag: "Full-Time",
          name: "Full-Time",
          hours: "40 hours / week",
          billing: "Monthly",
          price: 2500,
          per: "/ month",
          points: [
            "Dedicated bookkeeping resource",
            "Transaction recording and reconciliations",
            "Ongoing financial record maintenance",
          ],
        },
        {
          id: "part",
          tag: "Part-Time",
          name: "Part-Time",
          hours: "20 hours / week",
          billing: "Monthly",
          price: 1500,
          per: "/ month",
          points: [
            "Flexible bookkeeping support",
            "Transaction categorization and reconciliations",
            "Weekly progress updates",
          ],
        },
        {
          id: "hourly",
          tag: "Hourly Block",
          name: "Hourly Block",
          hours: "10-hour block",
          billing: "Hourly",
          price: 800,
          per: "per 10-hour block",
          points: [
            "Task-based bookkeeping support",
            "Assistance with specific projects",
            "Ideal for short-term requirements",
          ],
        },
      ],
    },
    {
      id: "accounting",
      name: "Accounting",
      billing: "Monthly",
      hero: "full",
      blurb: "Closes, statements and analysis that explain what your numbers mean.",
      plans: [
        {
          id: "full",
          tag: "Full-Time",
          name: "Full-Time",
          hours: "40 hours / week",
          billing: "Monthly",
          price: 3000,
          per: "/ month",
          points: [
            "Month-end and year-end close",
            "Financial statement preparation and review",
            "Financial analysis and reporting",
          ],
        },
        {
          id: "part",
          tag: "Part-Time",
          name: "Part-Time",
          hours: "20 hours / week",
          billing: "Monthly",
          price: 1800,
          per: "/ month",
          points: [
            "Monthly financial statement review",
            "General ledger and reconciliation review",
            "Month-end close support",
          ],
        },
        {
          id: "hourly",
          tag: "Hourly Block",
          name: "Hourly Block",
          hours: "10-hour block",
          billing: "Hourly",
          price: 1000,
          per: "per block",
          points: [
            "10-hour bookkeeping block",
            "Accounting review and adjustments",
            "Project-based financial reporting",
          ],
        },
      ],
    },
    {
      id: "taxation",
      name: "Taxation",
      billing: "Per return",
      hero: "business",
      blurb: "Flat-fee returns prepared from accurate, reviewed books.",
      plans: [
        {
          id: "individual",
          tag: "Individuals",
          name: "Individual Tax Returns",
          hours: "Per return",
          billing: "Per return",
          price: 500,
          per: "per return",
          points: [
            "Federal Form 1040 preparation",
            "Review of tax documents",
            "Applicable schedules as agreed",
          ],
        },
        {
          id: "business",
          tag: "Businesses",
          name: "Business Tax Returns",
          hours: "Per return",
          billing: "Per return",
          price: 800,
          per: "per return",
          points: [
            "Partnership returns (Form 1065)",
            "S Corporation returns (Form 1120-S)",
            "C Corporation returns (Form 1120)",
          ],
        },
        {
          id: "schedules",
          tag: "Add-on",
          name: "Additional Schedules",
          hours: "Each",
          billing: "Per schedule",
          price: 250,
          per: "each",
          points: [
            "Schedule C — Business income",
            "Schedule E — Rental income",
            "Schedule D — Capital gains and losses",
          ],
        },
      ],
    },
    {
      id: "controller",
      name: "Controller Services",
      billing: "Monthly / hourly",
      hero: "full",
      blurb: "Senior oversight of closes, reporting and controls — without an in-house hire.",
      plans: [
        {
          id: "full",
          tag: "Full-Time",
          name: "Full-Time Dedicated Controller",
          hours: "40 hours / week",
          billing: "Monthly",
          price: 5000,
          per: "/ month",
          points: [
            "Dedicated resource for financial reporting and close management",
            "Accounting oversight and reconciliations review",
            "Ongoing coordination with management",
          ],
        },
        {
          id: "part",
          tag: "Part-Time",
          name: "Part-Time Controller",
          hours: "20 hours / week",
          billing: "Monthly",
          price: 2900,
          per: "/ month",
          points: [
            "Financial statement review and management reporting",
            "Month-end close support",
            "Ongoing accounting oversight",
          ],
        },
        {
          id: "hourly",
          tag: "Hourly",
          name: "Hourly Controller Support",
          hours: "10-hour block",
          billing: "Hourly",
          price: 1600,
          per: "per block",
          points: [
            "Billed based on actual hours worked",
            "Suitable for ad hoc requirements",
            "Suitable for specific projects",
          ],
        },
      ],
    },
  ] satisfies PricingService[],
};
