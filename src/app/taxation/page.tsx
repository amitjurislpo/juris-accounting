import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: `${services.taxation.name} services | Juris Accounting`,
  description: services.taxation.oneLiner,
};

export default function TaxationPage() {
  return <ServicePage serviceId="taxation" />;
}
