import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900",
  "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=900",
  "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=900",
  "https://images.unsplash.com/photo-1616627052149-22c4f8a6316e?w=900",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&sat=-50",
  "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=900",
];

export function GalleryGrid() {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">@Woodrix</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-espresso">Lived in. Loved in.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {IMAGES.map((src, i) => (
            <Link
              key={i}
              href="/shop"
              className={`relative group overflow-hidden rounded-md ${
                i === 0 ? "md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              }`}
            >
              <Image src={src} alt="Lifestyle" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/30 transition flex items-center justify-center">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 tracking-wider uppercase">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
