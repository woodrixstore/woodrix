import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/wishlist", label: "Wishlist" },
  { href: "/dashboard/addresses", label: "Addresses" },
  { href: "/dashboard/profile", label: "Profile" },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="container pt-[76px] pb-12">
        <div className="grid lg:grid-cols-[220px_1fr] gap-12">
          <aside className="lg:sticky lg:top-24 self-start">
            <h2 className="font-serif text-2xl text-espresso mb-6">My Account</h2>
            <nav className="space-y-2">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-espresso hover:text-accent transition py-1">
                  {l.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main>{children}</main>
        </div>
      </div>
      <Footer />
      <CartDrawer />
    </>
  );
}
