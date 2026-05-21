import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Woodrix | Home Décor, Wood Care & Interior Tips",
  description: "Tips on styling wooden home décor, caring for handcrafted wood furniture, and making the most of every space. From the Woodrix workshop in Karachi.",
  openGraph: {
    title: "Woodrix Blog — Home Décor & Wood Care Tips",
    description: "Expert tips on wooden home décor, styling shelves, trays, and furniture from Pakistan's handcrafted wood brand.",
  },
};

export default function BlogPage() {
  return (
    <div className="container py-14 lg:py-20">
      <div className="text-center mb-14">
        <p className="text-[11px] uppercase tracking-[0.4em] text-walnut mb-4">From the Workshop</p>
        <h1 className="font-display text-espresso tracking-tight" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
          Stories & Tips
        </h1>
        <p className="text-warmgrey mt-3 text-[15px] max-w-xl mx-auto">
          Ideas for your home, care guides for your pieces, and thoughts from our workshop in North Karachi.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface mb-5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-walnut text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                {post.category}
              </span>
            </div>
            <p className="text-[11px] text-warmgrey mb-2">{post.date} · {post.readTime}</p>
            <h2 className="font-display text-[20px] text-espresso leading-snug tracking-tight mb-2 group-hover:text-walnut transition-colors">
              {post.title}
            </h2>
            <p className="text-[14px] text-warmgrey leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
            <span className="mt-4 text-[12px] font-semibold text-walnut uppercase tracking-[0.18em] border-b border-walnut/30 pb-0.5 self-start group-hover:border-walnut transition-colors">
              Read More
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
