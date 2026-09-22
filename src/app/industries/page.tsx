import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Industries | Juris Accounting",
  description:
    "Bookkeeping, accounting, and taxation services structured to support almost every industry.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Almost every industry needs the same financial discipline"
        description="The details of your records differ by industry — the need for accurate bookkeeping, clear accounting, and timely taxation doesn't."
      />
      <IndustryGrid />
      <FinalCta />
    </>
  );
}
