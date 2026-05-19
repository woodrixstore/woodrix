# WOODRIX

> Crafted for the way you live.

A premium, production-ready full-stack e-commerce platform for **Woodrix** — a wooden home décor brand. Built with Next.js 14, TypeScript, Tailwind, Prisma + Supabase, Stripe, Resend, and Three.js.

---

## ✨ Features

- **Light-luxury design system** (Aesop × RH inspired) with warm wood tones
- **Three.js 3D hero** — floating wooden plank/tray/cube with procedural wood-grain material and warm amber lighting
- **Catalog** with filters (category, finish, size, price, in-stock), sort, and search
- **Product detail** with image gallery, variant selectors (size/finish), reviews, related products
- **Slide-out cart drawer** with free-shipping progress, persisted to localStorage
- **3-step Stripe checkout** with Payment Intents + webhook flow
- **Order tracking** with animated timeline (Order placed → Delivered)
- **User dashboard** — orders, addresses, wishlist, profile
- **Admin panel** — dashboard stats, products, orders, customers, coupons
- **Auth** — Supabase email/password + Google OAuth, password reset, email verification
- **Email** templates (welcome, order confirmation, shipped, password reset, contact) via Resend + React Email
- **Pakistani Rupee (PKR)** formatting + `+92` phone validation throughout
- Fully **mobile-responsive**, every page with proper SEO metadata

---

## 🛠 Tech Stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + custom shadcn-style primitives |
| Database | Supabase Postgres + Prisma ORM |
| Auth | Supabase Auth (email + Google) |
| Payments | Stripe Payment Intents + webhooks |
| Email | Resend + React Email |
| 3D | Three.js (dynamically imported, no SSR) |
| Animation | Framer Motion |
| Validation | Zod |
| State | Zustand (cart, wishlist) |
| Toast | Sonner |
| Deployment | Vercel-ready |

---

## 🎨 Brand System

| Token | Value |
| --- | --- |
| Background | `#FAF7F2` warm ivory |
| Surface | `#F2EDE4` soft cream |
| Primary | `#6B4226` walnut brown |
| Secondary | `#C4A882` muted tan |
| Accent | `#A0622A` amber gold |
| Text | `#1C1007` rich espresso |
| Border | `#E0D5C5` light sand |

**Fonts** (Google Fonts, loaded via `next/font`):
- Headings — Cormorant Garamond
- Subheadings — DM Serif Display
- Body — DM Sans

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Required keys:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — from your Supabase project
- `DATABASE_URL`, `DIRECT_URL` — Supabase Postgres connection strings
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` — from Stripe dashboard (test mode)
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` — from Resend
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` for dev

### 3. Push the database schema

```bash
npx prisma db push
npx prisma generate
```

### 4. Seed the database

```bash
npm run seed
```

This creates 8 products with variants, 3 reviews each, 2 coupons (`WELCOME10`, `WOODRIX20`), and admin/customer user rows.

⚠️ **Important**: You also need to create the matching Supabase Auth users in the dashboard:
- `admin@woodrix.com` / `Admin123!` — then update the role in DB: `UPDATE "User" SET role='admin' WHERE email='admin@woodrix.com';`
- `customer@woodrix.com` / `Customer123!`

The user IDs must match between Supabase Auth and the Prisma `User` table. The `/api/auth/callback` route handles this automatically on first sign-in.

### 5. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000>.

---

## 🔌 Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com).
2. Grab the URL, anon key, and service role key from **Project Settings → API**.
3. Get the Postgres connection string from **Project Settings → Database** (use the **Connection Pooler** URL for `DATABASE_URL` and the direct URL for `DIRECT_URL`).
4. Enable **Google OAuth** under **Authentication → Providers** and set the redirect URL to `<NEXT_PUBLIC_SITE_URL>/api/auth/callback`.
5. (Optional) Create a public Storage bucket called `product-images` for admin product image uploads.

---

## 💳 Stripe Setup

1. Create a Stripe account and grab **test** keys.
2. For local webhook testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Copy the `whsec_...` secret into `STRIPE_WEBHOOK_SECRET`.
3. Trigger an event manually: `stripe trigger payment_intent.succeeded`.
4. Test card: `4242 4242 4242 4242`, any future expiry, any CVV.

The webhook listens for:
- `payment_intent.succeeded` → marks the order as `confirmed` and sends a confirmation email.
- `payment_intent.payment_failed` → marks order as `cancelled`.

---

## 📨 Resend Setup

1. Sign up at [resend.com](https://resend.com) and verify your sending domain.
2. Add the API key to `RESEND_API_KEY` and a verified sender (e.g. `orders@woodrix.com`) to `RESEND_FROM_EMAIL`.
3. Preview emails locally with `npm run email:dev`.

---

## 🚢 Deploying to Vercel

1. Push the repo to GitHub.
2. Import into Vercel.
3. Add **all** environment variables from `.env.local` (use Production scope).
4. After first deploy, run database migrations from your local machine pointing at the production DB (or use `npx prisma migrate deploy`).
5. Update the Stripe webhook endpoint to point at `https://<your-domain>/api/webhooks/stripe`.
6. Update Supabase Auth allowed redirect URLs to include your production domain.

