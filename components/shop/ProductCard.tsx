"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { formatPKR } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

type Props = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  hoverImage?: string;
  category?: string;
  badge?: string;
  className?: string;
};

/**
 * Editorial product card with:
 * - 3° perspective tilt toward cursor
 * - Image scale 1.05
 * - Lifestyle (hover) image crossfade
 * - "Add to Cart" slide-up from bottom
 * - Warm brown drop shadow that deepens on hover
 */
export function ProductCard({ id, name, slug, price, image, hoverImage, badge, className }: Props) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.open);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const cartLine = {
    id: `${id}-default`,
    productId: id,
    variantId: null,
    name,
    slug,
    image,
    price,
    quantity: 1,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(cartLine);
    openCart();
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(cartLine);
    router.push("/checkout");
  };

  return (
    <div ref={ref} className={cn("group flex flex-col", className)}>
      {/* Image */}
      <Link
        href={`/shop/${slug}`}
        className="relative aspect-square lg:aspect-[4/5] bg-surface rounded-xl lg:rounded-2xl overflow-hidden mb-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, 33vw"
            className={cn(
              "object-cover transition-opacity duration-500 absolute inset-0",
              hovered ? "opacity-100" : "opacity-0"
            )}
          />
        )}
        {badge && (
          <div className="absolute top-2 left-2 bg-background/95 backdrop-blur text-walnut text-[8px] lg:text-[9px] uppercase tracking-widest font-medium px-2 py-1 rounded-sm leading-none">
            {badge}
          </div>
        )}
      </Link>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-1.5 py-2 lg:py-3 border border-espresso/70 text-espresso text-[9px] lg:text-[12px] font-bold uppercase tracking-[0.08em] lg:tracking-[0.15em] rounded-lg lg:rounded-xl hover:bg-espresso hover:text-background transition-colors duration-200 mb-1.5"
      >
        <ShoppingCart className="h-3 w-3 lg:h-4 lg:w-4 shrink-0" />
        <span className="hidden sm:inline">Add to Cart</span>
        <span className="sm:hidden">Cart</span>
      </button>

      {/* Buy Now */}
      <button
        onClick={handleBuyNow}
        className="w-full py-2 lg:py-3 bg-walnut text-background text-[9px] lg:text-[12px] font-bold uppercase tracking-[0.08em] lg:tracking-[0.15em] rounded-lg lg:rounded-xl hover:bg-espresso transition-colors duration-200 mb-2"
      >
        Buy Now
      </button>

      {/* Name + Price */}
      <Link href={`/shop/${slug}`} className="font-sans text-[11px] lg:text-[15px] text-espresso font-medium hover:text-walnut transition-colors leading-snug line-clamp-2">
        {name}
      </Link>
      <p className="text-walnut font-bold text-[11px] lg:text-[14px] mt-0.5">{formatPKR(price)}</p>
    </div>
  );
}
