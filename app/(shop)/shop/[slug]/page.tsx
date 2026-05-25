export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DEMO_PRODUCTS, getDemoProduct } from "@/lib/demo-products";
import { ProductPageContent } from "@/components/product/ProductPageContent";
import { ProductCard } from "@/components/shop/ProductCard";

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
        finishImages: demo.finishImages,
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
        finishImages: undefined as Record<string, string[]> | undefined,
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
        <ProductPageContent
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            basePrice: product.basePrice,
            description: product.description,
            images: product.images,
            totalStock: product.totalStock,
            finishImages: product.finishImages,
          }}
          variants={product.variants}
          avgRating={avgRating}
          reviewCount={product.reviews.length || 42}
        />

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
