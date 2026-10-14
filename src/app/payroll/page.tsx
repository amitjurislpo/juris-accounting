import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/payroll", {
  title: `${extraServices.payroll.name} | Juris Accounting`,
  description: extraServices.payroll.oneLiner,
});

export default function PayrollPage() {
  return <ExtraServicePage serviceId="payroll" />;
}
