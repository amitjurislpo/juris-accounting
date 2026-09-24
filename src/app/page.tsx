import { Hero } from "@/components/home/Hero";
import { DashboardSection } from "@/components/home/DashboardSection";
import { ServiceOverview } from "@/components/home/ServiceOverview";
import { WhichServiceFlow } from "@/components/home/WhichServiceFlow";
import { PricingExplainer } from "@/components/home/PricingExplainer";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { CredibilitySection } from "@/components/home/CredibilitySection";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <DashboardSection />
      <ServiceOverview />
      <WhichServiceFlow />
      <PricingExplainer />
      <ProcessSection />
      <IndustryGrid />
      <CredibilitySection />
      <FinalCta />
    </>
  );
}
