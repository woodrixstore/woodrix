"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { formatPKR } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  hoverImage?: string;
  category?: string;
  badge?: string;
  className?: string;
};

/**
 * Editorial product card with:
 * - 3° perspective tilt toward cursor
 * - Image scale 1.05
 * - Lifestyle (hover) image crossfade
 * - "Add to Cart" slide-up from bottom
 * - Warm brown drop shadow that deepens on hover
 */
export function ProductCard({ name, slug, price, image, hoverImage, badge, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 3, ry: x * 3 });
  };
  const onLeave = () => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      data-cursor="view"
      className={cn("group [perspective:1200px]", className)}
    >
      <div
        className="relative will-change-transform transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${hovered ? -6 : 0}px)`,
          boxShadow: hovered
            ? "0 30px 60px -25px rgba(107,66,38,0.35), 0 12px 28px -16px rgba(107,66,38,0.25)"
            : "0 6px 20px -12px rgba(107,66,38,0.18)",
          borderRadius: 6,
        }}
      >
        <Link href={`/shop/${slug}`} className="block">
          {/* Image — portrait 4:5 */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-md bg-surface">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              className={cn(
                "object-cover transition-all duration-700 ease-out",
                hovered ? "scale-[1.05]" : "scale-100",
                hovered && hoverImage ? "opacity-0" : "opacity-100"
              )}
            />
            {hoverImage && (
              <Image
                src={hoverImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={cn(
                  "object-cover transition-opacity duration-700 ease-out",
                  hovered ? "opacity-100 scale-[1.05]" : "opacity-0 scale-100"
                )}
              />
            )}

            {/* Badge */}
            {badge && (
              <div className="absolute top-3 left-3 bg-background/95 backdrop-blur text-walnut text-[9px] uppercase tracking-[0.28em] font-medium px-2.5 py-1.5 rounded-sm leading-none">
                {badge}
              </div>
            )}

            {/* Slide-up "Add to Cart" bar */}
            <div
              className={cn(
                "absolute inset-x-3 bottom-3 transition-all duration-500 ease-out",
                hovered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
              )}
            >
              <div
                data-cursor="add"
                className="w-full bg-walnut text-background text-[10px] uppercase tracking-[0.3em] font-medium py-3 rounded-sm text-center hover:bg-amber transition-colors"
              >
                Add to Cart
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-background px-1.5 pt-4 pb-2 flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[20px] leading-tight text-espresso tracking-tight">
              {name}
            </h3>
            <p className="text-[13px] text-warmgrey font-medium tabular-nums whitespace-nowrap">
              {formatPKR(price)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
