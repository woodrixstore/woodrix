export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

export default async function AdminDashboard() {
  const [orders, users, products] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.user.count().catch(() => 0),
    prisma.product.findMany().catch(() => []),
  ]);

  const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => ["pending", "confirmed", "processing"].includes(o.status)).length;
  const lowStock = products.filter((p) => p.totalStock < 5);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl text-espresso">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your Woodrix business</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Revenue" value={formatPKR(totalRevenue)} />
        <Stat label="Total Orders" value={orders.length} />
        <Stat label="New Customers" value={users} />
        <Stat label="Pending Orders" value={pending} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-sand rounded-lg p-6">
          <h2 className="font-serif text-xl mb-4">Recent Orders</h2>
          <div className="space-y-2">
            {orders.slice(0, 10).map((o) => (
              <div key={o.id} className="flex justify-between items-center text-sm py-2 border-b border-sand last:border-0">
                <div>
                  <p className="font-medium text-espresso">#{o.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(o.createdAt)}</p>
                </div>
                <Badge>{ORDER_STATUS_LABELS[o.status as keyof typeof ORDER_STATUS_LABELS] || o.status}</Badge>
                <p className="tabular-nums font-medium">{formatPKR(o.total)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-sand rounded-lg p-6">
          <h2 className="font-serif text-xl mb-4">Low Stock</h2>
          {lowStock.length === 0 ? (
            <p className="text-sm text-muted-foreground">All products in stock.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {lowStock.map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.name}</span>
                  <span className="text-accent font-medium">{p.totalStock}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-card border border-sand rounded-lg p-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-serif text-3xl text-espresso mt-1 tabular-nums">{value}</p>
    </div>
  );
}
