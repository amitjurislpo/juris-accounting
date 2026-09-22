// A few remaining service lines that don't yet have a dedicated page — kept
// intentionally lightweight (names and one-line descriptions only, no
// pricing) since scope and pricing for these have not been confirmed by the
// business. Payroll and Compliance moved out of this list once they got
// full pages (see content/extraServices.ts); Outsourced CFO Services isn't
// listed here since it overlaps with the existing Controller Services page.

export type AdditionalService = {
  name: string;
  note: string;
};

export const additionalServices: AdditionalService[] = [
  {
    name: "Accounts Payable & Receivable Management",
    note: "Keeping what you owe and what's owed to you current and under control.",
  },
  {
    name: "Sales Tax Compliance",
    note: "Registration, filing, and ongoing sales tax compliance support.",
  },
  {
    name: "Catch-Up Bookkeeping",
    note: "Bringing books that have fallen behind back up to date.",
  },
];

export const additionalServicesNote =
  "Scope and pricing for these services are confirmed directly with our team — [Confirm details before publishing].";
