export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { OrderTimeline } from "@/components/tracking/OrderTimeline";
import { formatPKR, formatDateTime } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";

export default async function TrackOrderPage({ params }: { params: { id: string } }) {
  const order = await prisma.order
    .findUnique({ where: { id: params.id }, include: { items: { include: { product: true } } } })
    .catch(() => null);
  if (!order) notFound();

  const shipping = order.shippingAddress as any;

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Order</p>
        <h1 className="font-serif text-4xl text-espresso">#{order.id.slice(0, 8).toUpperCase()}</h1>
        <p className="text-sm text-muted-foreground mt-1">Placed on {formatDateTime(order.createdAt)}</p>
      </div>

      <div className="bg-surface rounded-lg p-6 lg:p-8 mb-8">
        <OrderTimeline status={order.status} />
      </div>

      {order.trackingNumber && (
        <div className="bg-card rounded-lg border border-sand p-6 mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Tracking</p>
          <p className="font-medium text-espresso">{order.courierName || "Courier"}: {order.trackingNumber}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-sand p-6">
          <h3 className="font-serif text-xl mb-4">Items</h3>
          <div className="space-y-3">
            {order.items.map((it) => (
              <div key={it.id} className="flex justify-between text-sm">
                <span>{it.product.name} <span className="text-muted-foreground">× {it.quantity}</span></span>
                <span className="tabular-nums">{formatPKR(it.priceAtPurchase * it.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-sand mt-4 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatPKR(order.total)}</span>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-sand p-6">
          <h3 className="font-serif text-xl mb-4">Shipping Address</h3>
          <div className="text-sm space-y-1 text-espresso/90">
            <p>{order.customerName}</p>
            <p>{shipping?.line1}</p>
            {shipping?.line2 && <p>{shipping.line2}</p>}
            <p>{shipping?.city}, {shipping?.state} {shipping?.postalCode}</p>
            <p>{shipping?.country}</p>
          </div>
          <Badge className="mt-4">{order.shippingMethod} delivery</Badge>
        </div>
      </div>

      <div className="mt-10 flex gap-3">
        <Link href="/contact" className="text-sm text-accent hover:underline">Need help?</Link>
      </div>
    </div>
  );
}
