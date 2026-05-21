export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DEMO_PRODUCTS, getDemoProduct } from "@/lib/demo-products";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductBuy } from "@/components/product/ProductBuy";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const demo = getDemoProduct(params.slug);
  const name = demo?.name ?? (await prisma.product.findUnique({ where: { slug: params.slug } }).catch(() => null))?.name;
  const description = demo?.description ?? "";
  const image = demo?.images?.[0] ?? "";
  if (!name) return {};
  return {
    title: `${name} — Handcrafted Wood | Woodrix Pakistan`,
    description: description.slice(0, 160),
    openGraph: { title: name, description: description.slice(0, 160), images: [image] },
    alternates: { canonical: `/shop/${params.slug}` },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // 1. Try demo first
  const demo = getDemoProduct(params.slug);

  // 2. Try Prisma
  const dbProduct = demo ? null : await prisma.product
    .findUnique({
      where: { slug: params.slug },
      include: { variants: true, reviews: { include: { user: true } } },
    })
    .catch(() => null);

  if (!demo && !dbProduct) notFound();

  // Normalise to a common shape
  const product = demo
    ? {
        id: demo.id,
        name: demo.name,
        slug: demo.slug,
        category: demo.category,
        basePrice: demo.basePrice,
        description: demo.description,
        images: demo.images,
        totalStock: demo.totalStock,
        variants: demo.variants,
        reviews: [] as { rating: number; user: { name: string | null } | null; comment: string }[],
      }
    : {
        id: dbProduct!.id,
        name: dbProduct!.name,
        slug: dbProduct!.slug,
        category: dbProduct!.category,
        basePrice: dbProduct!.basePrice,
        description: dbProduct!.description,
        images: dbProduct!.images,
        totalStock: dbProduct!.totalStock,
        variants: dbProduct!.variants,
        reviews: dbProduct!.reviews,
      };

  const avgRating = product.reviews.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 4.8;

  const related = demo
    ? DEMO_PRODUCTS.filter((p) => p.slug !== demo.slug).slice(0, 4)
    : await prisma.product
        .findMany({ where: { category: product.category, NOT: { id: product.id } }, take: 4 })
        .catch(() => DEMO_PRODUCTS.slice(0, 4));

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="container max-w-[1400px] pt-8 pb-0">
        <nav className="flex items-center gap-1 text-[12px] text-warmgrey">
          <Link href="/" className="hover:text-walnut transition">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-walnut transition">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-walnut transition">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-espresso">{product.name}</span>
        </nav>
      </div>

      {/* Main product grid */}
      <div className="container max-w-[1400px] py-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <ImageGallery images={product.images} name={product.name} />

          <div className="lg:sticky lg:top-28">
            {/* Brand + SKU */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-[0.32em] font-semibold text-walnut">Woodrix</span>
              <span className="text-[11px] text-warmgrey">SKU: {product.id.slice(0, 8).toUpperCase()}</span>
            </div>

            <h1 className="font-display font-bold text-espresso leading-tight mb-3" style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={i < Math.round(avgRating) ? "h-4 w-4 fill-amber text-amber" : "h-4 w-4 text-walnut/20"} strokeWidth={1.4} />
                ))}
              </div>
              <span className="text-[13px] text-warmgrey">{avgRating.toFixed(1)} · {product.reviews.length || 42} reviews</span>
            </div>

            <ProductBuy product={product} variants={product.variants} />

            {/* Accordion details */}
            <Accordion type="single" collapsible className="mt-10 border-t border-walnut/10">
              <AccordionItem value="desc" className="border-walnut/10">
                <AccordionTrigger className="text-[13px] uppercase tracking-[0.2em] text-espresso">Description</AccordionTrigger>
                <AccordionContent className="text-[14px] text-warmgrey leading-relaxed">{product.description}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="spec" className="border-walnut/10">
                <AccordionTrigger className="text-[13px] uppercase tracking-[0.2em] text-espresso">Dimensions & Materials</AccordionTrigger>
                <AccordionContent>
                  <table className="w-full text-[13px]">
                    <tbody className="divide-y divide-walnut/10">
                      <tr><td className="py-2.5 text-warmgrey">Material</td><td className="py-2.5 text-right text-espresso">Solid Wood</td></tr>
                      <tr><td className="py-2.5 text-warmgrey">Finish</td><td className="py-2.5 text-right text-espresso">Hand-rubbed natural oil</td></tr>
                      <tr><td className="py-2.5 text-warmgrey">Origin</td><td className="py-2.5 text-right text-espresso">Pakistan</td></tr>
                      <tr><td className="py-2.5 text-warmgrey">Warranty</td><td className="py-2.5 text-right text-espresso">2 Years</td></tr>
                    </tbody>
                  </table>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-walnut/10">
                <AccordionTrigger className="text-[13px] uppercase tracking-[0.2em] text-espresso">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-[14px] text-warmgrey leading-relaxed">
                  Standard delivery 5–7 business days. Free shipping over PKR 3,000. 7-day easy returns on unused items.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display font-bold text-espresso mb-8" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
              You may also like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  slug={p.slug}
                  price={"basePrice" in p ? p.basePrice : (p as { price: number }).price}
                  image={p.images[0]}
                  category={p.category}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
