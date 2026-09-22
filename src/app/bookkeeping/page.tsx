import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: `${services.bookkeeping.name} services | Juris Accounting`,
  description: services.bookkeeping.oneLiner,
};

export default function BookkeepingPage() {
  return <ServicePage serviceId="bookkeeping" />;
}
