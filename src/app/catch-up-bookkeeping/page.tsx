import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";
import { seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/catch-up-bookkeeping", {
  title: `${extraServices["catch-up-bookkeeping"].name} | Juris Accounting`,
  description: extraServices["catch-up-bookkeeping"].oneLiner,
});

export default function CatchUpBookkeepingPage() {
  return <ExtraServicePage serviceId="catch-up-bookkeeping" />;
}
