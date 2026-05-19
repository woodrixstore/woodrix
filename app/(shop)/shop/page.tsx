export const dynamic = 'force-dynamic';
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Shop — All Products",
  description: "Browse the complete Woodrix collection of handcrafted wooden home décor.",
};

type SP = { [k: string]: string | undefined };

export default async function ShopPage({ searchParams }: { searchParams: SP }) {
  const where: Prisma.ProductWhereInput = {};
  if (searchParams.category) where.category = searchParams.category;
  if (searchParams.minPrice || searchParams.maxPrice) {
    where.basePrice = {
      ...(searchParams.minPrice ? { gte: Number(searchParams.minPrice) } : {}),
      ...(searchParams.maxPrice ? { lte: Number(searchParams.maxPrice) } : {}),
    };
  }
  if (searchParams.inStock === "1") where.totalStock = { gt: 0 };

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  switch (searchParams.sort) {
    case "price-asc": orderBy = { basePrice: "asc" }; break;
    case "price-desc": orderBy = { basePrice: "desc" }; break;
    case "bestseller": orderBy = { isFeatured: "desc" }; break;
  }

  const dbProducts = await prisma.product.findMany({ where, orderBy }).catch(() => []);

  // Use demo products as fallback when database is empty
  const displayProducts = dbProducts.length > 0 ? dbProducts : DEMO_PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    basePrice: p.basePrice,
    images: p.images,
    totalStock: p.totalStock,
    isFeatured: p.isFeatured,
  }));

  return (
    <div className="container py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">Collection</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-espresso">All Products</h1>
        <p className="text-muted-foreground mt-2">{displayProducts.length} pieces handcrafted with care</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-12">
        <FilterSidebar />
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{displayProducts.length} products</p>
            <SortDropdown />
          </div>
          {displayProducts.length === 0 ? (
            <EmptyState
              title="No products match your filters"
              description="Try adjusting filters or browse the full collection."
              action={<Button asChild><Link href="/shop">Reset Filters</Link></Button>}
            />
          ) : (
            <ProductGrid products={displayProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
