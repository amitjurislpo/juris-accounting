import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";

export const metadata: Metadata = {
  title: `${extraServices["accounts-payable-receivable"].name} | Juris Accounting`,
  description: extraServices["accounts-payable-receivable"].oneLiner,
};

export default function AccountsPayableReceivablePage() {
  return <ExtraServicePage serviceId="accounts-payable-receivable" />;
}
