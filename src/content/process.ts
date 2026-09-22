export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Initial consultation",
    description:
      "A short conversation to understand your business, current records, and what you're trying to solve for.",
  },
  {
    step: 2,
    title: "Requirement & scope review",
    description:
      "We identify whether you need bookkeeping, accounting, taxation, or a combination, and at what scope.",
  },
  {
    step: 3,
    title: "Pricing confirmation",
    description:
      "Using the Service + Module + Entity model, we confirm indicative or final pricing for your specific situation.",
  },
  {
    step: 4,
    title: "Onboarding & records review",
    description:
      "We review your existing records, accounts, and documentation to understand the starting point.",
  },
  {
    step: 5,
    title: "Ongoing service delivery",
    description:
      "Recurring bookkeeping, periodic accounting review, and taxation support delivered on an agreed cadence.",
  },
  {
    step: 6,
    title: "Review & reporting",
    description:
      "Regular check-ins and reports so you always know where your books, performance, and tax position stand.",
  },
];
