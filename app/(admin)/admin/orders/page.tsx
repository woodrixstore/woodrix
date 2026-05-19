export const dynamic = 'force-dynamic';
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

export default async function AdminOrdersPage({ searchParams }: { searchParams: { status?: string } }) {
  const where = searchParams.status ? { status: searchParams.status } : {};
  const orders = await prisma.order.findMany({ where, orderBy: { createdAt: "desc" }, include: { items: true } }).catch(() => []);

  return (
    <div>
      <h1 className="font-serif text-3xl text-espresso mb-8">Orders</h1>
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <FilterChip label="All" href="/admin/orders" active={!searchParams.status} />
        {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => (
          <FilterChip key={k} label={v} href={`/admin/orders?status=${k}`} active={searchParams.status === k} />
        ))}
      </div>
      <div className="bg-card border border-sand rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="text-left p-4">Order</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Items</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Date</th>
              <th className="text-right p-4">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-surface/50">
                <td className="p-4">
                  <Link href={`/admin/orders/${o.id}`} className="text-accent hover:underline">
                    #{o.id.slice(0, 8).toUpperCase()}
                  </Link>
                </td>
                <td className="p-4">{o.customerName || "Guest"}<br /><span className="text-xs text-muted-foreground">{o.customerEmail}</span></td>
                <td className="p-4">{o.items.length}</td>
                <td className="p-4"><Badge>{ORDER_STATUS_LABELS[o.status as keyof typeof ORDER_STATUS_LABELS] || o.status}</Badge></td>
                <td className="p-4 text-muted-foreground">{formatDate(o.createdAt)}</td>
                <td className="p-4 text-right tabular-nums">{formatPKR(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterChip({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link href={href} className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition ${active ? "bg-primary text-primary-foreground border-primary" : "border-sand text-espresso hover:border-accent"}`}>
      {label}
    </Link>
  );
}
