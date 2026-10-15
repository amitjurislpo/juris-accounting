// Blog content: categories and articles. Typed data, separate from
// presentation, so a CMS can replace this file later. Articles are general
// educational drafts — review them before publishing; none make claims about
// Juris CFO's clients, results, or credentials.

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

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  readTime: string;
  /** Meta keywords for the article page. */
  keywords: string[];
  trending?: boolean;
  intro: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "bookkeeping-vs-accounting",
    title: "Bookkeeping vs accounting: what's the difference?",
    excerpt:
      "Bookkeeping records what happened. Accounting explains what it means. Here is where one ends and the other begins.",
    category: "accounting",
    date: "2026-10-12",
    readTime: "5 min",
    keywords: ["bookkeeping vs accounting", "difference between bookkeeping and accounting", "accounting services"],
    trending: true,
    intro:
      "The two words get used as if they mean the same thing. They do not. Knowing the difference helps you decide what help your business needs and what to ask for.",
    sections: [
      {
        heading: "Bookkeeping is the record",
        paragraphs: [
          "Bookkeeping is the day-to-day recording of transactions: sales, expenses, bank and card activity, invoices and bills. The goal is a complete, organized, accurate record of what actually happened.",
          "Good bookkeeping is mostly routine. Transactions are entered, categorized, and reconciled against bank and card statements on a regular schedule.",
        ],
        bullets: [
          "Recording income and expenses",
          "Categorizing bank and card transactions",
          "Reconciling accounts to statements",
          "Organizing invoices, receipts and source documents",
        ],
      },
      {
        heading: "Accounting is the interpretation",
        paragraphs: [
          "Accounting starts where bookkeeping ends. It reviews the recorded data, checks it for accuracy and completeness, and turns it into financial statements and analysis.",
          "An accountant asks questions the ledger cannot answer by itself: why did margin change, is this expense categorized correctly, what does the balance sheet say about cash and obligations.",
        ],
        bullets: [
          "Reviewing and adjusting the books",
          "Preparing the profit and loss, balance sheet and cash flow statements",
          "Analyzing performance and explaining variances",
          "Preparing information for tax filing",
        ],
      },
      {
        heading: "Which one do you need?",
        paragraphs: [
          "If your transactions are behind or unreconciled, start with bookkeeping, because nothing downstream is reliable without it. If your records are current and you want to understand performance, accounting is the next layer.",
          "Many businesses need both on an ongoing basis. The useful question is not which label applies, but which outcome you need: clean records, clear reporting, or a filed return.",
        ],
      },
    ],
  },
  {
    slug: "in-house-vs-outsourced-bookkeeping",
    title: "In-house or outsourced bookkeeping: how to choose",
    excerpt:
      "Hiring someone internal and outsourcing both work. The right answer depends on volume, complexity, and how much oversight you want to own.",
    category: "bookkeeping",
    date: "2026-10-10",
    readTime: "6 min",
    keywords: ["outsourced bookkeeping services", "in-house vs outsourced bookkeeping", "bookkeeping for small business"],
    trending: true,
    intro:
      "Every growing business reaches the point where the owner should stop doing the books. The next question is who should.",
    sections: [
      {
        heading: "What an in-house hire gives you",
        paragraphs: [
          "A staff bookkeeper is on site, knows your people, and can respond immediately. For businesses with high daily transaction volume, that proximity can matter.",
          "The trade-off is that you carry the full cost of salary, software, training, and coverage for leave. You also depend on one person, and review of their work has to come from somewhere.",
        ],
      },
      {
        heading: "What outsourcing gives you",
        paragraphs: [
          "An outsourced team brings a defined process, backup coverage, and the ability to scale up or down with your activity. You pay for the scope you need rather than for a full-time seat.",
          "The trade-off is that you rely on clear communication and secure document sharing, and the provider must learn how your business works.",
        ],
      },
      {
        heading: "Questions to settle before you decide",
        paragraphs: ["Answer these honestly and the choice is usually clear."],
        bullets: [
          "How many transactions and accounts do we handle each month?",
          "Do we need someone on site, or only accurate books on a schedule?",
          "Who will review the work and sign off on the numbers?",
          "What happens when the one person responsible is unavailable?",
          "Do we also need reporting, payroll, or tax support from the same team?",
        ],
      },
    ],
  },
  {
    slug: "bank-reconciliation-monthly",
    title: "Bank reconciliation: why it matters and how to do it every month",
    excerpt:
      "Reconciling your accounts is the single habit that keeps books trustworthy. A simple monthly routine is enough.",
    category: "bookkeeping",
    date: "2026-10-08",
    readTime: "5 min",
    keywords: ["bank reconciliation", "monthly bookkeeping services", "reconcile bank statements"],
    intro:
      "A reconciliation compares what your books say with what your bank or card statement says. When they match, you can trust the records. When they do not, you have found something worth fixing early.",
    sections: [
      {
        heading: "What reconciliation catches",
        paragraphs: [
          "Reconciling finds duplicate entries, missed transactions, transposed amounts, and charges you do not recognize. It also confirms that opening and closing balances agree with the bank.",
        ],
      },
      {
        heading: "A simple monthly routine",
        paragraphs: ["Set aside a regular time shortly after each statement closes."],
        bullets: [
          "Download or open the statement for the period",
          "Match each statement line to a transaction in your books",
          "Investigate anything unmatched: add it, correct it, or query it",
          "Confirm the ending balance in your books equals the statement",
          "Save the reconciliation report with your records",
        ],
      },
      {
        heading: "When it does not balance",
        paragraphs: [
          "Start with the difference. If it equals a single transaction, look for that amount. If it is half of a number, look for a sign error. If it grows month to month, an earlier period was likely left unreconciled.",
        ],
      },
    ],
  },
  {
    slug: "catch-up-bookkeeping-plan",
    title: "Behind on bookkeeping? A practical catch-up plan",
    excerpt:
      "Months of unrecorded transactions feel overwhelming. Working in a fixed order makes the backlog manageable.",
    category: "bookkeeping",
    date: "2026-10-05",
    readTime: "6 min",
    keywords: ["catch up bookkeeping", "bookkeeping cleanup", "behind on bookkeeping"],
    intro:
      "Falling behind is common, especially in a busy season. The way out is a sequence, not a sprint.",
    sections: [
      {
        heading: "Step 1: Gather everything",
        paragraphs: [
          "Collect bank and card statements for every period that is not yet reconciled, along with invoices, bills, payroll reports and loan statements. Missing statements can usually be downloaded from the institution.",
        ],
      },
      {
        heading: "Step 2: Work oldest to newest",
        paragraphs: [
          "Start with the earliest unreconciled month and finish it fully before moving on. Each reconciled month gives the next one a reliable opening balance.",
        ],
      },
      {
        heading: "Step 3: Review, then keep it current",
        paragraphs: [
          "Once you are caught up, review the profit and loss and balance sheet for anything unusual, then move to a monthly routine so the backlog does not return.",
        ],
        bullets: ["Reconcile each account monthly", "Record invoices and bills as they arrive", "Review reports once a month"],
      },
    ],
  },
  {
    slug: "tax-ready-books-checklist",
    title: "Tax-ready books: what to have in order before filing",
    excerpt:
      "Filing goes faster and costs less when records are organized before your preparer asks for them.",
    category: "taxation",
    date: "2026-10-07",
    readTime: "5 min",
    keywords: ["business tax preparation", "tax-ready books", "small business tax preparation"],
    intro:
      "Tax preparation is only as good as the records behind it. A short checklist makes the difference between a calm filing and a scramble.",
    sections: [
      {
        heading: "Records to have in order",
        paragraphs: ["Your preparer will usually need the following for the tax year."],
        bullets: [
          "Reconciled bank and credit card accounts for every month",
          "Profit and loss and balance sheet for the year",
          "Payroll summaries and year-end wage forms",
          "Records of contractor payments",
          "Loan, asset purchase and sale documents",
          "Prior-year returns",
        ],
      },
      {
        heading: "Common problems to fix early",
        paragraphs: [
          "Personal and business spending mixed in one account, uncategorized transactions, and missing receipts for large expenses are the most common causes of delay. Cleaning these up before filing is far easier than explaining them afterward.",
        ],
      },
      {
        heading: "Plan during the year, not after",
        paragraphs: [
          "Tax planning works best before the year ends, while decisions can still change the outcome. Tax rules vary by entity type and state, so confirm specifics with a qualified tax professional.",
        ],
      },
    ],
  },
  {
    slug: "payroll-tax-basics",
    title: "Payroll tax basics for small business owners",
    excerpt:
      "Withholding, deposits, and filings each have their own timing. Knowing the moving parts helps you avoid penalties.",
    category: "payroll",
    date: "2026-10-03",
    readTime: "6 min",
    keywords: ["payroll services for small business", "payroll tax filing", "W-2 and 1099 preparation"],
    intro:
      "Running payroll is more than paying people. Each pay run creates tax obligations that must be calculated, deposited, and reported on time.",
    sections: [
      {
        heading: "The moving parts",
        paragraphs: [
          "Payroll involves taxes withheld from employees, taxes the employer owes in addition, deposits to the tax authorities, and periodic and annual reports.",
        ],
        bullets: [
          "Withholding from each paycheck",
          "Employer-side payroll taxes",
          "Scheduled deposits to federal and state agencies",
          "Quarterly and annual filings",
          "Year-end wage statements for employees and payment forms for contractors",
        ],
      },
      {
        heading: "Employee or contractor?",
        paragraphs: [
          "How a worker is classified changes which taxes apply and which forms you issue. Classification depends on the facts of the relationship, not the label you choose, so review it carefully and seek advice when unsure.",
        ],
      },
      {
        heading: "Why timing matters",
        paragraphs: [
          "Deposit and filing deadlines are strict and penalties can build quickly. Many owners outsource payroll so that calculation, deposits and filings run on a schedule someone else tracks.",
        ],
      },
    ],
  },
  {
    slug: "controller-vs-cfo",
    title: "Controller or CFO: which does your business need?",
    excerpt:
      "One keeps the books right. The other points the business forward. Many growing companies need a bit of both.",
    category: "cfo-controller",
    date: "2026-10-11",
    readTime: "5 min",
    keywords: ["outsourced controller services", "outsourced CFO services", "virtual CFO vs controller"],
    trending: true,
    intro:
      "Both roles sit above bookkeeping and accounting, but they answer different questions.",
    sections: [
      {
        heading: "What a controller does",
        paragraphs: [
          "A controller oversees the accounting function: the month-end close, the accuracy of financial statements, internal controls, and the quality of the work beneath them.",
        ],
        bullets: ["Month-end close", "Review of reconciliations and statements", "Accounting policies and controls", "Audit and tax support"],
      },
      {
        heading: "What a CFO does",
        paragraphs: [
          "A CFO looks ahead: budgeting, forecasting, cash planning, and the financial side of strategic decisions such as hiring, pricing, or raising capital.",
        ],
        bullets: ["Budgets and forecasts", "Cash flow planning", "Scenario and pricing analysis", "Reporting for lenders and investors"],
      },
      {
        heading: "Choosing between them",
        paragraphs: [
          "If you doubt your numbers, start with a controller. If you trust them but need direction, add CFO-level planning. Outsourcing either role lets you use senior judgment for as many hours as you need.",
        ],
      },
    ],
  },
  {
    slug: "annual-report-deadlines",
    title: "Annual report filings: how not to miss a deadline",
    excerpt:
      "Most states require a periodic report to keep your business in good standing. A calendar and a owner are enough.",
    category: "compliance",
    date: "2026-10-02",
    readTime: "4 min",
    keywords: ["annual report filing service", "business compliance", "small business compliance"],
    intro:
      "Missing a state filing can lead to fees, loss of good standing, or administrative dissolution. The fix is usually just process.",
    sections: [
      {
        heading: "Know what applies to you",
        paragraphs: [
          "Requirements depend on the state and entity type. Check the filing frequency, due date, and fee for each state where your business is registered.",
        ],
      },
      {
        heading: "Build a compliance calendar",
        paragraphs: ["Put every recurring date in one place and assign an owner."],
        bullets: [
          "Annual or biennial state reports",
          "Registered agent renewals",
          "Business license renewals",
          "Sales tax and payroll filing dates",
        ],
      },
      {
        heading: "If you have already missed one",
        paragraphs: [
          "Contact the state agency or a qualified professional promptly. Reinstatement is often possible, and the cost and difficulty usually increase the longer it waits.",
        ],
      },
    ],
  },
  {
    slug: "quickbooks-online-cleanup-signs",
    title: "QuickBooks Online cleanup: signs your file needs one",
    excerpt:
      "Duplicate transactions, stuck bank feeds and a messy chart of accounts quietly erode report quality.",
    category: "software",
    date: "2026-10-09",
    readTime: "5 min",
    keywords: ["QuickBooks Online cleanup", "QuickBooks bank feeds", "QuickBooks setup help"],
    intro:
      "Accounting software only helps if the data inside it is clean. A few symptoms point to a file that needs attention.",
    sections: [
      {
        heading: "Common warning signs",
        paragraphs: ["If several of these sound familiar, a cleanup is likely worth it."],
        bullets: [
          "Bank feed balances do not match the statement",
          "Duplicate or uncategorized transactions",
          "A long chart of accounts with overlapping names",
          "Old, unreconciled periods",
          "Reports that change when you reopen them",
        ],
      },
      {
        heading: "What a cleanup involves",
        paragraphs: [
          "A cleanup reviews the chart of accounts, merges duplicates, fixes categorization, reconnects bank feeds, and reconciles open periods so reports can be trusted again.",
        ],
      },
      {
        heading: "Keeping it clean",
        paragraphs: [
          "Set simple rules for new accounts and categories, review the feed regularly, and reconcile every month. Prevention takes far less time than repair.",
        ],
      },
    ],
  },
  {
    slug: "ecommerce-bookkeeping-payouts",
    title: "E-commerce bookkeeping: reconciling marketplace payouts",
    excerpt:
      "Platform payouts bundle sales, fees, refunds and taxes into one deposit. Matching them takes a deliberate approach.",
    category: "industry-guides",
    date: "2026-10-04",
    readTime: "6 min",
    keywords: ["ecommerce bookkeeping services", "reconcile Shopify payouts", "ecommerce accounting services"],
    intro:
      "A single bank deposit from a marketplace rarely equals the sales it represents. That gap is where e-commerce books go wrong.",
    sections: [
      {
        heading: "Why payouts do not match sales",
        paragraphs: [
          "A payout is net of platform fees, refunds, chargebacks, and sometimes held reserves. Recording the deposit alone understates both revenue and expenses.",
        ],
      },
      {
        heading: "A reliable approach",
        paragraphs: ["Record the gross activity, then the adjustments, so the deposit reconciles."],
        bullets: [
          "Record gross sales for the period",
          "Record platform and payment fees as expenses",
          "Record refunds and chargebacks separately",
          "Track sales tax collected as a liability",
          "Match the net amount to the bank deposit",
        ],
      },
      {
        heading: "Do not forget inventory",
        paragraphs: [
          "Cost of goods sold depends on accurate inventory records. Decide on a costing method early and apply it consistently so margins by product are meaningful.",
        ],
      },
    ],
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

export function sectionId(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
