import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";

export const metadata: Metadata = {
  title: `${extraServices.compliance.name} | Juris Accounting`,
  description: extraServices.compliance.oneLiner,
};

export default function CompliancePage() {
  return <ExtraServicePage serviceId="compliance" />;
}
