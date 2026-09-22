import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";

export const metadata: Metadata = {
  title: `${extraServices.payroll.name} | Juris Accounting`,
  description: extraServices.payroll.oneLiner,
};

export default function PayrollPage() {
  return <ExtraServicePage serviceId="payroll" />;
}
