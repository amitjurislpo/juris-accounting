// Figures for the homepage financial dashboard overview.
// Kept modular so the data source can be swapped without touching the UI.

export type MonthPoint = {
  month: string;
  revenue: number;
  expenses: number;
};

export const monthlyTrend: MonthPoint[] = [
  { month: "Jan", revenue: 42, expenses: 31 },
  { month: "Feb", revenue: 45, expenses: 33 },
  { month: "Mar", revenue: 41, expenses: 34 },
  { month: "Apr", revenue: 48, expenses: 32 },
  { month: "May", revenue: 52, expenses: 36 },
  { month: "Jun", revenue: 55, expenses: 35 },
  { month: "Jul", revenue: 51, expenses: 38 },
  { month: "Aug", revenue: 58, expenses: 37 },
  { month: "Sep", revenue: 61, expenses: 40 },
  { month: "Oct", revenue: 59, expenses: 39 },
  { month: "Nov", revenue: 64, expenses: 41 },
  { month: "Dec", revenue: 68, expenses: 43 },
];

export const dashboardStats = {
  revenue: { label: "Revenue", value: 68, unit: "k", delta: "+6.3%" },
  expenses: { label: "Expenses", value: 43, unit: "k", delta: "+4.9%" },
  profit: { label: "Net profit", value: 25, unit: "k", delta: "+8.1%" },
  cash: { label: "Cash position", value: 112, unit: "k", delta: "+2.4%" },
};

export type StatusLevel = "good" | "warning" | "serious" | "critical";

export const reconciliationStatus: { label: string; status: StatusLevel }[] = [
  { label: "Bank accounts", status: "good" },
  { label: "Credit cards", status: "good" },
  { label: "Uncategorized transactions", status: "warning" },
  { label: "Outstanding invoices", status: "good" },
];

export const taxReadiness = {
  score: 82,
  status: "good" as StatusLevel,
  label: "Tax readiness",
  note: "Reflects how prepared your records are for a filing period.",
};

export const financialHealth = {
  score: 78,
  status: "good" as StatusLevel,
  label: "Financial health",
};

export const dashboardDisclaimer =
  "Figures shown are illustrative and do not represent any specific client.";
