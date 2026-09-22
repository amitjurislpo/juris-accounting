import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CredibilitySection } from "@/components/home/CredibilitySection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Why Juris Accounting",
  description:
    "Why work with Juris Accounting for bookkeeping, accounting, and taxation — transparent scope, honest pricing, and a process built around your business.",
};

export default function WhyJurisPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Juris Accounting"
        title="Right-sized service, explained clearly"
        description="We'd rather earn trust through a transparent process than through claims we can't yet back up."
      />
      <CredibilitySection />
      <ProcessSection />
      <FinalCta />
    </>
  );
}
