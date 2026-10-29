import { notFound } from "next/navigation";
import RichContent from "@/components/site/RichContent";

import { Page, one } from "@/lib/content";
import { PageBanner } from "@/components/site/Elements";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await one(Page, { slug, published: true });
  return {
    title: p?.seoTitle || p?.title || "Not Found",
    description: p?.seoDescription || p?.excerpt || "",
  };
}
export default async function GenericPage({ params }) {
  const { slug } = await params;
  const p = await one(Page, { slug, published: true });
  if (!p) notFound();
  return (
    <>
      <PageBanner title={p.title} description={p.excerpt} image={p.heroImage} />
      <article className="section-pad container-site prose-content max-w-4xl">
        <RichContent content={p.content || ""} />
      </article>
    </>
  );
}
