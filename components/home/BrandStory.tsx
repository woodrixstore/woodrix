import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-warm-lg">
          <Image
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200"
            alt="Woodrix craftsmanship"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Our Craft</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-espresso leading-tight mb-6">
            Made by hand. <br />
            <span className="italic">Built for life.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every Woodrix piece begins as a slab of real, sustainably-sourced timber and ends in your home as something you'll keep for a lifetime. We obsess over joinery, hand-finishing, and the way each grain tells its own quiet story.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            No veneers. No shortcuts. Just warm wood, careful hands, and design that disappears into your daily rhythm.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition group">
            Learn Our Story
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </section>
  );
}
