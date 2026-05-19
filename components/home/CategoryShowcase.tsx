"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const IMAGES: Record<string, string> = {
  footrest: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900",
  trays: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=900",
  shelves: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=900",
  "key-holders": "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=900",
  mirrors: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=900",
  dressing: "https://images.unsplash.com/photo-1616627052149-22c4f8a6316e?w=900",
  "laptop-tables": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900",
};

export function CategoryShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Collections</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-espresso">Shop by Collection</h2>
          </div>
          <Link href="/shop" className="text-sm text-primary hover:text-accent hidden sm:flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 scrollbar-hide">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="snap-start shrink-0 w-[280px] sm:w-[320px]"
            >
              <Link href={`/shop/category/${c.slug}`} className="group block relative h-[400px] rounded-lg overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition">
                <Image src={IMAGES[c.slug] || IMAGES.shelves} alt={c.name} fill sizes="320px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-serif text-2xl mb-1">{c.name}</h3>
                  <p className="text-xs opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                    Explore <ArrowRight className="h-3 w-3" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
