"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid2x2, ShoppingBag, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useState, useEffect } from "react";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Grid2x2 },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function BottomNav() {
  const pathname = usePathname();
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.count());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isAdmin = pathname.startsWith("/admin");
  const isCheckout = pathname.startsWith("/checkout") || pathname.startsWith("/order");
  if (isAdmin || isCheckout) return null;

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 min-[560px]:hidden"
      style={{
        background: "rgba(250,246,240,0.95)",
        borderTop: "1px solid rgba(107,66,38,0.12)",
        backdropFilter: "blur(16px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {TABS.map(({ href, label, icon: Icon }) => {
          const isCart = href === "/cart";
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

          if (isCart) {
            return (
              <button
                key={href}
                onClick={open}
                className="flex flex-col items-center gap-0.5 px-4 py-1 relative"
                aria-label="Open cart"
              >
                <div className="relative">
                  <Icon
                    className={cn("h-[22px] w-[22px] transition-colors", active ? "text-walnut" : "text-espresso/50")}
                    strokeWidth={1.6}
                  />
                  {mounted && count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-1 -right-1.5 bg-walnut text-background text-[9px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center"
                    >
                      {count}
                    </motion.span>
                  )}
                </div>
                <span className={cn("text-[10px] font-medium transition-colors", active ? "text-walnut" : "text-espresso/50")}>
                  {label}
                </span>
                {active && (
                  <motion.div
                    layoutId="bottom-tab-indicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-walnut rounded-full"
                  />
                )}
              </button>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-4 py-1 relative"
              aria-label={label}
            >
              <Icon
                className={cn("h-[22px] w-[22px] transition-colors", active ? "text-walnut" : "text-espresso/50")}
                strokeWidth={1.6}
              />
              <span className={cn("text-[10px] font-medium transition-colors", active ? "text-walnut" : "text-espresso/50")}>
                {label}
              </span>
              {active && (
                <motion.div
                  layoutId="bottom-tab-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-walnut rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
