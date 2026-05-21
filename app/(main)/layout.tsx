import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SmoothScroll } from "@/components/ux/SmoothScroll";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <SmoothScroll />
      <Navbar />
      <main className="pt-[76px]">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
