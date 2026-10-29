import { notFound } from "next/navigation";
import { Suspense } from "react";
import ResourceManager from "@/components/admin/ResourceManager";
import { resourceConfigs } from "@/components/admin/adminConfig";
export const metadata = { robots: { index: false, follow: false } };
export default async function ResourcePage({ params }) {
  const { resource } = await params;
  if (!resourceConfigs[resource]) notFound();
  return <Suspense fallback={<p className="p-8 text-sm">Opening editor…</p>}><ResourceManager resource={resource} /></Suspense>;
}
