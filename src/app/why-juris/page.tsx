import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CredibilitySection } from "@/components/home/CredibilitySection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FinalCta } from "@/components/home/FinalCta";
import { seoMetadata, seoPages } from "@/content/seo";
import { SeoContent } from "@/components/seo/SeoContent";

export const metadata: Metadata = seoMetadata("/why-juris", {
  title: "Why Juris Accounting",
  description:
    "Why work with Juris Accounting for bookkeeping, accounting, and taxation — transparent scope, honest pricing, and a process built around your business.",
});

export default function WhyJurisPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Juris Accounting"
        title={seoPages["/why-juris"]?.h1 ?? "Right-sized service, explained clearly"}
        description="We'd rather earn trust through a transparent process than through claims we can't yet back up."
      />
      <SeoContent path="/why-juris" part="intro" />
      <CredibilitySection />
      <ProcessSection />
      <SeoContent path="/why-juris" part="faq" />
      <FinalCta />
    </>
  );
}
