import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Our process | Juris Accounting",
  description:
    "What happens after you contact Juris Accounting — from initial consultation to ongoing bookkeeping, accounting, and taxation service.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="What happens after you reach out"
        description="No surprises. Here's exactly how an engagement moves from first conversation to ongoing service."
      />
      <ProcessSection />
      <FinalCta />
    </>
  );
}
