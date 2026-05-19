import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Our Story" };

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1800" alt="Woodrix workshop" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-espresso/45" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-3 opacity-80">Our Story</p>
            <h1 className="font-serif text-5xl lg:text-7xl italic">Made by hand.</h1>
          </div>
        </div>
      </section>

      <section className="container py-20 max-w-3xl space-y-16">
        {[
          { t: "Our Beginning", b: "Woodrix began in a small workshop with a single chisel and a stubborn belief — that real wood, shaped slowly, makes a home feel like home." },
          { t: "Our Materials", b: "Every piece begins as sustainably-sourced solid timber. No veneers. No compromises. Just wood the way nature shaped it." },
          { t: "Our Process", b: "Every cut, sanded edge, and oiled surface passes through hand. We don't rush, because heirlooms aren't rushed." },
          { t: "Our Promise", b: "If a piece doesn't speak to your home, return it within 7 days. We stand behind every grain we ship." },
        ].map((s) => (
          <div key={s.t}>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Chapter</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-espresso mb-4">{s.t}</h2>
            <p className="text-muted-foreground leading-relaxed">{s.b}</p>
          </div>
        ))}

        <div className="text-center pt-8">
          <Button asChild size="lg"><Link href="/shop">Shop the Collection</Link></Button>
        </div>
      </section>
    </>
  );
}
