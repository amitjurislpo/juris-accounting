import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: `${services.controller.name} | Juris Accounting`,
  description: services.controller.oneLiner,
};

export default function ControllerServicesPage() {
  return <ServicePage serviceId="controller" />;
}
