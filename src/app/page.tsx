import { Hero } from "@/components/home/Hero";
import { DashboardSection } from "@/components/home/DashboardSection";
import { ServiceOverview } from "@/components/home/ServiceOverview";
import { ComparisonTeaser } from "@/components/home/ComparisonTeaser";
import { WhichServiceFlow } from "@/components/home/WhichServiceFlow";
import { PricingExplainer } from "@/components/home/PricingExplainer";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { CredibilitySection } from "@/components/home/CredibilitySection";
import { ResourcesPreview } from "@/components/home/ResourcesPreview";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <DashboardSection />
      <ServiceOverview />
      <ComparisonTeaser />
      <WhichServiceFlow />
      <PricingExplainer />
      <ProcessSection />
      <IndustryGrid />
      <CredibilitySection />
      <ResourcesPreview />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
