import type { ServiceId } from "./services";

export type ComparisonRow = {
  dimension: string;
  bookkeeping: string;
  accounting: string;
  taxation: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    dimension: "What it actually does",
    bookkeeping: "Records what happened, transaction by transaction",
    accounting: "Reviews, reconciles, and explains what the records mean",
    taxation: "Prepares the return owed based on income and activity",
  },
  {
    dimension: "Typical frequency",
    bookkeeping: "Daily to weekly",
    accounting: "Monthly to quarterly",
    taxation: "Annually, or per filing period",
  },
  {
    dimension: "Main output",
    bookkeeping: "Organized, categorized transaction records",
    accounting: "Profit & loss, financial position, performance review",
    taxation: "A prepared and filed tax return",
  },
  {
    dimension: "Depends on",
    bookkeeping: "Your source documents (invoices, receipts, statements)",
    accounting: "Complete, accurate bookkeeping records",
    taxation: "Accurate income records — ideally from bookkeeping and accounting",
  },
  {
    dimension: "Answers the question",
    bookkeeping: "“What transactions happened, and are they recorded?”",
    accounting: "“How is the business actually performing?”",
    taxation: "“What do I owe, and is it filed correctly?”",
  },
  {
    dimension: "Best starting point if",
    bookkeeping: "Your records are incomplete, messy, or behind",
    accounting: "Books are current but you need reporting or analysis",
    taxation: "You need a return prepared for a specific filing period",
  },
];

export type QualifierAnswer = "yes" | "no" | "unsure";

export type QualifierQuestion = {
  id: string;
  prompt: string;
  helper?: string;
};

export const qualifierQuestions: QualifierQuestion[] = [
  {
    id: "recordsCurrent",
    prompt: "Are your day-to-day transactions currently recorded and up to date?",
    helper: "Bank feeds reconciled, expenses categorized, income logged.",
  },
  {
    id: "needsReporting",
    prompt: "Do you need to understand profit, loss, or overall financial position?",
    helper: "Not just what happened, but what it means for the business.",
  },
  {
    id: "needsFiling",
    prompt: "Do you need a personal or business tax return prepared?",
    helper: "A specific filing, for a specific period.",
  },
];

export type QualifierAnswers = Record<string, QualifierAnswer>;

export type Recommendation = {
  services: ServiceId[];
  headline: string;
  explanation: string;
};

export function recommendServices(answers: QualifierAnswers): Recommendation {
  const wantsBookkeeping = answers.recordsCurrent !== "yes";
  const wantsAccounting = answers.needsReporting !== "no";
  const wantsTaxation = answers.needsFiling !== "no";

  const chosen: ServiceId[] = [];
  if (wantsBookkeeping) chosen.push("bookkeeping");
  if (wantsAccounting) chosen.push("accounting");
  if (wantsTaxation) chosen.push("taxation");

  if (chosen.length === 0) {
    return {
      services: ["accounting"],
      headline: "Accounting is likely your starting point",
      explanation:
        "Your records sound current and you're not filing a return right now, so a periodic accounting review is the most natural next step to keep visibility on performance.",
    };
  }

  if (chosen.length === 3) {
    return {
      services: chosen,
      headline: "A combined engagement across all three services",
      explanation:
        "Based on your answers, you likely need transaction recording, reporting and analysis, and tax preparation together — this is exactly the kind of aggregated package our pricing model is built for.",
    };
  }

  const names = chosen.map((id) => id[0].toUpperCase() + id.slice(1));
  const joined =
    names.length === 1
      ? names[0]
      : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

  return {
    services: chosen,
    headline: `${joined} looks like the right starting point`,
    explanation:
      "This is a starting recommendation based on your answers, not a fixed quote. Final scope is confirmed once we understand your business in a short consultation.",
  };
}
