export const dynamic = 'force-dynamic';
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { formatPKR, estimatedDelivery } from "@/lib/formatters";
import { ClearCartOnMount, CopyButton } from "./ClearCart";

export const metadata = { title: "Order Confirmed" };

export default async function SuccessPage({ searchParams }: { searchParams: { orderId?: string; demo?: string } }) {
  // Demo order (from new checkout flow)
  if (searchParams.demo === "1") {
    const demoOrderId = `WDX-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    return (
      <div className="container max-w-2xl py-20 text-center">
        <div className="mx-auto bg-emerald-100 text-emerald-700 rounded-full h-20 w-20 flex items-center justify-center mb-8">
          <Check className="h-10 w-10" />
        </div>
        <h1 className="font-display font-bold text-espresso mb-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
          Order Confirmed!
        </h1>
        <p className="text-warmgrey mb-2 text-[15px]">Thank you for your purchase.</p>
        <p className="text-warmgrey mb-8 text-[14px]">
          Your order <span className="font-semibold text-espresso">#{demoOrderId}</span> has been placed successfully.
        </p>

        <div className="bg-surface rounded-2xl p-8 text-left mb-8 space-y-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-warmgrey mb-1">Order Reference</p>
            <p className="font-display text-[28px] text-espresso">#{demoOrderId}</p>
          </div>
          <div className="border-t border-walnut/10 pt-5 text-[14px] space-y-3 text-warmgrey">
            <div className="flex justify-between"><span>Estimated delivery</span><span className="text-espresso font-medium">5–7 business days</span></div>
            <div className="flex justify-between"><span>Payment method</span><span className="text-espresso font-medium">Cash on Delivery</span></div>
          </div>
          <div className="border-t border-walnut/10 pt-5 text-[13px] text-warmgrey bg-amber/10 rounded-lg px-4 py-3">
            🚚 Our team will contact you within 24 hours to confirm your delivery details.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="flex-1"><Link href="/shop">Continue Shopping</Link></Button>
          <Button asChild variant="outline" className="flex-1"><Link href="/">Back to Home</Link></Button>
        </div>
      </div>
    );
  }

  const id = searchParams.orderId;
  if (!id) notFound();

  const shortId = id.slice(0, 8).toUpperCase();

  // Try to load full order from DB — if unavailable, still show success screen
  const order = await prisma.order
    .findUnique({ where: { id }, include: { items: { include: { product: true } } } })
    .catch(() => null);

  const eta = order
    ? estimatedDelivery(order.shippingMethod, new Date(order.createdAt))
    : estimatedDelivery("standard", new Date());

  return (
    <div className="container max-w-3xl py-16">
      <ClearCartOnMount />
      <div className="text-center mb-12">
        <div className="mx-auto bg-emerald-100 text-emerald-600 rounded-full h-20 w-20 flex items-center justify-center mb-8">
          <Check className="h-10 w-10" />
        </div>
        <h1 className="font-display font-bold text-espresso mb-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
          Order Confirmed!
        </h1>
        <p className="text-warmgrey mb-2 text-[15px]">
          Thank you{order?.customerName ? `, ${order.customerName.split(" ")[0]}` : ""}! Your order has been placed successfully.
        </p>
        <p className="text-warmgrey text-[13px]">
          A confirmation email has been sent to you.
        </p>
      </div>

      <div className="bg-surface rounded-2xl p-6 lg:p-8 space-y-6 border border-walnut/10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-warmgrey mb-1">Order Reference</p>
            <p className="font-display text-[28px] text-espresso">#{shortId}</p>
          </div>
          <CopyButton id={shortId} />
        </div>

        {order && order.items.length > 0 && (
          <div className="border-t border-sand pt-6 space-y-3">
            {order.items.map((it) => (
              <div key={it.id} className="flex justify-between items-center text-sm">
                <span className="flex-1 text-espresso">{it.product.name} <span className="text-warmgrey">× {it.quantity}</span></span>
                <span className="tabular-nums text-espresso">{formatPKR(it.priceAtPurchase * it.quantity)}</span>
              </div>
            ))}
          </div>
        )}

        {order && (
          <div className="border-t border-sand pt-4 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-warmgrey">Shipping</span>
              <span className="tabular-nums">{order.shippingCost === 0 ? "Free" : formatPKR(order.shippingCost)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-accent">
                <span>Discount</span>
                <span className="tabular-nums">−{formatPKR(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-sand">
              <span>Total</span>
              <span className="tabular-nums">{formatPKR(order.total)}</span>
            </div>
          </div>
        )}

        <div className="border-t border-sand pt-5 space-y-3 text-[14px] text-warmgrey">
          <div className="flex justify-between">
            <span>Estimated delivery</span>
            <span className="text-espresso font-medium">{eta}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200/60 rounded-lg px-4 py-3 text-[13px] text-warmgrey">
            🚚 Our team will contact you within 24 hours to confirm your delivery details.
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button asChild className="flex-1"><Link href="/shop">Continue Shopping</Link></Button>
        <Button asChild variant="outline" className="flex-1"><Link href="/">Back to Home</Link></Button>
      </div>
    </div>
  );
}

