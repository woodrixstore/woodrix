import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export async function Bestsellers() {
  const products = await prisma.product
    .findMany({ where: { isFeatured: true }, take: 4, orderBy: { createdAt: "desc" } })
    .catch(() => []);

  if (!products.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Featured</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-espresso">Our Bestsellers</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              slug={p.slug}
              price={p.basePrice}
              image={p.images[0] || "/placeholder.jpg"}
              category={p.category}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
