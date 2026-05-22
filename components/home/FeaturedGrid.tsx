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
  { id: "demo-1", name: "Wooden Serving Tray", slug: "wooden-serving-tray", price: 1199, image: "/products/wooden-tray/tray-1.png", badge: "Best Seller" },
  { id: "demo-2", name: "Floating Mini Shelf", slug: "floating-mini-shelf", price: 1299, image: "/products/floating-mini-shelf/mini-shelf-4.jpg" },
  { id: "demo-3", name: "Floating Book Shelf", slug: "floating-book-shelf", price: 1599, image: "/products/floating-book-shelf/book-shelf-1.png", badge: "New Arrival" },
  { id: "demo-4", name: "Wooden Footrest", slug: "wooden-footrest", price: 1449, image: "/products/wooden-footrest/footrest-1.png" },
  { id: "demo-5", name: "Wooden Key Holder", slug: "wooden-key-holder", price: 799, image: "/products/wooden-key-holder/key-holder-1.png", badge: "Popular" },
  { id: "demo-6", name: "Floating Laptop Table", slug: "floating-laptop-table", price: 2799, image: "/products/floating-laptop-table/laptop-table-3.jpeg", badge: "Space Saver" },
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
