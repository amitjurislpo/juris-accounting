import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy | Juris Accounting",
  description: "Placeholder privacy policy for Juris Accounting.",
};

const sections = [
  {
    heading: "What we collect",
    body: "Contact details you provide directly, and any financial records you share as part of an engagement. [Confirm analytics and tracking tools once approved]",
  },
  {
    heading: "How we use it",
    body: "To respond to inquiries, deliver the services you engage us for, and communicate about your account. [Confirm data-use policy with legal counsel before publishing]",
  },
  {
    heading: "Sharing with third parties",
    body: "[Add approved policy on sharing data with service providers, e-filing systems, or software partners]",
  },
  {
    heading: "Retention",
    body: "[Confirm retention period for client financial records]",
  },
  {
    heading: "Your rights",
    body: "[Confirm applicable data protection rights and jurisdiction before publishing]",
  },
  {
    heading: "Contact",
    body: `Privacy questions can be sent to ${site.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="Placeholder content. This page must be reviewed and approved before the site goes live."
      />
      <Section>
        <Reveal className="flex max-w-2xl flex-col gap-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl text-charcoal">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
