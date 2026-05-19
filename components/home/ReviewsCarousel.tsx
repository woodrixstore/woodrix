"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Review = { id: string; name: string; rating: number; comment: string; product: string };

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) return null;
  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-28 lg:py-40 bg-background overflow-hidden">
      <div className="container">
        <div className="flex items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-warmgrey mb-5">In Their Homes</p>
            <h2 className="font-display font-light text-espresso leading-[0.95] tracking-tight" style={{ fontSize: "clamp(40px, 6vw, 88px)" }}>
              Words from <em className="italic font-normal text-walnut">our people.</em>
            </h2>
          </div>
        </div>
      </div>
      <div className="relative">
        <motion.div
          className="flex gap-10 w-max px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          {doubled.map((r, i) => (
            <figure
              key={`${r.id}-${i}`}
              className="w-[360px] lg:w-[420px] shrink-0 border-t border-walnut/15 pt-8"
            >
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star
                    key={k}
                    className={k < r.rating ? "h-3.5 w-3.5 fill-amber text-amber" : "h-3.5 w-3.5 text-walnut/20"}
                    strokeWidth={1.4}
                  />
                ))}
              </div>
              <blockquote className="font-display font-light text-[22px] lg:text-[26px] leading-[1.3] text-espresso italic">
                &ldquo;{r.comment}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-walnut font-medium">{r.name}</p>
                  <p className="text-[11px] text-warmgrey mt-1">{r.product}</p>
                </div>
                <span className="font-display italic text-walnut/30 text-3xl">&rdquo;</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
