import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/accounts-payable-receivable", {
  title: `${extraServices["accounts-payable-receivable"].name} | Juris Accounting`,
  description: extraServices["accounts-payable-receivable"].oneLiner,
});

export default function AccountsPayableReceivablePage() {
  return <ExtraServicePage serviceId="accounts-payable-receivable" />;
}
