import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubServicePage } from "@/components/services/SubServicePage";
import { extraServices } from "@/content/extraServices";

export function generateStaticParams() {
  return extraServices["bookkeeping-software-support"].subServices.map((sub) => ({ sub: sub.slug }));
}

function findSub(slug: string) {
  return extraServices["bookkeeping-software-support"].subServices.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/bookkeeping-software-support/[sub]">): Promise<Metadata> {
  const { sub: slug } = await params;
  const sub = findSub(slug);
  if (!sub) return { title: "Not found | Juris Accounting" };
  return {
    title: `${sub.name} | Juris Accounting`,
    description: sub.oneLiner,
  };
}

export default async function SoftwareSupportSubServicePage({
  params,
}: PageProps<"/bookkeeping-software-support/[sub]">) {
  const { sub: slug } = await params;
  const sub = findSub(slug);
  if (!sub) notFound();

  return <SubServicePage serviceId="bookkeeping-software-support" sub={sub} />;
}
