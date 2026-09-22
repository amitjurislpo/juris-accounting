import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Juris Accounting",
  description:
    "Get in touch with Juris Accounting to discuss bookkeeping, accounting, and taxation requirements and pricing.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your requirement"
        description="Tell us a little about your business and which services you're considering — we'll take it from there."
      />
      <Section>
        <Reveal className="mx-auto max-w-2xl">
          <ContactForm />
        </Reveal>
      </Section>
    </>
  );
}
