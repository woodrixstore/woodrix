import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { code, subtotal } = await req.json();
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  const coupon = await prisma.coupon.findUnique({ where: { code: String(code).toUpperCase() } });
  if (!coupon || !coupon.isActive) return NextResponse.json({ error: "Invalid coupon" }, { status: 404 });
  if (coupon.expiresAt && coupon.expiresAt < new Date())
    return NextResponse.json({ error: "Coupon expired" }, { status: 400 });
  if (coupon.usedCount >= coupon.maxUses)
    return NextResponse.json({ error: "Coupon limit reached" }, { status: 400 });

  const discount = Math.round((Number(subtotal || 0) * coupon.discountPercent) / 100);
  return NextResponse.json({ code: coupon.code, discountPercent: coupon.discountPercent, discount });
}
