import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/compliance", {
  title: `${extraServices.compliance.name} | Juris CFO`,
  description: extraServices.compliance.oneLiner,
});

export default function CompliancePage() {
  return <ExtraServicePage serviceId="compliance" />;
}
