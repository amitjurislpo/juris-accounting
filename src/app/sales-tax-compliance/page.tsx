import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";

export const metadata: Metadata = {
  title: `${extraServices["sales-tax-compliance"].name} | Juris Accounting`,
  description: extraServices["sales-tax-compliance"].oneLiner,
};

export default function SalesTaxCompliancePage() {
  return <ExtraServicePage serviceId="sales-tax-compliance" />;
}
