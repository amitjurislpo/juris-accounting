import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";

export const metadata: Metadata = {
  title: `${extraServices["cfo-services"].name} | Juris Accounting`,
  description: extraServices["cfo-services"].oneLiner,
};

export default function CfoServicesPage() {
  return <ExtraServicePage serviceId="cfo-services" />;
}
