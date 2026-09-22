export type Industry = {
  name: string;
  note: string;
  confirmed: boolean;
};

// Marked as an illustrative, not-yet-confirmed list per the business
// assumptions: services are intended to support almost every industry,
// but no specific list has been approved yet.
export const industries: Industry[] = [
  { name: "Professional services", note: "Consultants, agencies, and firms", confirmed: false },
  { name: "Retail", note: "Physical and multi-location retail", confirmed: false },
  { name: "E-commerce", note: "Online-first and marketplace sellers", confirmed: false },
  { name: "Technology", note: "Software and technology-enabled businesses", confirmed: false },
  { name: "Healthcare", note: "Practices and healthcare-adjacent businesses", confirmed: false },
  { name: "Construction", note: "Contractors and project-based work", confirmed: false },
  { name: "Real estate", note: "Agencies, investors, and property management", confirmed: false },
  { name: "Hospitality", note: "Restaurants, cafes, and hospitality venues", confirmed: false },
  { name: "Startups", note: "Early-stage and growth-stage companies", confirmed: false },
  { name: "Small businesses", note: "Owner-operated and small teams", confirmed: false },
  { name: "Consultants & independent professionals", note: "Solo and independent practices", confirmed: false },
];

export const industriesNote =
  "This list is illustrative of the breadth we're structured to support. It has not yet been confirmed as a final published list — [Confirm industries to publish].";
