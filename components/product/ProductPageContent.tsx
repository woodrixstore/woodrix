"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { ImageGallery } from "./ImageGallery";
import { ProductBuy } from "./ProductBuy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Variant = {
  id: string;
  size: string;
  finish: string;
  priceModifier: number;
  stock: number;
};

type ProductData = {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  description: string;
  images: string[];
  totalStock: number;
  finishImages?: Record<string, string[]>;
};

type Props = {
  product: ProductData;
  variants: Variant[];
  avgRating: number;
  reviewCount: number;
};

export function ProductPageContent({ product, variants, avgRating, reviewCount }: Props) {
  const [currentImages, setCurrentImages] = useState(product.images);

  const handleFinishChange = (finish: string) => {
    if (product.finishImages?.[finish]) {
      setCurrentImages(product.finishImages[finish]);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-14 items-start">
      <ImageGallery images={currentImages} name={product.name} />

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
              <Star
                key={i}
                className={i < Math.round(avgRating) ? "h-4 w-4 fill-amber text-amber" : "h-4 w-4 text-walnut/20"}
                strokeWidth={1.4}
              />
            ))}
          </div>
          <span className="text-[13px] text-warmgrey">
            {avgRating.toFixed(1)} · {reviewCount} reviews
          </span>
        </div>

        <ProductBuy
          product={{ ...product, images: currentImages }}
          variants={variants}
          onFinishChange={handleFinishChange}
        />

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
  );
}
