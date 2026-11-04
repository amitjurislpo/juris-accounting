import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { services } from "@/content/services";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/bookkeeping", {
  title: `${services.bookkeeping.name} services | Juris CFO`,
  description: services.bookkeeping.oneLiner,
});

export default function BookkeepingPage() {
  return <ServicePage serviceId="bookkeeping" />;
}
