"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPKR } from "@/lib/formatters";
import { SHIPPING } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart((s) => s.subtotal());

  const remainingForFree = Math.max(0, SHIPPING.freeThreshold - subtotal);
  const progress = Math.min(100, (subtotal / SHIPPING.freeThreshold) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[100vw] sm:max-w-md bg-background z-50 flex flex-col shadow-warm-lg overflow-x-hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
              <h2 className="font-serif text-2xl">Your Cart</h2>
              <button onClick={close} aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="bg-surface rounded-full p-6 mb-4">
                  <ShoppingBag className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-serif text-xl mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Discover handcrafted pieces made to last.</p>
                <Button asChild onClick={close}>
                  <Link href="/shop">Shop Now</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-sand bg-surface">
                  {remainingForFree > 0 ? (
                    <p className="text-xs text-espresso mb-2">
                      Spend <span className="font-semibold">{formatPKR(remainingForFree)}</span> more for free shipping!
                    </p>
                  ) : (
                    <p className="text-xs text-accent font-medium mb-2">You qualify for free shipping ✓</p>
                  )}
                  <div className="h-1.5 bg-sand rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-surface shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <h4 className="text-sm font-medium text-espresso truncate">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove"
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {(item.size || item.finish) && (
                          <p className="text-xs text-muted-foreground">
                            {[item.size, item.finish].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-sand rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-surface"
                              aria-label="Decrease"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm tabular-nums">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-surface"
                              aria-label="Increase"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-medium tabular-nums">
                            {formatPKR(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-sand px-6 py-5 space-y-4 bg-surface">
                  <div className="flex items-center justify-between text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold tabular-nums">{formatPKR(subtotal)}</span>
                  </div>
                  <Button asChild className="w-full" onClick={close}>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <button
                    onClick={close}
                    className="w-full text-center text-sm text-muted-foreground hover:text-accent transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
