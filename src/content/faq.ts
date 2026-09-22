export type FaqItem = {
  slug: string;
  question: string;
  answer: string;
  category: "General" | "Bookkeeping" | "Accounting" | "Taxation" | "Controller Services" | "Pricing";
};

export const faqItems: FaqItem[] = [
  {
    slug: "what-is-bookkeeping",
    category: "Bookkeeping",
    question: "What exactly is bookkeeping?",
    answer:
      "Bookkeeping is the ongoing recording of your business transactions — data entry, recording bank transactions, managing statements, and recording income and expenses. It creates the organized, accurate financial information everything else depends on.",
  },
  {
    slug: "what-is-accounting",
    category: "Accounting",
    question: "What is accounting, if bookkeeping already records everything?",
    answer:
      "Accounting takes recorded transactions further: reviewing and reconciling the data, preparing financial reports, analyzing performance, and explaining profit, loss, and financial position so you can make decisions with confidence.",
  },
  {
    slug: "bookkeeping-vs-accounting",
    category: "General",
    question: "What's the real difference between bookkeeping and accounting?",
    answer:
      "Bookkeeping is data entry and record-keeping — what happened. Accounting is review, reconciliation, reporting, and analysis — what it means. Most businesses need bookkeeping first, then accounting on top of clean books.",
  },
  {
    slug: "what-is-taxation",
    category: "Taxation",
    question: "What does the taxation service cover?",
    answer:
      "Taxation covers personal and business tax return preparation: calculations based on recorded income, organizing supporting documentation, and preparing the return itself. It's a separate service from bookkeeping and accounting, though it depends on accurate records from both.",
  },
  {
    slug: "which-tax-service",
    category: "Taxation",
    question: "Do I need a personal or a business tax return?",
    answer:
      "That depends on how your income and activity are structured. If you're unsure, our team can help you work out whether you need a personal return, a business return, or both, before any pricing conversation.",
  },
  {
    slug: "what-is-controller-services",
    category: "Controller Services",
    question: "What do Outsourced Controller Services actually cover?",
    answer:
      "Controller services sit above bookkeeping and periodic accounting: monthly close and financial statement review, account reconciliation and balance-sheet management, supervision of an accounting team, AR/AP and payroll accounting oversight, internal controls, audit and tax support, management reporting, and accounting process optimization — the senior-level oversight a growing business needs without hiring a full-time controller.",
  },
  {
    slug: "which-service-do-i-need",
    category: "General",
    question: "How do I know which service I actually need?",
    answer:
      "Use the \"Which service do I need?\" interactive flow on the homepage, review the side-by-side comparison, or contact us directly — most clients are self-qualifying after seeing bookkeeping, accounting, and taxation compared clearly.",
  },
  {
    slug: "pricing-how-it-works",
    category: "Pricing",
    question: "How does pricing actually work?",
    answer:
      "Pricing is based on Service, Module, and Entity — which service(s) you need, the scope or module of work, and how many entities (individuals or businesses) it covers. A single, simple, single-entity engagement can show an indicative starting price; anything broader moves to a short consultation.",
  },
  {
    slug: "why-consultation",
    category: "Pricing",
    question: "Why can't I just get a fixed price online?",
    answer:
      "Transaction volume, number of accounts, business complexity, and reporting requirements all affect the actual work involved. Rather than quote a number that doesn't match your situation, we confirm final pricing directly with you.",
  },
  {
    slug: "multiple-entities",
    category: "Pricing",
    question: "What if I have more than one business entity?",
    answer:
      "Additional entities are supported — each one adds its own scope of bookkeeping, accounting, or taxation work. Pricing for multiple entities is confirmed after a short review of how each entity operates.",
  },
  {
    slug: "getting-started",
    category: "General",
    question: "What happens after I contact Juris Accounting?",
    answer:
      "We start with a short consultation to understand your business, current records, and requirements. From there we confirm which services fit, outline scope, and provide pricing tailored to your situation before any engagement begins.",
  },
  {
    slug: "industries-covered",
    category: "General",
    question: "Do you work with my industry?",
    answer:
      "Bookkeeping, accounting, and taxation apply to almost every industry. See the Industries page for the categories we're structured to support — if yours isn't listed, contact us to confirm fit.",
  },
  {
    slug: "switching-providers",
    category: "General",
    question: "Can you take over from our current bookkeeper or accountant?",
    answer:
      "Yes — this is a common starting point. We review your current records during onboarding and confirm what needs to be brought current before ongoing service begins.",
  },
];
