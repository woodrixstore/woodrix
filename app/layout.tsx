import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { BRAND } from "@/lib/constants";
import { SwRegister } from "@/components/layout/SwRegister";
import { BottomNav } from "@/components/layout/BottomNav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#6B4226",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://woodrix.store"),
  title: {
    default: "Woodrix — Handcrafted Wooden Home Décor Pakistan",
    template: `%s · Woodrix`,
  },
  description:
    "Woodrix — premium handcrafted wooden home décor made in Karachi, Pakistan. Shop wooden trays, floating shelves, footrests, key holders, laptop tables & more. Built to last a lifetime.",
  keywords: [
    "woodrix", "wooden home decor pakistan", "handcrafted wood furniture karachi",
    "floating shelves pakistan", "wooden tray pakistan", "wooden key holder",
    "floating laptop table", "wooden footrest", "wood decor online pakistan",
    "buy wooden furniture karachi", "handmade wood pakistan",
  ],
  openGraph: {
    title: "Woodrix — Handcrafted Wooden Home Décor Pakistan",
    description: "Premium handcrafted wooden home décor made in Karachi. Trays, shelves, footrests, key holders, laptop tables — built to last.",
    type: "website",
    siteName: "Woodrix",
    locale: "en_PK",
    images: [{ url: "/logo/woodrix-logo-dark.png", width: 1200, height: 630, alt: "Woodrix — Handcrafted Wood" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Woodrix — Handcrafted Wooden Home Décor Pakistan",
    description: "Premium handcrafted wooden home décor made in Karachi, Pakistan.",
    images: ["/logo/woodrix-logo-dark.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo/favicon.ico",
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Woodrix",
  },
  formatDetection: { telephone: false },
  verification: {
    google: "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground pb-safe">
        {children}
        <BottomNav />
        <SwRegister />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#FBF7F0",
              color: "#2C2218",
              border: "1px solid #D9CFBE",
              boxShadow: "0 8px 32px -10px rgba(44,34,24,0.18)",
            },
          }}
        />
      </body>
    </html>
  );
}
