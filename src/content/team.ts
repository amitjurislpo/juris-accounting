// Team profiles for the About page.
// Every name, title, and credential is a bracketed placeholder until the
// business confirms it — replace each [ ] value with approved details.
// `focus` maps each seat to a service line the site already describes.

export type TeamMember = {
  name: string;
  title: string;
  focus: string;
  credentials: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "[Team member name]",
    title: "[Founder / Principal — confirm title]",
    focus: "Engagement leadership",
    credentials: "[Add approved credentials]",
    bio: "[Add approved bio — background, experience, and the clients they lead.]",
  },
  {
    name: "[Team member name]",
    title: "[Bookkeeping lead — confirm title]",
    focus: "Bookkeeping",
    credentials: "[Add approved credentials]",
    bio: "[Add approved bio — transaction recording, reconciliations, and monthly close.]",
  },
  {
    name: "[Team member name]",
    title: "[Accounting lead — confirm title]",
    focus: "Accounting",
    credentials: "[Add approved credentials]",
    bio: "[Add approved bio — review, reporting, and financial analysis.]",
  },
  {
    name: "[Team member name]",
    title: "[Tax lead — confirm title]",
    focus: "Taxation",
    credentials: "[Add approved credentials]",
    bio: "[Add approved bio — personal and business return preparation.]",
  },
  {
    name: "[Team member name]",
    title: "[Controller — confirm title]",
    focus: "Controller services",
    credentials: "[Add approved credentials]",
    bio: "[Add approved bio — oversight of the accounting function and controls.]",
  },
  {
    name: "[Team member name]",
    title: "[Client success — confirm title]",
    focus: "Client communication",
    credentials: "[Add approved credentials]",
    bio: "[Add approved bio — onboarding, check-ins, and day-to-day support.]",
  },
];
