export type Industry = {
  name: string;
  note: string;
  confirmed: boolean;
};

// Our services support almost every industry; these are the ones we see most.
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
  "These are some of the industries we work with most often. If yours isn't listed, get in touch — our services adapt to almost any business.";
