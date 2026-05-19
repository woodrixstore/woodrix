export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/constants";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { EmptyState } from "@/components/common/EmptyState";

export async function generateMetadata({ params }: { params: { category: string } }) {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) return {};
  return { title: cat.name, description: cat.description };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const products = await prisma.product
    .findMany({ where: { category: params.category }, orderBy: { createdAt: "desc" } })
    .catch(() => []);

  return (
    <div className="container py-12">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">Collection</p>
        <h1 className="font-serif text-5xl text-espresso">{cat.name}</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{cat.description}</p>
      </div>
      {products.length === 0 ? (
        <EmptyState title="Restocking soon" description="New pieces are crafted weekly. Check back soon." />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
