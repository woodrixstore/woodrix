import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 lg:gap-8">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          slug={p.slug}
          price={p.basePrice}
          image={p.images[0] || "/placeholder.jpg"}
          hoverImage={p.images[1]}
          category={p.category}
        />
      ))}
    </div>
  );
}
