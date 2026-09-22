import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: `${services.accounting.name} services | Juris Accounting`,
  description: services.accounting.oneLiner,
};

export default function AccountingPage() {
  return <ServicePage serviceId="accounting" />;
}
