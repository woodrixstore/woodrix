import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { BRAND } from "@/lib/constants";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "Premium handcrafted wooden home décor — trays, shelves, mirrors, dressing tables and more. Built to last a lifetime.",
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Premium handcrafted wooden home décor — trays, shelves, mirrors, dressing tables and more.",
    type: "website",
    siteName: BRAND.name,
    images: ["/logo/woodrix-logo-dark.png"],
  },
  icons: { icon: "/logo/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
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
