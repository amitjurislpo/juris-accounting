import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy | Juris Accounting",
  description: "How Juris Accounting collects, uses, and protects your information.",
};

const sections = [
  {
    heading: "What we collect",
    body: "Contact details you provide directly, and any financial records you share as part of an engagement. We may also collect basic, anonymous site usage information to understand how the website is used.",
  },
  {
    heading: "How we use it",
    body: "To respond to inquiries, deliver the services you engage us for, and communicate about your account. We do not sell your information.",
  },
  {
    heading: "Sharing with third parties",
    body: "We share information only where needed to deliver your engagement — for example with e-filing systems or accounting software you authorize — and with service providers bound by confidentiality obligations.",
  },
  {
    heading: "Retention",
    body: "We keep client financial records for as long as needed to deliver our services and to meet applicable record-keeping and tax obligations, and securely dispose of them afterward.",
  },
  {
    heading: "Your rights",
    body: "Depending on where you are located, you may have rights to access, correct, or request deletion of your personal information. Contact us and we will respond promptly.",
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
        description="How we collect, use, and protect your information."
      />
      <Section>
        <Reveal className="flex max-w-2xl flex-col gap-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl text-fg">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
