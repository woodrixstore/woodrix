"use client";
import { useEffect, useState } from "react";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductCard } from "@/components/shop/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ProductCardSkeleton } from "@/components/common/LoadingSkeleton";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Product = { id: string; name: string; slug: string; basePrice: number; images: string[]; category: string };

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    let active = true;
    if (ids.length === 0) { setProducts([]); return; }
    fetch("/api/products?limit=50")
      .then((r) => r.json())
      .then((d) => {
        if (active) setProducts((d.products || []).filter((p: Product) => ids.includes(p.id)));
      })
      .catch(() => active && setProducts([]));
    return () => { active = false; };
  }, [ids]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-espresso mb-8">Wishlist</h1>
      {products === null ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCardSkeleton /><ProductCardSkeleton /><ProductCardSkeleton />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Tap the heart on any piece to save it for later."
          icon={<Heart className="h-8 w-8" />}
          action={<Button asChild><Link href="/shop">Browse Collection</Link></Button>}
        />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.basePrice} image={p.images[0]} category={p.category} />
          ))}
        </div>
      )}
    </div>
  );
}
