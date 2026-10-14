import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/sales-tax-compliance", {
  title: `${extraServices["sales-tax-compliance"].name} | Juris Accounting`,
  description: extraServices["sales-tax-compliance"].oneLiner,
});

export default function SalesTaxCompliancePage() {
  return <ExtraServicePage serviceId="sales-tax-compliance" />;
}
