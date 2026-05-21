export const dynamic = 'force-dynamic';
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDateTime } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

export default async function AdminOrdersPage({ searchParams }: { searchParams: { status?: string } }) {
  const where = searchParams.status ? { status: searchParams.status } : {};
  const orders = await prisma.order
    .findMany({ where, orderBy: { createdAt: "desc" }, include: { items: { include: { product: true } } } })
    .catch(() => []);

  return (
    <div>
      <h1 className="font-serif text-3xl text-espresso mb-8">Orders</h1>
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <FilterChip label="All" href="/admin/orders" active={!searchParams.status} />
        {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => (
          <FilterChip key={k} label={v} href={`/admin/orders?status=${k}`} active={searchParams.status === k} />
        ))}
      </div>
      <div className="bg-card border border-sand rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-surface text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="text-left p-4">Order No</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Time</th>
              <th className="text-left p-4">Item</th>
              <th className="text-center p-4">Quantity</th>
              <th className="text-right p-4">Amount</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {orders.length === 0 && (
              <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No orders found.</td></tr>
            )}
            {orders.map((o) => {
              const totalQty = o.items.reduce((s, i) => s + i.quantity, 0);
              const itemNames = o.items.map((i) => i.product.name);
              const itemLabel =
                itemNames.length <= 2
                  ? itemNames.join(", ")
                  : `${itemNames.slice(0, 2).join(", ")} +${itemNames.length - 2} more`;
              return (
                <tr key={o.id} className="hover:bg-surface/50">
                  <td className="p-4 font-mono">
                    <Link href={`/admin/orders/${o.id}`} className="text-accent hover:underline font-semibold">
                      #{o.id.slice(0, 8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-espresso">{o.customerName || "Guest"}</p>
                    <p className="text-xs text-muted-foreground">{o.customerPhone}</p>
                  </td>
                  <td className="p-4 text-muted-foreground whitespace-nowrap">{formatDateTime(o.createdAt)}</td>
                  <td className="p-4 max-w-[200px]">
                    <p className="truncate text-espresso" title={itemNames.join(", ")}>{itemLabel}</p>
                  </td>
                  <td className="p-4 text-center tabular-nums font-medium">{totalQty}</td>
                  <td className="p-4 text-right tabular-nums font-semibold text-espresso">{formatPKR(o.total)}</td>
                  <td className="p-4">
                    <Badge>{ORDER_STATUS_LABELS[o.status as keyof typeof ORDER_STATUS_LABELS] || o.status}</Badge>
                  </td>
                </tr>
              );
            })}
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
