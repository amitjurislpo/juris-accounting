export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Bookkeeping" | "Accounting" | "Taxation" | "Business finance";
  readTime: string;
  placeholder: true;
};

// Static placeholder cards for the future content/digital-marketing
// engine. No CMS is wired up yet — this is a future-ready structure only.
export const articles: Article[] = [
  {
    slug: "bookkeeping-checklist",
    title: "A monthly bookkeeping checklist for small businesses",
    excerpt: "The recurring steps that keep transaction records accurate and audit-ready. [Placeholder article]",
    category: "Bookkeeping",
    readTime: "6 min",
    placeholder: true,
  },
  {
    slug: "reading-your-profit-and-loss",
    title: "How to actually read a profit & loss statement",
    excerpt: "A plain-language walkthrough of what your P&L is telling you. [Placeholder article]",
    category: "Accounting",
    readTime: "8 min",
    placeholder: true,
  },
  {
    slug: "personal-vs-business-tax-returns",
    title: "Personal vs. business tax returns: what's the difference?",
    excerpt: "Understanding which return applies to your situation. [Placeholder article]",
    category: "Taxation",
    readTime: "5 min",
    placeholder: true,
  },
  {
    slug: "signs-you-need-an-accountant",
    title: "Five signs your bookkeeping needs an accountant on top of it",
    excerpt: "When recording transactions stops being enough. [Placeholder article]",
    category: "Business finance",
    readTime: "7 min",
    placeholder: true,
  },
];
