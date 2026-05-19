import Image from "next/image";
import Link from "next/link";

const TILES = [
  {
    src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
    alt: "Wood workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=900&q=80&auto=format&fit=crop",
    alt: "Hand-shaped piece",
  },
  {
    src: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop",
    alt: "Finished wood detail",
  },
  {
    src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
    alt: "Wooden interior",
  },
];

export function AdventuresGallery() {
  return (
    <section className="relative bg-background py-20 lg:py-28 overflow-hidden">
      <div className="container relative">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">Workshop · Stories</p>
          <h2 className="font-display italic text-4xl sm:text-5xl lg:text-6xl tracking-tight text-warm">
            Get Everything
            <br />
            <span className="text-gold">In One Place</span>
          </h2>
        </div>

        <div className="relative">
          {/* Outline display text */}
          <h3
            aria-hidden
            className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display uppercase tracking-tight text-[80px] sm:text-[140px] lg:text-[200px] leading-none z-0"
            style={{
              WebkitTextStroke: "1.5px rgba(44,34,24,0.18)",
              color: "transparent",
            }}
          >
            Adventures!
          </h3>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {TILES.map((t, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-walnut"
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/75 via-walnut/15 to-transparent" />
                <Link
                  href="/contact"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gold text-background text-[9px] uppercase tracking-[0.22em] font-semibold px-4 py-2 rounded-sm hover:bg-wood transition whitespace-nowrap"
                >
                  Get In Touch
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
