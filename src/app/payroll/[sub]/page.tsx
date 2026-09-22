import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubServicePage } from "@/components/services/SubServicePage";
import { extraServices } from "@/content/extraServices";

export function generateStaticParams() {
  return extraServices.payroll.subServices.map((sub) => ({ sub: sub.slug }));
}

function findSub(slug: string) {
  return extraServices.payroll.subServices.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/payroll/[sub]">): Promise<Metadata> {
  const { sub: slug } = await params;
  const sub = findSub(slug);
  if (!sub) return { title: "Not found | Juris Accounting" };
  return {
    title: `${sub.name} | Juris Accounting`,
    description: sub.oneLiner,
  };
}

export default async function PayrollSubServicePage({
  params,
}: PageProps<"/payroll/[sub]">) {
  const { sub: slug } = await params;
  const sub = findSub(slug);
  if (!sub) notFound();

  return <SubServicePage serviceId="payroll" sub={sub} />;
}
