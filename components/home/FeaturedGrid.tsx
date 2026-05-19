"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";

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
  {
    id: "demo-1",
    name: "Walnut Serving Tray",
    slug: "walnut-serving-tray",
    price: 12500,
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
    badge: "Best Seller",
  },
  {
    id: "demo-2",
    name: "Oak Floating Shelf",
    slug: "oak-floating-shelf",
    price: 9500,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-3",
    name: "Teak Footrest Stool",
    slug: "teak-footrest-stool",
    price: 18500,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop",
    badge: "New Arrival",
  },
  {
    id: "demo-4",
    name: "Walnut Standing Mirror",
    slug: "walnut-standing-mirror",
    price: 32000,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
    badge: "Only 3 Left",
  },
];

export function FeaturedGrid({ items }: { items?: FeaturedItem[] }) {
  const data = items && items.length ? items : FALLBACK;

  return (
    <section className="py-28 lg:py-40 bg-background">
      <div className="container">
        <div className="flex items-end justify-between gap-8 mb-16 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-warmgrey mb-5">The Edit</p>
            <h2 className="font-display font-light text-espresso leading-[0.95] tracking-tight max-w-[14ch]" style={{ fontSize: "clamp(40px, 6vw, 88px)" }}>
              Pieces we are <em className="italic font-normal text-walnut">quietly proud of.</em>
            </h2>
          </div>
          <Link
            href="/shop"
            data-cursor="link"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-walnut font-medium pb-1 border-b border-walnut/40 hover:border-amber hover:text-amber transition"
          >
            View Full Collection
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard
                id={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                image={p.image}
                hoverImage={p.hoverImage}
                badge={p.badge}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
