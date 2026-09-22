// Demo data only. This is a visual concept for the financial dashboard
// discussed for the homepage — not connected to any real client data.
// Keep it modular: the final dashboard design/data may be replaced entirely.

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
  revenue: { label: "Revenue (demo)", value: 68, unit: "k", delta: "+6.3%" },
  expenses: { label: "Expenses (demo)", value: 43, unit: "k", delta: "+4.9%" },
  profit: { label: "Net profit (demo)", value: 25, unit: "k", delta: "+8.1%" },
  cash: { label: "Cash position (demo)", value: 112, unit: "k", delta: "+2.4%" },
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
  label: "Tax readiness (demo)",
  note: "Demo indicator only — reflects how prepared records are for a filing period.",
};

export const financialHealth = {
  score: 78,
  status: "good" as StatusLevel,
  label: "Financial health (demo)",
};

export const dashboardDisclaimer =
  "This is a visual concept using demo data, not a live or real client dashboard. Final design and data source to be confirmed.";
