"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HERO_CATS = [
  {
    key: "trays",
    label: "Serving Trays",
    tag: "Handcrafted",
    count: "12 pieces",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=85&auto=format&fit=crop",
  },
  {
    key: "shelves",
    label: "Floating Shelves",
    tag: "Wall Décor",
    count: "8 pieces",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=85&auto=format&fit=crop",
  },
  {
    key: "footrest",
    label: "Footrests & Stools",
    tag: "Accent Furniture",
    count: "6 pieces",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=85&auto=format&fit=crop",
  },
];

const FEATURED_COLLECTIONS = [
  {
    key: "trays",
    label: "Wooden Trays",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=700&q=80&auto=format&fit=crop",
  },
  {
    key: "key-holders",
    label: "Key Holders",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop",
  },
  {
    key: "shelves",
    label: "Wall Shelves",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&q=80&auto=format&fit=crop",
  },
  {
    key: "mirrors",
    label: "Wood Mirrors",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80&auto=format&fit=crop",
  },
];

export function CategoryReveal() {
  return (
    <>
      {/* ── Tall prominent category cards ── */}
      <section className="bg-background py-20">
        <div className="container max-w-[1400px]">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.45em] text-amber font-medium mb-3">Shop by Category</p>
              <h2
                className="font-display font-bold text-espresso leading-tight"
                style={{ fontSize: "clamp(28px, 4vw, 54px)" }}
              >
                Handcrafted Collections
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-walnut font-medium hover:text-amber transition-colors"
            >
              All Products <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          {/* 3 tall portrait cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HERO_CATS.map((c, i) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                style={{ originY: 1 }}
              >
                <Link
                  href={`/shop?category=${c.key}`}
                  className="group relative block rounded-2xl overflow-hidden aspect-[3/4] bg-surface shadow-warm hover:shadow-warm-lg transition-shadow duration-500"
                >
                  {/* Full-bleed image */}
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />

                  {/* Dark gradient overlay — bottom heavy */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent transition-opacity duration-500 group-hover:from-espresso/95 group-hover:via-espresso/40" />

                  {/* Top tag */}
                  <div className="absolute top-4 left-4 bg-amber/90 text-espresso text-[10px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 rounded-full">
                    {c.tag}
                  </div>

                  {/* Bottom text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-background/60 text-[11px] uppercase tracking-[0.3em] mb-2">{c.count}</p>
                    <h3 className="font-display font-bold text-background leading-tight mb-4" style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}>
                      {c.label}
                    </h3>
                    {/* Shop now — slides up on hover */}
                    <div className="flex items-center gap-2 text-amber text-[12px] uppercase tracking-[0.25em] font-semibold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350">
                      Shop Now <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured product-type grid ── */}
      <section className="bg-surface/60 py-20">
        <div className="container max-w-[1400px]">
          <div className="mb-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.45em] text-amber font-medium mb-3">Explore</p>
            <h2
              className="font-display font-bold text-espresso leading-tight"
              style={{ fontSize: "clamp(24px, 3.5vw, 46px)" }}
            >
              Featured Collections
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_COLLECTIONS.map((c, i) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              >
                <Link
                  href={`/shop?category=${c.key}`}
                  className="group relative block rounded-xl overflow-hidden aspect-square bg-surface shadow-warm hover:shadow-warm-lg transition-shadow duration-400"
                >
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  {/* Bottom label strip */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/85 to-transparent px-4 pb-4 pt-12 flex items-end justify-between">
                    <h3 className="font-display text-[16px] lg:text-[18px] text-background font-bold leading-tight">
                      {c.label}
                    </h3>
                    <span className="h-8 w-8 rounded-full bg-amber flex items-center justify-center shrink-0 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                      <ArrowRight className="h-3.5 w-3.5 text-espresso" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
