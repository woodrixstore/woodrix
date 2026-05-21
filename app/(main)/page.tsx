export const revalidate = 60;
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandStoryScroll } from "@/components/home/BrandStoryScroll";
import { FeaturedGrid, type FeaturedItem } from "@/components/home/FeaturedGrid";
import { StatsCounter } from "@/components/home/StatsCounter";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Woodrix — Handcrafted Wooden Home Décor Pakistan",
  description: "Woodrix — premium handcrafted wooden home décor made in Karachi, Pakistan. Shop wooden trays, floating shelves, footrests, key holders & laptop tables. Free delivery on orders above PKR 5,000.",
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Woodrix",
  url: "https://woodrix.store",
  logo: "https://woodrix.store/logo/woodrix-logo-dark.png",
  description: "Premium handcrafted wooden home décor made in Karachi, Pakistan.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "North Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-339-0065105",
    contactType: "customer service",
    availableLanguage: ["en", "ur"],
  },
  sameAs: [],
};

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Woodrix",
  url: "https://woodrix.store",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://woodrix.store/shop?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default async function HomePage() {
  const products = await prisma.product
    .findMany({ take: 8, orderBy: { createdAt: "desc" } })
    .catch(() => []);

  const items: FeaturedItem[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.basePrice,
    image: p.images[0] || "/placeholder.jpg",
    hoverImage: p.images[1],
  }));

  const reviewRows = await prisma.review
    .findMany({ take: 8, orderBy: { createdAt: "desc" }, include: { user: true, product: true } })
    .catch(() => []);
  const reviews = reviewRows.length
    ? reviewRows.map((r) => ({
        id: r.id,
        name: r.user?.name || "Verified Customer",
        rating: r.rating,
        comment: r.comment,
        product: r.product.name,
      }))
    : [
        { id: "r1", name: "Hina A.", rating: 5, comment: "The walnut tray became the quiet centre of our living room. The grain is gorgeous and the finish is buttery.", product: "Walnut Tray" },
        { id: "r2", name: "Adeel K.", rating: 5, comment: "I have ordered three pieces now. The craft and care is uncommon — every piece arrives feeling considered.", product: "Oak Floating Shelf" },
        { id: "r3", name: "Mariam S.", rating: 5, comment: "An heirloom-quality mirror at a fraction of the import price. Woodrix is a rare find.", product: "Walnut Standing Mirror" },
        { id: "r4", name: "Faraz M.", rating: 4, comment: "Solid teak, beautifully oil-finished. The footrest has held up to daily use beautifully.", product: "Teak Footrest" },
      ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }} />
      <HeroSection />
      <FeaturedGrid items={items.length ? items : undefined} />
      <BrandStoryScroll />
      <StatsCounter />
      <ReviewsCarousel reviews={reviews} />
    </>
  );
}
