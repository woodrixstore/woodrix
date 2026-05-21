import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { BRAND, SHIPPING } from "@/lib/constants";
import { estimatedDelivery } from "@/lib/formatters";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "woodrix.store@gmail.com";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const OrderBody = z.object({
  contact: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
  }),
  shipping: z.object({
    address: z.string().min(1),
    apt: z.string().optional(),
    city: z.string().min(1),
    postalCode: z.string().optional(),
    country: z.string().default("Pakistan"),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        variantId: z.string().nullish(),
        quantity: z.number().int().min(1),
        price: z.number().positive(),
        name: z.string(),
        variantDetails: z.record(z.any()).optional(),
      }),
    )
    .min(1),
  paymentMethod: z.enum(["cod", "jazzcash", "bank"]),
  couponCode: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = OrderBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { contact, shipping, items, paymentMethod, couponCode } = parsed.data;
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingCost = subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.standardCost;

  let discountAmount = 0;
  if (couponCode) {
    const coupon = await prisma.coupon.findUnique({
      where: { code: couponCode.toUpperCase() },
    });
    if (coupon && coupon.isActive && coupon.usedCount < coupon.maxUses) {
      discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
    }
  }

  const total = Math.max(0, subtotal + shippingCost - discountAmount);

  // Pre-generate orderId so emails work even if DB is unavailable
  const orderId = crypto.randomUUID();

  // Try saving to DB — if it fails (no DB connection, etc.) orders still go through via email
  try {
    const realItems = items.filter((i) => UUID_RE.test(i.productId));
    await prisma.order.create({
      data: {
        id: orderId,
        status: "pending",
        total,
        shippingAddress: shipping as any,
        shippingMethod: "standard",
        shippingCost,
        couponCode: couponCode?.toUpperCase(),
        discountAmount,
        customerEmail: contact.email,
        customerName: contact.name,
        customerPhone: contact.phone,
        items: realItems.length > 0
          ? {
              create: realItems.map((i) => ({
                productId: i.productId,
                variantId: UUID_RE.test(i.variantId ?? "") ? (i.variantId ?? null) : null,
                quantity: i.quantity,
                priceAtPurchase: i.price,
                variantDetails: (i.variantDetails ?? {}) as any,
              })),
            }
          : undefined,
      },
    });
  } catch (dbErr) {
    console.error("[orders] DB save failed (non-fatal):", dbErr);
  }

  const shortId = orderId.slice(0, 8).toUpperCase();
  const eta = estimatedDelivery("standard", new Date());
  const paymentLabel =
    paymentMethod === "cod"
      ? "Cash on Delivery"
      : paymentMethod === "jazzcash"
        ? "JazzCash"
        : "Bank Transfer (Meezan Bank)";

  const emailItems = items.map((i) => ({
    name: i.name,
    quantity: i.quantity,
    priceAtPurchase: i.price,
  }));

  const emailOrder: OrderWithItems = {
    id: orderId,
    customerName: contact.name,
    customerEmail: contact.email,
    customerPhone: contact.phone,
    shippingAddress: shipping,
    shippingCost,
    discountAmount,
    total,
    emailItems,
  };

  let emailStatus = "sent";
  try {
    await sendOrderEmails(emailOrder, shortId, eta, paymentLabel);
  } catch (emailErr) {
    emailStatus = String(emailErr);
    console.error("[orders] Email send failed (non-fatal):", emailErr);
  }

  return NextResponse.json({ orderId, emailStatus });
}

type EmailItem = { name: string; quantity: number; priceAtPurchase: number };

type OrderWithItems = {
  id: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  shippingAddress: unknown;
  shippingCost: number;
  discountAmount: number;
  total: number;
  emailItems: EmailItem[];
};

