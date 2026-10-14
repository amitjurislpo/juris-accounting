import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/industries/IndustryPage";
import { industryPageList } from "@/content/industryPages";
import { seoMetadata } from "@/content/seo";

export function generateStaticParams() {
  return industryPageList.map((industry) => ({ slug: industry.id }));
}

function findIndustry(slug: string) {
  return industryPageList.find((i) => i.id === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) return { title: "Not found | Juris CFO" };
  return seoMetadata(industry.href, {
    title: `${industry.name} | Juris CFO`,
    description: industry.oneLiner,
  });
}

export default async function IndustryDetailPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) notFound();

  return <IndustryPage industryId={industry.id} />;
}
