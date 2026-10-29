import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };
export default async function Layout({ children }) {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell admin={admin}>{children}</AdminShell>;
}
