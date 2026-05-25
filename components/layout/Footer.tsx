import Link from "next/link";
import { Instagram, Facebook, MessageCircle, Mail } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer>
      {/* Top tab strip */}
      <div className="bg-surface">
        <div className="container grid grid-cols-3 border-y border-walnut/15">
          {[
            { href: "/about", label: "Our Process" },
            { href: "/shop", label: "Gallery" },
            { href: "/contact", label: "Contact" },
          ].map((t, i) => (
            <Link
              key={t.label}
              href={t.href}
              className={
                "py-6 text-center text-[11px] uppercase tracking-[0.25em] font-medium text-espresso hover:text-walnut hover:bg-background transition " +
                (i < 2 ? "border-r border-walnut/15" : "")
              }
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Earthy main */}
      <div className="bg-surface text-espresso/85 border-t border-walnut/15">
        <div className="container pt-16 pb-10 grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <p className="font-display text-2xl tracking-[0.25em] text-walnut">WOODRIX</p>
            <p className="text-sm text-warmgrey max-w-xs">
              {BRAND.tagline} Premium handcrafted wooden home décor, built to last a lifetime.
            </p>
            <form className="flex max-w-sm rounded-sm overflow-hidden bg-background border border-walnut/15">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-espresso placeholder:text-warmgrey/60 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-walnut text-background text-[11px] uppercase tracking-[0.3em] font-medium px-5 hover:bg-amber transition"
              >
                Join
              </button>
            </form>
            <div className="flex items-center gap-4 pt-2">
              <a href={BRAND.instagram} aria-label="Instagram" className="text-warmgrey hover:text-walnut transition">
                <Instagram className="h-[18px] w-[18px]" />
              </a>
              <a href={BRAND.facebook} aria-label="Facebook" className="text-warmgrey hover:text-walnut transition">
                <Facebook className="h-[18px] w-[18px]" />
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp.replace("+", "")}`}
                aria-label="WhatsApp"
                className="text-warmgrey hover:text-walnut transition"
              >
                <MessageCircle className="h-[18px] w-[18px]" />
              </a>
              <a href={`mailto:${BRAND.email}`} aria-label="Email" className="text-warmgrey hover:text-walnut transition">
                <Mail className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.28em] text-walnut mb-5">Company Info</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="hover:text-walnut transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-walnut transition">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-walnut transition">Press & Media</Link></li>
                <li><Link href="/about" className="hover:text-walnut transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.28em] text-walnut mb-5">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/shop" className="hover:text-walnut transition">Products</Link></li>
                <li><Link href="/contact" className="hover:text-walnut transition">Testimonials</Link></li>
                <li><Link href="/shop" className="hover:text-walnut transition">Pricing</Link></li>
                <li><Link href="/faq" className="hover:text-walnut transition">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.28em] text-walnut mb-5">Legal Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/terms" className="hover:text-walnut transition">Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-walnut transition">Privacy Policy</Link></li>
                <li><Link href="/returns" className="hover:text-walnut transition">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mega wordmark */}
        <div className="container pb-8 overflow-hidden">
          <h2 className="font-display text-[19vw] sm:text-[22vw] lg:text-[18vw] leading-[0.85] tracking-tight text-walnut/15 text-center select-none whitespace-nowrap">
            WOODRIX
          </h2>
          <p className="text-center text-[11px] uppercase tracking-[0.25em] text-warmgrey/70 mt-4">
            © {new Date().getFullYear()} Woodrix. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
