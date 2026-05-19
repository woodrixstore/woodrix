export const dynamic = 'force-dynamic';
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?redirect=/dashboard");

  const [orders, dbUser] = await Promise.all([
    prisma.order.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 5 }).catch(() => []),
    prisma.user.findUnique({ where: { id: user.id } }).catch(() => null),
  ]);

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-4xl text-espresso mb-2">Welcome back, {dbUser?.name?.split(" ")[0] || "friend"}.</h1>
        <p className="text-muted-foreground">Here's a snapshot of your Woodrix account.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Orders</p>
          <p className="font-serif text-3xl text-espresso">{orders.length}</p>
        </div>
        <div className="bg-surface rounded-lg p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total Spent</p>
          <p className="font-serif text-3xl text-espresso tabular-nums">{formatPKR(totalSpent)}</p>
        </div>
        <div className="bg-surface rounded-lg p-5 col-span-2 lg:col-span-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Status</p>
          <p className="font-serif text-3xl text-espresso">Active</p>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-espresso">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-sm text-accent hover:underline">View all</Link>
        </div>
        {orders.length === 0 ? (
          <p className="text-muted-foreground text-sm">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-2">
            {orders.map((o) => (
              <Link key={o.id} href={`/orders/${o.id}`} className="block bg-card border border-sand rounded-lg p-4 hover:border-accent transition">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-espresso">#{o.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(o.createdAt)}</p>
                  </div>
                  <Badge>{ORDER_STATUS_LABELS[o.status as keyof typeof ORDER_STATUS_LABELS] || o.status}</Badge>
                  <p className="font-medium tabular-nums">{formatPKR(o.total)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
