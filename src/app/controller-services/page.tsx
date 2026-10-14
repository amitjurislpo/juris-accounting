import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { services } from "@/content/services";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/controller-services", {
  title: `${services.controller.name} | Juris CFO`,
  description: services.controller.oneLiner,
});

export default function ControllerServicesPage() {
  return <ServicePage serviceId="controller" />;
}
