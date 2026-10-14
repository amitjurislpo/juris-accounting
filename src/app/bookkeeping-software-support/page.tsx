import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/bookkeeping-software-support", {
  title: `${extraServices["bookkeeping-software-support"].name} | Juris Accounting`,
  description: extraServices["bookkeeping-software-support"].oneLiner,
});

export default function BookkeepingSoftwareSupportPage() {
  return <ExtraServicePage serviceId="bookkeeping-software-support" />;
}
