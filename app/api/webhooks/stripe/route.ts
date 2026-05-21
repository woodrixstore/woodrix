import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderEmails } from "@/app/api/orders/route";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  const body = await req.text();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as any;
    const orderId = intent.metadata?.orderId;
    if (orderId) {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: "confirmed" },
        include: { items: { include: { product: true } } },
      });

      const shortId = order.id.slice(0, 8).toUpperCase();
      const { estimatedDelivery } = await import("@/lib/formatters");
      const eta = estimatedDelivery(order.shippingMethod, new Date(order.createdAt));
      await sendOrderEmails(order, shortId, eta, "Debit / Credit Card").catch(() => {});
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as any;
    const orderId = intent.metadata?.orderId;
    if (orderId) {
      await prisma.order.update({ where: { id: orderId }, data: { status: "cancelled" } });
    }
  }

  return NextResponse.json({ received: true });
}
