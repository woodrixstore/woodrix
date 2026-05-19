"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = [
  "Every Woodrix piece begins as a single board —",
  "chosen for its grain, its weight,",
  "the way it catches the light.",
  "We turn, plane and finish each one by hand,",
  "in our workshop in Pakistan,",
  "with the patience that wood demands",
  "and the restraint that quiet luxury asks for.",
];

function AnimatedLine({ line }: { line: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [6, 0]);

  return (
    <motion.p
      ref={ref}
      style={{ opacity, y }}
      className="font-display text-[28px] sm:text-[42px] lg:text-[58px] leading-[1.2] tracking-tight text-espresso"
    >
      {line}
    </motion.p>
  );
}

export function BrandStoryScroll() {
  return (
    <section className="relative w-full py-28 lg:py-40 bg-background overflow-hidden">
      <div className="container max-w-[1100px]">

        <p className="text-[11px] uppercase tracking-[0.4em] text-warmgrey mb-12">
          The Workshop
        </p>

        {/* Each line fades from muted→full as you scroll through it */}
        <div>
          {LINES.map((line, i) => (
            <AnimatedLine key={i} line={line} />
          ))}
        </div>

      </div>
    </section>
  );
}
