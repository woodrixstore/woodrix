"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPKR } from "@/lib/formatters";

export type FeaturedItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  hoverImage?: string;
  badge?: string;
};

const FALLBACK: FeaturedItem[] = [
  { id: "demo-1", name: "Walnut Serving Tray", slug: "walnut-serving-tray", price: 12500, image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop" },
  { id: "demo-2", name: "Oak Floating Shelf", slug: "oak-floating-shelf", price: 9500, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop" },
  { id: "demo-3", name: "Teak Footrest Stool", slug: "teak-footrest-stool", price: 18500, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop" },
  { id: "demo-4", name: "Walnut Standing Mirror", slug: "walnut-standing-mirror", price: 32000, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop" },
  { id: "demo-5", name: "Mango Wood Bowl", slug: "mango-wood-bowl", price: 6500, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=900&q=80&auto=format&fit=crop" },
  { id: "demo-6", name: "Acacia Cheese Board", slug: "acacia-cheese-board", price: 8500, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&auto=format&fit=crop" },
  { id: "demo-7", name: "Sheesham Bedside Table", slug: "sheesham-bedside-table", price: 22000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&auto=format&fit=crop" },
  { id: "demo-8", name: "Driftwood Wall Art", slug: "driftwood-wall-art", price: 14000, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=900&q=80&auto=format&fit=crop" },
];

function ProductCard({ item }: { item: FeaturedItem }) {
  const addItem = useCart((s) => s.addItem);
  const open = useCart((s) => s.open);
  const router = useRouter();

  const cartLine = {
    id: `${item.id}-default`,
    productId: item.id,
    variantId: null,
    name: item.name,
    slug: item.slug,
    image: item.image,
    price: item.price,
    quantity: 1,
  };

  const handleAddToCart = () => {
    addItem(cartLine);
    open();
  };

  const handleBuyNow = () => {
    addItem(cartLine);
    router.push("/checkout");
  };

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <Link href={`/shop/${item.slug}`} className="relative aspect-square bg-[#f0ece6] rounded-2xl overflow-hidden mb-4">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </Link>

      {/* Add to Cart button */}
      <button
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-espresso/80 text-espresso text-[13px] font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-espresso hover:text-background transition-colors duration-200 mb-2"
      >
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </button>

      {/* Buy Now button */}
      <button
        onClick={handleBuyNow}
        className="w-full py-3 bg-walnut text-background text-[13px] font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-espresso transition-colors duration-200 mb-4"
      >
        Buy Now
      </button>

      {/* Product name */}
      <Link href={`/shop/${item.slug}`} className="font-sans text-[15px] text-espresso font-medium hover:text-walnut transition-colors leading-snug">
        {item.name}
      </Link>

      {/* Price */}
      <p className="text-walnut font-bold text-[15px] mt-1">{formatPKR(item.price)}</p>
    </div>
  );
}

export function FeaturedGrid({ items }: { items?: FeaturedItem[] }) {
  const data = items && items.length ? items : FALLBACK;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.4em] text-warmgrey mb-4">Our Collection</p>
          <h2 className="font-display text-espresso tracking-tight" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
            Featured Products
          </h2>
        </div>

        {/* 4 × 2 grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {data.slice(0, 8).map((p) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <ProductCard item={p} />
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-walnut font-semibold border-b-2 border-walnut/40 pb-1 hover:border-walnut hover:text-espresso transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