export async function sendOrderEmails(
  order: OrderWithItems,
  shortId: string,
  eta: string,
  paymentLabel: string,
) {
  const addr = order.shippingAddress as Record<string, string | undefined>;
  const addressStr = [addr.address, addr.apt, addr.city, addr.postalCode, addr.country]
    .filter(Boolean)
    .join(", ");

  const itemsRows = order.emailItems
    .map(
      (it: EmailItem, i: number) => `
      <tr style="background:${i % 2 === 0 ? "#ffffff" : "#faf8f6"};">
        <td style="padding:10px 14px;font-size:14px;color:#2c1810;">${it.name}</td>
        <td style="padding:10px 14px;font-size:14px;color:#2c1810;text-align:center;">${it.quantity}</td>
        <td style="padding:10px 14px;font-size:14px;color:#2c1810;text-align:right;">PKR ${(it.priceAtPurchase * it.quantity).toLocaleString()}</td>
      </tr>`,
    )
    .join("");

  const customerHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f0ebe4;padding:40px 0;">
      <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(44,24,16,0.10);">
        <div style="background:#2c1810;padding:28px 36px;text-align:center;">
          <h1 style="color:#f5f0eb;margin:0;font-size:26px;letter-spacing:0.18em;font-weight:700;">WOODRIX</h1>
          <p style="color:#c9a882;margin:6px 0 0;font-size:13px;">Crafted for the way you live.</p>
        </div>
        <div style="padding:36px;">
          <div style="text-align:center;margin-bottom:28px;">
            <p style="font-size:36px;margin:0 0 10px;">✅</p>
            <h2 style="color:#2c1810;margin:0 0 8px;font-size:22px;font-weight:700;">Order Confirmed!</h2>
            <p style="color:#7a6355;margin:0;font-size:15px;">Hi ${order.customerName?.split(" ")[0] || "there"}, your order has been placed successfully.</p>
          </div>

          <div style="background:#faf8f6;border-radius:10px;padding:16px 20px;margin-bottom:20px;border-left:4px solid #2c1810;">
            <p style="margin:0;font-size:12px;color:#7a6355;text-transform:uppercase;letter-spacing:0.1em;">Order Number</p>
            <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:#2c1810;">#${shortId}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#2c1810;">
                <th style="padding:10px 14px;text-align:left;color:#f5f0eb;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Item</th>
                <th style="padding:10px 14px;text-align:center;color:#f5f0eb;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Qty</th>
                <th style="padding:10px 14px;text-align:right;color:#f5f0eb;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsRows}</tbody>
          </table>

          <div style="background:#faf8f6;border-radius:10px;padding:16px 20px;margin-bottom:20px;">
            ${order.shippingCost > 0 ? `<div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span style="color:#7a6355;font-size:14px;">Shipping</span><span style="color:#2c1810;font-size:14px;">PKR ${order.shippingCost.toLocaleString()}</span></div>` : ""}
            ${order.discountAmount > 0 ? `<div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span style="color:#c05621;font-size:14px;">Discount</span><span style="color:#c05621;font-size:14px;">&#8722;PKR ${order.discountAmount.toLocaleString()}</span></div>` : ""}
            <div style="border-top:1px solid #e8e0d8;margin-top:10px;padding-top:12px;display:flex;justify-content:space-between;">
              <span style="font-weight:700;font-size:16px;color:#2c1810;">Total</span>
              <span style="font-weight:700;font-size:16px;color:#2c1810;">PKR ${order.total.toLocaleString()}</span>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px;">
            <div style="background:#faf8f6;border-radius:10px;padding:14px 16px;">
              <p style="margin:0 0 4px;font-size:11px;color:#7a6355;text-transform:uppercase;letter-spacing:0.1em;">Delivery Address</p>
              <p style="margin:0;font-size:13px;color:#2c1810;line-height:1.5;">${addressStr}</p>
            </div>
            <div style="background:#faf8f6;border-radius:10px;padding:14px 16px;">
              <p style="margin:0 0 4px;font-size:11px;color:#7a6355;text-transform:uppercase;letter-spacing:0.1em;">Estimated Delivery</p>
              <p style="margin:0;font-size:14px;color:#2c1810;font-weight:600;">${eta}</p>
              <p style="margin:6px 0 0;font-size:12px;color:#7a6355;">Payment: ${paymentLabel}</p>
            </div>
          </div>

          <p style="font-size:13px;color:#7a6355;text-align:center;line-height:1.6;">
            Questions? Email us at <a href="mailto:${ADMIN_EMAIL}" style="color:#2c1810;">${ADMIN_EMAIL}</a><br/>
            or WhatsApp: <a href="tel:${BRAND.whatsapp}" style="color:#2c1810;">${BRAND.whatsapp}</a>
          </p>
        </div>
        <div style="background:#2c1810;padding:18px 36px;text-align:center;">
          <p style="color:#c9a882;margin:0;font-size:12px;">&#169; 2025 Woodrix. Crafted with care.</p>
        </div>
      </div>
    </div>`;

  const adminHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f0ebe4;padding:40px 0;">
      <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(44,24,16,0.10);">
        <div style="background:#2c1810;padding:28px 36px;">
          <h1 style="color:#f5f0eb;margin:0 0 6px;font-size:22px;font-weight:700;">&#128717; New Order Received!</h1>
          <p style="color:#c9a882;margin:0;font-size:14px;">Order #${shortId} &middot; PKR ${order.total.toLocaleString()}</p>
        </div>
        <div style="padding:36px;">
          <div style="background:#faf8f6;border-radius:10px;padding:18px 20px;margin-bottom:20px;">
            <table style="width:100%;font-size:14px;border-collapse:collapse;">
              <tr><td style="padding:5px 0;color:#7a6355;width:110px;vertical-align:top;">Customer</td><td style="color:#2c1810;font-weight:600;">${order.customerName || "—"}</td></tr>
              <tr><td style="padding:5px 0;color:#7a6355;vertical-align:top;">Email</td><td style="color:#2c1810;">${order.customerEmail || "—"}</td></tr>
              <tr><td style="padding:5px 0;color:#7a6355;vertical-align:top;">Phone</td><td style="color:#2c1810;">${order.customerPhone || "—"}</td></tr>
              <tr><td style="padding:5px 0;color:#7a6355;vertical-align:top;">Payment</td><td style="color:#2c1810;font-weight:600;">${paymentLabel}</td></tr>
              <tr><td style="padding:5px 0;color:#7a6355;vertical-align:top;">Address</td><td style="color:#2c1810;">${addressStr}</td></tr>
            </table>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#2c1810;">
                <th style="padding:10px 14px;text-align:left;color:#f5f0eb;font-size:12px;">Item</th>
                <th style="padding:10px 14px;text-align:center;color:#f5f0eb;font-size:12px;">Qty</th>
                <th style="padding:10px 14px;text-align:right;color:#f5f0eb;font-size:12px;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsRows}</tbody>
          </table>

          <div style="text-align:right;font-size:18px;font-weight:700;color:#2c1810;margin-bottom:28px;">
            Total: PKR ${order.total.toLocaleString()}
          </div>

          <div style="text-align:center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://woodrix.netlify.app"}/admin/orders"
               style="display:inline-block;background:#2c1810;color:#f5f0eb;padding:13px 30px;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
              View in Dashboard &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>`;

  // Send customer confirmation
  if (order.customerEmail) {
    const r1 = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customerEmail,
      subject: `Order Confirmed #${shortId} — Woodrix`,
      html: customerHtml,
    });
    if (r1.error) console.error("[email] Customer email error:", JSON.stringify(r1.error));
    else console.log("[email] Customer email sent, id:", r1.data?.id);
  }

  // Send admin notification
  const r2 = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Order #${shortId} · PKR ${order.total.toLocaleString()}`,
    html: adminHtml,
  });
  if (r2.error) console.error("[email] Admin email error:", JSON.stringify(r2.error));
  else console.log("[email] Admin email sent, id:", r2.data?.id);
}
