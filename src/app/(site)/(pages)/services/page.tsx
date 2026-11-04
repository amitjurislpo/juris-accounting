import { redirect } from "next/navigation";

// /services has no index of its own; the services hub lives at /services/compare.
export default function ServicesIndexPage() {
  redirect("/services/compare");
}
