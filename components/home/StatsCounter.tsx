"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 8, suffix: "", label: "Product Lines" },
  { value: 100, suffix: "%", label: "Artisan Made" },
  { value: 2, suffix: "-Year", label: "Warranty" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1500;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="relative py-28 lg:py-40 bg-surface">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={
                "px-6 lg:px-10 " +
                (i < 3 ? "lg:border-r lg:border-walnut/15" : "")
              }
            >
              <div className="font-display font-light text-walnut leading-none mb-4 text-[64px] lg:text-[88px] tracking-tight">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-warmgrey">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
