"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPKR } from "@/lib/formatters";
import { SHIPPING } from "@/lib/constants";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart((s) => s.subtotal());

  const shippingCost = subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.standardCost;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background">
        <div className="bg-surface rounded-full p-8 mb-6">
          <ShoppingBag className="h-10 w-10 text-walnut" strokeWidth={1.4} />
        </div>
        <h1 className="font-display text-3xl text-espresso mb-3">Your cart is empty</h1>
        <p className="text-warmgrey mb-8 max-w-sm">Discover our handcrafted wooden pieces made to last a lifetime.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-walnut text-background px-8 py-3.5 rounded-sm text-[13px] font-medium tracking-wide hover:bg-amber transition-colors"
        >
          Continue Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-8 pb-20">
      <div className="container max-w-[1200px]">
        <h1 className="font-display font-bold text-espresso mb-10" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* Cart items */}
          <div className="space-y-0 divide-y divide-walnut/10">
            {items.map((item) => (
              <div key={item.id} className="flex gap-5 py-6">
                <Link href={`/shop/${item.slug}`} className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-surface">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link href={`/shop/${item.slug}`} className="font-display text-[18px] text-espresso hover:text-walnut transition leading-tight">
                        {item.name}
                      </Link>
                      {(item.size || item.finish) && (
                        <p className="text-[12px] text-warmgrey mt-1">
                          {[item.size, item.finish].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      className="text-warmgrey hover:text-red-500 transition shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-walnut/20 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-surface rounded-l-md transition"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-4 text-[14px] tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-surface rounded-r-md transition"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-medium text-espresso tabular-nums">
                      {formatPKR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <aside className="bg-surface rounded-xl p-7 sticky top-28">
            <h2 className="font-display text-[22px] text-espresso mb-6">Order Summary</h2>

            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-warmgrey">Subtotal</span>
                <span className="text-espresso tabular-nums">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmgrey">Shipping</span>
                <span className="text-espresso tabular-nums">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-medium">Free</span>
                  ) : formatPKR(shippingCost)}
                </span>
              </div>

              {subtotal < SHIPPING.freeThreshold && (
                <p className="text-[12px] text-amber bg-amber/10 px-3 py-2 rounded-md">
                  Add {formatPKR(SHIPPING.freeThreshold - subtotal)} more for free shipping
                </p>
              )}

              <div className="border-t border-walnut/15 pt-3 flex justify-between font-semibold text-[16px]">
                <span className="text-espresso">Total</span>
                <span className="text-espresso tabular-nums">{formatPKR(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-7 w-full flex items-center justify-center gap-2 bg-espresso text-background py-4 rounded-xl text-[14px] font-medium tracking-wide hover:bg-walnut transition-colors duration-300"
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/shop"
              className="mt-3 w-full flex items-center justify-center text-[13px] text-warmgrey hover:text-walnut transition"
            >
              Continue Shopping
            </Link>

            <div className="mt-6 pt-5 border-t border-walnut/10 space-y-2">
              <p className="text-[11px] text-warmgrey flex items-center gap-2">🔒 Secure checkout</p>
              <p className="text-[11px] text-warmgrey flex items-center gap-2">🚚 Free delivery over PKR 3,000</p>
              <p className="text-[11px] text-warmgrey flex items-center gap-2">↩ 7-day easy returns</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
