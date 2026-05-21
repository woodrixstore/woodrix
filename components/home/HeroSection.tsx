"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full bg-background overflow-hidden mt-[-76px]" style={{ minHeight: "100svh" }}>
      <div className="grid lg:grid-cols-2" style={{ minHeight: "100svh" }}>

        {/* ─── LEFT: cream background + text ─── */}
        <div className="bg-background flex items-center order-2 lg:order-1">
          <div className="w-full px-8 sm:px-12 lg:pl-16 xl:pl-24 lg:pr-10 pt-[96px] pb-14 lg:pt-[104px] lg:pb-16">

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.4em] text-walnut font-semibold mb-7 flex items-center gap-3"
            >
              <span className="inline-block h-px w-8 bg-walnut/50" />
              Handcrafted · Est. 2024
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-black text-espresso leading-[1.04] tracking-[-0.025em] mb-7"
              style={{ fontSize: "clamp(38px, 5.5vw, 80px)" }}
            >
              Built by Hand,<br />
              <span className="text-walnut">Made for Life.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-[15px] lg:text-[16px] text-warmgrey leading-relaxed mb-10 max-w-[420px]"
            >
              Handcrafted wooden furniture and décor — turned, planed and finished by skilled artisans in Pakistan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 bg-walnut text-background px-7 py-3.5 rounded-lg text-[13px] font-semibold tracking-[0.04em] hover:bg-espresso transition-colors duration-250"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center text-[13px] font-semibold tracking-[0.04em] text-walnut border border-walnut/35 px-7 py-3.5 rounded-lg hover:bg-walnut hover:text-background transition-colors duration-250"
              >
                Our Craft
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-10 pt-8 border-t border-walnut/12 flex items-center gap-8"
            >
              {[
                { v: "500+", l: "Happy Homes" },
                { v: "100%", l: "Artisan Made" },
                { v: "2-Yr", l: "Warranty" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-sans font-black text-espresso text-[22px] leading-none">{s.v}</p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-warmgrey mt-1.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ─── RIGHT: rounded contained image card ─── */}
        <div className="relative order-1 lg:order-2 bg-background flex items-start pt-3 pr-3 pb-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden rounded-3xl"
            style={{ height: "88vh", maxHeight: "820px" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&auto=format&fit=crop"
              alt="Warm wooden interior"
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />

            {/* Floating review badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute bottom-6 left-5 hidden md:flex bg-background/90 backdrop-blur-md border border-walnut/15 rounded-xl px-4 py-3 gap-3 items-center shadow-warm"
            >
              <span className="text-amber text-[18px] leading-none">★</span>
              <div>
                <p className="font-sans font-bold text-espresso text-[13px] leading-tight">4.9 / 5.0</p>
                <p className="text-[10px] text-warmgrey">500+ verified reviews</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
