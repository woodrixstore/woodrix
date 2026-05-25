"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => { setActive(0); }, [images]);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, images.length]);

  const src = images[active] || images[0];

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main image — click to open lightbox */}
        <button
          onClick={() => setLightbox(true)}
          className="group relative aspect-[4/3] lg:aspect-square bg-surface rounded-xl overflow-hidden w-full cursor-zoom-in"
          aria-label="View full size"
        >
          <Image
            src={src}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center gap-1 text-[10px] text-espresso opacity-0 group-hover:opacity-100 transition">
            <Maximize2 className="h-3 w-3" /> Zoom
          </div>
        </button>

        {/* Thumbnail strip — all images, horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {images.map((s, i) => (
            <button
              key={`${s}-${i}`}
              onClick={() => setActive(i)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 ring-2 transition-all duration-200 ${
                active === i
                  ? "ring-walnut"
                  : "ring-transparent opacity-70 hover:opacity-100 hover:ring-sand"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={s} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition p-2 rounded-full bg-white/10 hover:bg-white/20 z-10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-4xl max-h-[85vh] mx-16 my-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={name}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}

          {/* Counter + thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActive(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-white w-5" : "bg-white/40"}`}
                />
              ))}
            </div>
            <p className="text-white/60 text-xs">{active + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
