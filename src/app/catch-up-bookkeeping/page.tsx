import type { Metadata } from "next";
import { ExtraServicePage } from "@/components/services/ExtraServicePage";
import { extraServices } from "@/content/extraServices";

export const metadata: Metadata = {
  title: `${extraServices["catch-up-bookkeeping"].name} | Juris Accounting`,
  description: extraServices["catch-up-bookkeeping"].oneLiner,
};

export default function CatchUpBookkeepingPage() {
  return <ExtraServicePage serviceId="catch-up-bookkeeping" />;
}
