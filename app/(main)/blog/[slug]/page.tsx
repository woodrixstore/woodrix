import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Woodrix Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Woodrix" },
    publisher: {
      "@type": "Organization",
      name: "Woodrix",
      logo: { "@type": "ImageObject", url: "/logo/woodrix-logo-dark.png" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="container py-14 lg:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-[12px] text-warmgrey hover:text-walnut transition mb-8 uppercase tracking-[0.15em] font-semibold">
            <ArrowLeft className="h-3.5 w-3.5" />
            All Posts
          </Link>

          {/* Header */}
          <p className="text-[11px] uppercase tracking-[0.35em] text-walnut font-semibold mb-4">{post.category}</p>
          <h1 className="font-display text-espresso tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}>
            {post.title}
          </h1>
          <p className="text-warmgrey text-[13px] mb-8">{post.date} · {post.readTime}</p>

          {/* Hero image */}
          <div className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-surface mb-10">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(min-width: 1024px) 768px, 100vw" priority />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-espresso leading-relaxed space-y-6">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="font-display text-[26px] lg:text-[32px] text-espresso tracking-tight mt-10 mb-4">{block.slice(3)}</h2>;
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return <p key={i} className="font-semibold text-espresso">{block.slice(2, -2)}</p>;
              }
              if (block.startsWith("- ")) {
                const items = block.split("\n").filter(Boolean);
                return (
                  <ul key={i} className="space-y-2 pl-5">
                    {items.map((item, j) => (
                      <li key={j} className="text-[15px] text-warmgrey list-disc">
                        {item.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.match(/^\d+\./)) {
                const items = block.split("\n").filter(Boolean);
                return (
                  <ol key={i} className="space-y-2 pl-5 list-decimal">
                    {items.map((item, j) => (
                      <li key={j} className="text-[15px] text-warmgrey">{item.replace(/^\d+\.\s/, "")}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="text-[15px] text-warmgrey leading-[1.85]">{block}</p>;
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 p-8 bg-surface rounded-2xl border border-walnut/10 text-center">
            <p className="font-display text-[22px] text-espresso mb-2">Ready to bring this home?</p>
            <p className="text-warmgrey text-[14px] mb-5">Handcrafted in Karachi and delivered across Pakistan.</p>
            <Link href="/shop" className="inline-flex items-center bg-walnut text-background text-[12px] font-bold tracking-[0.2em] uppercase px-7 py-3.5 rounded-xl hover:bg-espresso transition-colors">
              Shop the Collection
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="max-w-5xl mx-auto mt-20">
            <h2 className="font-display text-[26px] text-espresso mb-8">More from the Blog</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface mb-3">
                    <Image src={r.image} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                  </div>
                  <p className="text-[11px] text-warmgrey mb-1">{r.category} · {r.readTime}</p>
                  <h3 className="font-display text-[17px] text-espresso leading-snug group-hover:text-walnut transition-colors">{r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
