import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";

export const metadata: Metadata = {
  title: `${extraServices["bookkeeping-software-support"].name} | Juris Accounting`,
  description: extraServices["bookkeeping-software-support"].oneLiner,
};

export default function BookkeepingSoftwareSupportPage() {
  return <ExtraServicePage serviceId="bookkeeping-software-support" />;
}
