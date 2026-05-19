"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/shop/ProductCard";

export type DiscoverItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
};

const FALLBACK: DiscoverItem[] = [
  {
    id: "f1",
    name: "Heritage Tray Set",
    slug: "heritage-tray-set",
    price: 6499,
    image:
      "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=900&q=80&auto=format&fit=crop",
    category: "best-seller",
    badge: "Best Seller",
  },
  {
    id: "f2",
    name: "Walnut Footrest",
    slug: "walnut-footrest",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=900&q=80&auto=format&fit=crop",
    category: "footrest",
    badge: "New Arrival",
  },
  {
    id: "f3",
    name: "Oak Key Holder",
    slug: "oak-key-holder",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop",
    category: "key-holders",
    badge: "Only 2 Left",
  },
  {
    id: "f4",
    name: "Floating Shelf",
    slug: "floating-shelf",
    price: 4299,
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
    category: "shelves",
    badge: "New Arrival",
  },
];

const TABS = [
  { key: "all", label: "Best Seller" },
  { key: "footrest", label: "Footrest" },
  { key: "shelves", label: "Shelves" },
  { key: "key-holders", label: "Key Holders" },
];

export function DiscoverCollection({ items }: { items?: DiscoverItem[] }) {
  const data = items && items.length ? items : FALLBACK;
  const [active, setActive] = useState("all");

  const visible = useMemo(() => {
    if (active === "all") return data.slice(0, 4);
    const filtered = data.filter((p) => p.category === active);
    return (filtered.length ? filtered : data).slice(0, 4);
  }, [active, data]);

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">Our Collection</p>
          <h2 className="font-display italic text-4xl sm:text-5xl lg:text-6xl tracking-tight text-warm">
            Discover Curated
            <br />
            <span className="text-gold">Collection</span>
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-6 lg:gap-10">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={
                  "text-[11px] uppercase tracking-[0.25em] font-medium pb-1 transition " +
                  (active === t.key
                    ? "text-gold border-b border-gold"
                    : "text-warm/50 hover:text-warm border-b border-transparent")
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              slug={p.slug}
              price={p.price}
              image={p.image}
              badge={p.badge}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center bg-gold text-background text-[11px] uppercase tracking-[0.25em] font-semibold px-9 py-3.5 rounded-sm hover:bg-wood transition"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
