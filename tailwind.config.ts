import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./emails/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Editorial wood palette per design spec
        background: "#FAF7F2",   // 70% — warm ivory page
        surface: "#F2EDE4",      // 20% — cream cards / panels
        walnut: "#6B4226",       // 8%  — primary CTA, logo, accents
        amber: "#A0622A",        // 2%  — hover-only warm gold
        espresso: "#1C1007",     // text primary
        warmgrey: "#7A6A5A",     // labels / muted text (NEVER cold grey)
        primary: {
          DEFAULT: "#6B4226",
          foreground: "#FAF7F2",
        },
        secondary: {
          DEFAULT: "#F2EDE4",
          foreground: "#1C1007",
        },
        accent: {
          DEFAULT: "#A0622A",
          foreground: "#FAF7F2",
        },
        muted: {
          DEFAULT: "#F2EDE4",
          foreground: "#7A6A5A",
        },
        border: "rgba(107,66,38,0.15)",
        input: "rgba(107,66,38,0.20)",
        ring: "#A0622A",
        foreground: "#1C1007",
        card: {
          DEFAULT: "#F2EDE4",
          foreground: "#1C1007",
        },
        popover: {
          DEFAULT: "#FAF7F2",
          foreground: "#1C1007",
        },
        destructive: {
          DEFAULT: "#B23A2F",
          foreground: "#FAF7F2",
        },
        sand: "#E8DCC8",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-dmsans)", "DM Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      scale: {
        "108": "1.08",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "600": "600ms",
      },
      boxShadow: {
        warm: "0 4px 24px -8px rgba(107, 66, 38, 0.18)",
        "warm-lg": "0 12px 40px -12px rgba(107, 66, 38, 0.28)",
        "warm-sm": "0 2px 10px -4px rgba(107, 66, 38, 0.15)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
