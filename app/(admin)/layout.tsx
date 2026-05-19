import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?redirect=/admin");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10 max-w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
