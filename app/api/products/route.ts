import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const featured = searchParams.get("featured");
  const limit = Number(searchParams.get("limit") || 50);

  const products = await prisma.product.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(featured === "1" ? { isFeatured: true } : {}),
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { variants, ...data } = parsed.data;
  const product = await prisma.product.create({
    data: {
      ...data,
      variants: { create: variants },
    },
    include: { variants: true },
  });
  return NextResponse.json({ product }, { status: 201 });
}
