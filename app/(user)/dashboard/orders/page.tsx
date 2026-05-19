export const dynamic = 'force-dynamic';
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";

export default async function MyOrdersPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  }).catch(() => []);

  return (
    <div>
      <h1 className="font-serif text-3xl text-espresso mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Your handcrafted pieces are waiting."
          action={<Button asChild><Link href="/shop">Shop Now</Link></Button>}
        />
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <Link key={o.id} href={`/orders/${o.id}`} className="block bg-card border border-sand rounded-lg p-5 hover:border-accent transition">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="font-medium text-espresso">#{o.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(o.createdAt)} · {o.items.length} {o.items.length === 1 ? "item" : "items"}</p>
                </div>
                <Badge>{ORDER_STATUS_LABELS[o.status as keyof typeof ORDER_STATUS_LABELS] || o.status}</Badge>
                <p className="font-medium tabular-nums">{formatPKR(o.total)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
