export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Bookkeeping" | "Accounting" | "Taxation" | "Business finance";
  readTime: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "bookkeeping-checklist",
    title: "A monthly bookkeeping checklist for small businesses",
    excerpt: "The recurring steps that keep transaction records accurate and audit-ready.",
    category: "Bookkeeping",
    readTime: "6 min",
    body: [
      "Accurate books are built on small, repeatable habits. A monthly checklist keeps nothing from slipping through, so year-end becomes a review rather than a rescue.",
      "Start by categorising every transaction from the month and reconciling each bank and credit card account to its statement. Any difference between your books and the statement is a signal to investigate before moving on.",
      "Next, review open invoices and bills: follow up on what customers owe you, and confirm what you owe is scheduled. Check that payroll entries, loan payments and sales tax liabilities are recorded.",
      "Finish by reviewing your profit & loss and balance sheet for anything unusual, then save the reconciled reports. Doing this every month makes tax filing and lender or investor requests far easier.",
    ],
  },
  {
    slug: "reading-your-profit-and-loss",
    title: "How to actually read a profit & loss statement",
    excerpt: "A plain-language walkthrough of what your P&L is telling you.",
    category: "Accounting",
    readTime: "8 min",
    body: [
      "A profit & loss statement shows whether your business made money over a period. It reads from top to bottom: revenue, cost of goods sold, gross profit, operating expenses, and finally net profit.",
      "Gross profit tells you how much is left after the direct costs of delivering your product or service. If it is shrinking, look at pricing or input costs first.",
      "Operating expenses — rent, salaries, software, marketing — sit below that line. Compare each category with prior months to spot costs growing faster than revenue.",
      "Net profit is what remains. Track it as a percentage of revenue over time; the trend matters more than any single month.",
    ],
  },
  {
    slug: "personal-vs-business-tax-returns",
    title: "Personal vs. business tax returns: what's the difference?",
    excerpt: "Understanding which return applies to your situation.",
    category: "Taxation",
    readTime: "5 min",
    body: [
      "Personal and business tax returns report different things and are filed separately. A personal return covers an individual's income, deductions and credits; a business return reports the entity's income and expenses.",
      "Depending on how your business is structured, its profit may also flow through to your personal return, while other structures are taxed as separate entities with their own filing.",
      "Because the two interact, keeping personal and business finances separate — with their own accounts and records — makes both returns more accurate and easier to prepare.",
      "If you are unsure which returns apply to you, a short conversation with your tax preparer at the start of the year avoids surprises at filing time.",
    ],
  },
  {
    slug: "signs-you-need-an-accountant",
    title: "Five signs your bookkeeping needs an accountant on top of it",
    excerpt: "When recording transactions stops being enough.",
    category: "Business finance",
    readTime: "7 min",
    body: [
      "Bookkeeping records what happened. An accountant helps you understand it and decide what to do next. Several signs suggest it is time to add that layer.",
      "You cannot confidently explain your profit, or your reports arrive too late to act on. Tax season brings last-minute scrambles or unexpected bills.",
      "You are growing — adding entities, employees, or revenue streams — and your records no longer reflect how the business really runs. Lenders or investors are asking for reporting you cannot easily produce.",
      "If two or more of these sound familiar, bringing in accounting support early is usually cheaper than fixing problems later.",
    ],
  },
];
