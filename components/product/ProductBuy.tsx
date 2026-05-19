"use client";
import { useMemo, useState } from "react";
import { Minus, Plus, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { formatPKR } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type Variant = {
  id: string;
  size: string;
  finish: string;
  priceModifier: number;
  stock: number;
};

type Props = {
  product: {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    images: string[];
    totalStock: number;
  };
  variants: Variant[];
};

const FINISH_HEX: Record<string, string> = {
  Natural: "#D6B98A",
  Walnut: "#6B4226",
  Ebony: "#2A1A12",
  "White Oak": "#E6D6BD",
};

export function ProductBuy({ product, variants }: Props) {
  const sizes = useMemo(
    () => Array.from(new Set(variants.map((v) => v.size))),
    [variants],
  );
  const finishes = useMemo(
    () => Array.from(new Set(variants.map((v) => v.finish))),
    [variants],
  );

  const [size, setSize] = useState(sizes[0] || "");
  const [finish, setFinish] = useState(finishes[0] || "");
  const [qty, setQty] = useState(1);

  const selected = variants.find((v) => v.size === size && v.finish === finish);
  const price = product.basePrice + (selected?.priceModifier ?? 0);
  const stock = selected?.stock ?? product.totalStock;

  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.open);
  const toggleWish = useWishlist((s) => s.toggle);
  const isWished = useWishlist((s) => s.has(product.id));

  function add() {
    addItem({
      id: `${product.id}-${selected?.id ?? "base"}-${Date.now()}`,
      productId: product.id,
      variantId: selected?.id ?? null,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price,
      quantity: qty,
      size,
      finish,
    });
    toast.success(`${product.name} added to cart`);
    openCart();
  }

  return (
    <div className="space-y-7">
      {/* Price */}
      <p className="font-display text-[40px] text-espresso tabular-nums leading-none">{formatPKR(price)}</p>

      {/* Finish / Color */}
      {finishes.length > 0 && (
        <div>
          <p className="text-[12px] uppercase tracking-[0.28em] text-warmgrey mb-3">
            Finish <span className="text-walnut font-medium">· {finish}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {finishes.map((f) => (
              <button
                key={f}
                onClick={() => setFinish(f)}
                title={f}
                className={cn(
                  "relative h-9 w-9 rounded-full border-2 transition-all duration-200",
                  finish === f ? "border-walnut scale-110 shadow-md" : "border-transparent hover:border-walnut/40",
                )}
                style={{ background: FINISH_HEX[f] ?? "#C4A882" }}
              >
                {finish === f && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-background/80" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] uppercase tracking-[0.28em] text-warmgrey">
              Size <span className="text-walnut font-medium">· {size}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "px-4 py-2 text-[13px] rounded-md border transition-all duration-200",
                  size === s
                    ? "bg-espresso text-background border-espresso"
                    : "border-walnut/25 text-espresso hover:border-walnut",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stock */}
      <div className="text-[13px]">
        {stock > 0 ? (
          stock <= 3 ? (
            <span className="text-amber font-medium">Only {stock} left — order soon</span>
          ) : (
            <span className="text-emerald-700 font-medium">✓ In Stock</span>
          )
        ) : (
          <span className="text-red-600 font-medium">Out of Stock</span>
        )}
      </div>

      {/* Qty + Add to cart */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-walnut/25 rounded-md">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-3 hover:bg-surface rounded-l-md" aria-label="Decrease">
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-5 text-[15px] tabular-nums">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-3 py-3 hover:bg-surface rounded-r-md" aria-label="Increase">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={add}
          disabled={stock <= 0}
          className="flex-1 flex items-center justify-center gap-2 bg-espresso text-background py-4 rounded-xl text-[14px] font-medium tracking-wide hover:bg-walnut transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
        <button
          onClick={() => {
            toggleWish(product.id);
            toast.success(isWished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          aria-label="Wishlist"
          className={cn(
            "flex items-center justify-center w-14 rounded-xl border-2 transition-all duration-200",
            isWished ? "border-walnut bg-walnut/10" : "border-walnut/25 hover:border-walnut",
          )}
        >
          <Heart className={cn("h-5 w-5", isWished ? "fill-walnut text-walnut" : "text-espresso")} />
        </button>
      </div>

      <p className="text-[12px] text-warmgrey flex items-center gap-2">
        <span>🚚</span> Free delivery on orders over PKR 3,000
      </p>
    </div>
  );
}
