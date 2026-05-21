"use client";
import { motion } from "framer-motion";

const LINES = [
  "Every Woodrix piece begins as a single board —",
  "chosen for its grain, its weight,",
  "the way it catches the light.",
  "We turn, plane and finish each one by hand,",
  "in our workshop in Pakistan,",
  "with the patience that wood demands",
  "and the restraint that quiet luxury asks for.",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const lineVariants = {
  hidden: { opacity: 0.12, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function BrandStoryScroll() {
  return (
    <section className="relative w-full py-24 lg:py-36 bg-background overflow-hidden">
      <div className="container max-w-[1100px]">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-[11px] uppercase tracking-[0.4em] text-warmgrey mb-10"
        >
          The Workshop
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              variants={lineVariants}
              className="font-display text-[26px] sm:text-[40px] lg:text-[56px] leading-[1.25] tracking-tight text-espresso"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
