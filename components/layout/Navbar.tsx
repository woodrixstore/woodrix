"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Collection" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center px-3.5 py-2 text-[11px] uppercase tracking-[0.22em] font-semibold rounded-lg transition-all duration-200",
        active
          ? "bg-walnut/12 text-walnut"
          : "text-espresso/60 hover:bg-espresso/[0.07] hover:text-espresso",
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.count());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* ── Floating cream pill ── */}
      <motion.header
        initial={{ y: -28, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-5 left-1/2 z-50 w-[calc(100%-48px)] max-w-[1400px]"
      >
        <nav
          className="flex items-center justify-between h-[46px] px-5 lg:px-7 rounded-2xl backdrop-blur-xl border"
          style={{
            background: "rgba(250,246,240,0.82)",
            borderColor: "rgba(107,66,38,0.13)",
            boxShadow: "0 8px 32px -12px rgba(107,66,38,0.22), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Woodrix home"
            className="font-display font-bold text-[17px] lg:text-[19px] tracking-[0.35em] text-walnut shrink-0"
          >
            WOODRIX
          </Link>

          {/* RIGHT: nav links + cart + Shop Now */}
          <div className="flex items-center gap-1">
            {/* Desktop links */}
            <ul className="hidden min-[560px]:flex items-center gap-0.5">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <NavLink
                    href={l.href}
                    label={l.label}
                    active={l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)}
                  />
                </li>
              ))}
            </ul>

            {/* Divider */}
            <span className="hidden min-[560px]:block w-px h-4 bg-walnut/20 mx-2" />

            {/* Cart */}
            <button
              onClick={open}
              aria-label="Open cart"
              className="relative p-2 rounded-lg text-espresso/60 hover:bg-espresso/[0.07] hover:text-espresso transition-all duration-200"
            >
              <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.5} />
              {mounted && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-walnut text-background text-[9px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Shop Now CTA */}
            <Link
              href="/shop"
              className="hidden min-[560px]:inline-flex items-center bg-walnut text-background text-[10px] font-bold tracking-[0.22em] uppercase px-5 py-2.5 rounded-xl hover:bg-espresso transition-colors duration-200 ml-1"
            >
              Shop Now
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="min-[560px]:hidden p-2 rounded-lg text-espresso/70 hover:bg-espresso/[0.07] hover:text-espresso transition"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "#FAF7F2" }}
          >
            <div className="flex items-center justify-between px-6 h-20">
              <span className="font-display font-bold text-[20px] tracking-[0.35em] text-walnut">WOODRIX</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5 text-espresso/70" />
              </button>
            </div>
            <ul className="px-6 flex flex-col gap-6 pt-8">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-display text-[38px] tracking-wide transition-colors",
                      pathname === l.href ? "text-walnut" : "text-espresso/75 hover:text-walnut",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  href="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center bg-walnut text-background text-[13px] font-semibold tracking-[0.22em] uppercase px-6 py-3 rounded-lg hover:bg-amber transition-colors"
                >
                  Shop Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
