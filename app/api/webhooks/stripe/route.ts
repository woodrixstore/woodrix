import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { resend, FROM_EMAIL } from "@/lib/resend";

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

      // Send confirmation email
      if (order.customerEmail) {
        try {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: order.customerEmail,
            subject: `Order Confirmed — #${order.id.slice(0, 8).toUpperCase()}`,
            html: `<h1>Thank you, ${order.customerName || "friend"}!</h1>
              <p>Your Woodrix order <strong>#${order.id.slice(0, 8).toUpperCase()}</strong> has been confirmed.</p>
              <p>Total: PKR ${order.total.toLocaleString()}</p>`,
          });
        } catch {}
      }
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
