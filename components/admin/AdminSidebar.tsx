"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen w-full lg:w-60 border-r border-sand bg-surface">
      <div className="p-6 border-b border-sand">
        <Link href="/admin" className="font-serif text-2xl text-espresso tracking-wider">WOODRIX</Link>
        <p className="text-xs uppercase tracking-widest text-accent mt-1">Admin</p>
      </div>
      <nav className="p-3 space-y-1">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition",
              active ? "bg-primary text-primary-foreground" : "text-espresso hover:bg-background",
            )}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
