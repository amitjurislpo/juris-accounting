import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { services } from "@/content/services";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/accounting", {
  title: `${services.accounting.name} services | Juris CFO`,
  description: services.accounting.oneLiner,
});

export default function AccountingPage() {
  return <ServicePage serviceId="accounting" />;
}
