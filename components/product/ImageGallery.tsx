"use client";
import Image from "next/image";
import { useState } from "react";

export function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] || images[0];
  const visible = images.slice(0, 4);
  const extra = images.length - 4;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[4/3] lg:aspect-square bg-surface rounded-xl overflow-hidden">
        <Image
          src={main}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-all duration-500"
        />
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3">
        {visible.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 ring-2 transition-all duration-200 ${
              active === i
                ? "ring-walnut"
                : "ring-transparent opacity-70 hover:opacity-100 hover:ring-sand"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="80px" />
            {i === 3 && extra > 0 && (
              <div className="absolute inset-0 bg-espresso/60 flex items-center justify-center text-background text-xs font-medium">
                +{extra} more
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
