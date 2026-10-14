import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/cfo-services", {
  title: `${extraServices["cfo-services"].name} | Juris Accounting`,
  description: extraServices["cfo-services"].oneLiner,
});

export default function CfoServicesPage() {
  return <ExtraServicePage serviceId="cfo-services" />;
}
