import type { Metadata } from "next";
import { seoMetadata } from "@/content/seo";
import { SeoContent } from "@/components/seo/SeoContent";
import { Hero } from "@/components/home/Hero";
import { DashboardSection } from "@/components/home/DashboardSection";
import { ServiceOverview } from "@/components/home/ServiceOverview";
import { WhichServiceFlow } from "@/components/home/WhichServiceFlow";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { CredibilitySection } from "@/components/home/CredibilitySection";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = seoMetadata("/", {});

export default function Home() {
  return (
    <>
      <Hero />
      <DashboardSection />
      <ServiceOverview />
      <WhichServiceFlow />
      <ProcessSection />
      <IndustryGrid />
      <CredibilitySection />
      <SeoContent path="/" part="faq" />
      <FinalCta />
    </>
  );
}
