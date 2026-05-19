import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getSessionUser } from "@/lib/supabase/server";
import { SHIPPING } from "@/lib/constants";

const Body = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        variantId: z.string().uuid().nullish(),
        quantity: z.number().int().min(1),
        price: z.number().positive(),
        name: z.string(),
        variantDetails: z.record(z.any()).optional(),
      }),
    )
    .min(1),
  contact: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string(),
  }),
  shipping: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string().default("Pakistan"),
    method: z.enum(["standard", "express"]),
  }),
  couponCode: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { items, contact, shipping, couponCode } = parsed.data;

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  let shippingCost = shipping.method === "express" ? SHIPPING.expressCost : 0;
  if (shipping.method === "standard") {
    shippingCost = subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.standardCost;
  }

  let discountAmount = 0;
  if (couponCode) {
    const coupon = await prisma.coupon.findUnique({ where: { code: couponCode.toUpperCase() } });
    if (coupon && coupon.isActive && coupon.usedCount < coupon.maxUses) {
      discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
    }
  }

  const total = Math.max(0, subtotal + shippingCost - discountAmount);
  const user = await getSessionUser().catch(() => null);

  const order = await prisma.order.create({
    data: {
      userId: user?.id ?? null,
      status: "pending",
      total,
      shippingAddress: shipping as any,
      shippingMethod: shipping.method,
      shippingCost,
      couponCode: couponCode?.toUpperCase(),
      discountAmount,
      customerEmail: contact.email,
      customerName: contact.name,
      customerPhone: contact.phone,
      items: {
        create: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId ?? null,
          quantity: i.quantity,
          priceAtPurchase: i.price,
          variantDetails: i.variantDetails as any,
        })),
      },
    },
  });

  // Stripe expects smallest currency unit. PKR has no fractional unit per Stripe (zero-decimal? — no, PKR is 2-decimal in Stripe).
  const amountInPaisa = Math.round(total * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInPaisa,
    currency: "pkr",
    metadata: { orderId: order.id },
    receipt_email: contact.email,
    description: `Woodrix order ${order.id}`,
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripePaymentId: paymentIntent.id },
  });

  return NextResponse.json({
    orderId: order.id,
    clientSecret: paymentIntent.client_secret,
    total,
    shippingCost,
    discountAmount,
  });
}
