// Team profiles for the About page.
// `focus` maps each team to a service line the site already describes.

export type TeamMember = {
  name: string;
  focus: string;
  credentials: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "Client Engagement & Leadership Team",
    focus: "Engagement leadership",
    credentials: "Client Service & Operations Management",
    bio: "Our engagement leadership team oversees client relationships, service delivery, and operational coordination. We ensure every engagement is managed with clear communication, consistent processes, and a commitment to delivering reliable accounting and tax support.",
  },
  {
    name: "Bookkeeping & Accounting Specialists",
    focus: "Bookkeeping",
    credentials: "Intuit ProAdvisor | Power Query | Bookkeeping & Financial Operations",
    bio: "Our bookkeeping specialists manage day-to-day accounting activities, including transaction categorization, bank and credit card reconciliations, accounts payable and receivable support, and monthly financial close processes to maintain accurate and organized financial records.",
  },
  {
    name: "Accounting & Financial Reporting Team",
    focus: "Accounting",
    credentials: "Accounting & Financial Reporting",
    bio: "Our accounting professionals support businesses with financial reporting, reconciliations, month-end reviews, and preparation of meaningful financial statements. We help clients maintain accurate books and gain better visibility into their financial performance.",
  },
  {
    name: "US Tax Preparation & Compliance Team",
    focus: "Taxation",
    credentials: "US Tax Compliance & Preparation",
    bio: "Our tax team supports the preparation and review of individual and business tax returns, including federal and state compliance requirements. We work closely with tax professionals to deliver accurate filings and timely tax support for our clients.",
  },
  {
    name: "Controller & Advisory Services Team",
    focus: "Controller services",
    credentials: "Financial Controls & Advisory",
    bio: "Our controller services team provides accounting oversight, financial review, reporting support, and process improvements. We help businesses strengthen their financial operations and make informed decisions through reliable financial information.",
  },
  {
    name: "Client Success Team",
    focus: "Client communication",
    credentials: "Client Relationship Management",
    bio: "Our client success team manages onboarding, communication, document coordination, and ongoing engagement support. We focus on creating a seamless experience and ensuring clients receive timely assistance throughout their relationship with Juris LPO.",
  },
];