`vercel.json` is pre-configured with the correct build command (`prisma generate && next build`) and region (`sin1` for South Asia latency).

---

## 📁 Project Structure

```
app/
  (auth)/           - login, signup, forgot-password, reset-password
  (main)/           - homepage, about, contact, faq, legal pages
  (shop)/           - /shop, /shop/[slug], /shop/category/[category]
  (checkout)/       - checkout, order success
  (user)/           - dashboard, orders, profile, wishlist, addresses
  (tracking)/       - public order tracking /orders/[id]
  (admin)/          - admin dashboard, products, orders, customers, coupons
  api/              - REST API route handlers
components/
  ui/               - Button, Input, Dialog, Accordion, Badge, etc.
  layout/           - Navbar, Footer, AnnouncementBar
  home/             - HeroSection, CategoryShowcase, Bestsellers, etc.
  shop/             - ProductCard, FilterSidebar, SortDropdown
  product/          - ImageGallery, ProductBuy (variants), ReviewSection
  cart/             - CartDrawer
  checkout/         - CheckoutClient, StripePaymentForm
  tracking/         - OrderTimeline
  admin/            - AdminSidebar
  auth/             - AuthForms
  three/            - HeroScene (dynamic, ssr:false)
  common/           - PriceDisplay, EmptyState, LoadingSkeleton, ContactForm
emails/             - React Email templates
hooks/              - useCart, useWishlist, useScrollPosition, useDebounce
lib/                - prisma, stripe, resend, validations, constants, formatters, utils
  supabase/         - client.ts, server.ts (with requireAdmin helper)
prisma/             - schema.prisma, seed.ts
public/
  logo/             - woodrix-logo-dark.svg, woodrix-logo-light.svg
  textures/         - grain-overlay.svg
types/              - shared TS types
middleware.ts       - protects /dashboard/* and /admin/*
```

---

## 🧪 Testing the Flow

1. Browse `/shop`, filter by category, open a product, pick a variant, add to cart.
2. Cart drawer slides in from the right with free-shipping progress.
3. Hit checkout, fill in contact + shipping (use `+923001234567` for phone), pay with test card `4242 4242 4242 4242`.
4. Land on success page with order number → track order via animated timeline.
5. Sign up / sign in → see your order in `/dashboard`.
6. Log in as admin (role = `admin` in DB) → manage products, orders, customers, coupons.

---

## 🔐 Security Notes

- Stripe webhook signature is verified using `STRIPE_WEBHOOK_SECRET`.
- All admin API routes use `requireAdmin()` server-side — returns 403 if not admin.
- Cart prices are recomputed server-side at checkout (never trusted from client).
- Zod validates every API input and every form submission.
- Supabase service role key is **server-only** and never exposed to the browser.

---

## 📜 License

© 2025 Woodrix. All rights reserved.
