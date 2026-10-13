// Team profiles for the About page.
// `focus` maps each seat to a service line the site already describes.

export type TeamMember = {
  name: string;
  title: string;
  focus: string;
  credentials: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "Rajesh Iyer",
    title: "Founder & Managing Principal",
    focus: "Engagement leadership",
    credentials: "15+ yrs experience",
    bio: "Leads client engagements end to end, from scoping to delivery. Rajesh has spent over a decade helping owner-run businesses and growing companies build finance functions they can rely on.",
  },
  {
    name: "Priya Nair",
    title: "Head of Bookkeeping",
    focus: "Bookkeeping",
    credentials: "QuickBooks specialist",
    bio: "Owns day-to-day transaction recording, bank and card reconciliations, and the monthly close, so every client's books are accurate and ready when they need them.",
  },
  {
    name: "Anil Deshmukh",
    title: "Senior Accounting Manager",
    focus: "Accounting",
    credentials: "12+ yrs experience",
    bio: "Reviews ledgers, prepares financial statements, and turns the numbers into clear management reporting and practical analysis for decision-makers.",
  },
  {
    name: "Kavita Sharma",
    title: "Tax Lead",
    focus: "Taxation",
    credentials: "Personal & business returns",
    bio: "Manages preparation and review of personal and business tax returns, keeping filings organised, accurate and on schedule throughout the year.",
  },
  {
    name: "Suresh Menon",
    title: "Outsourced Controller",
    focus: "Controller services",
    credentials: "Controls & close oversight",
    bio: "Provides senior oversight of the accounting function, from internal controls and month-end review to accounting policy and audit readiness.",
  },
  {
    name: "Ananya Reddy",
    title: "Client Success Manager",
    focus: "Client communication",
    credentials: "Dedicated point of contact",
    bio: "Your first call for onboarding, regular check-ins and day-to-day questions, making sure every engagement runs smoothly and nothing slips through.",
  },
];
