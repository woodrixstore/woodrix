import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    name: "Walnut Wooden Footrest",
    slug: "walnut-wooden-footrest",
    description:
      "An ergonomic handcrafted footrest in solid walnut. Designed for comfort during long working hours, finished with hand-rubbed natural oil that warms with use.",
    basePrice: 2800,
    category: "footrest",
    images: ["https://picsum.photos/seed/wood1/800/800", "https://picsum.photos/seed/wood1b/800/800"],
    isFeatured: true,
    variants: [
      { size: "Small", finish: "Natural", priceModifier: 0, stock: 12 },
      { size: "Medium", finish: "Walnut", priceModifier: 400, stock: 8 },
      { size: "Large", finish: "Ebony", priceModifier: 800, stock: 3 },
    ],
  },
  {
    name: "Acacia Wooden Serving Tray",
    slug: "acacia-wooden-serving-tray",
    description: "Hand-shaped acacia serving tray with carved grips. Food-safe finish.",
    basePrice: 1800,
    category: "trays",
    images: ["https://picsum.photos/seed/wood2/800/800", "https://picsum.photos/seed/wood2b/800/800"],
    isFeatured: true,
    variants: [
      { size: "Small", finish: "Natural", priceModifier: 0, stock: 20 },
      { size: "Medium", finish: "White Oak", priceModifier: 300, stock: 14 },
      { size: "Large", finish: "Walnut", priceModifier: 600, stock: 9 },
    ],
  },
  {
    name: "Floating Wooden Book Shelf",
    slug: "floating-wooden-book-shelf",
    description: "Minimal floating shelf with concealed mounts. Holds up to 12kg.",
    basePrice: 3500,
    category: "shelves",
    images: ["https://picsum.photos/seed/wood3/800/800", "https://picsum.photos/seed/wood3b/800/800"],
    isFeatured: true,
    variants: [
      { size: "Small", finish: "Natural", priceModifier: 0, stock: 10 },
      { size: "Medium", finish: "Walnut", priceModifier: 500, stock: 6 },
      { size: "Large", finish: "Ebony", priceModifier: 1000, stock: 4 },
    ],
  },
  {
    name: "Wooden Key Holder (Wall Mount)",
    slug: "wooden-key-holder-wall-mount",
    description: "Wall-mount key organiser carved from solid wood. Includes brass hooks.",
    basePrice: 1200,
    category: "key-holders",
    images: ["https://picsum.photos/seed/wood4/800/800"],
    variants: [
      { size: "Small", finish: "Natural", priceModifier: 0, stock: 25 },
      { size: "Medium", finish: "Walnut", priceModifier: 200, stock: 18 },
      { size: "Large", finish: "Ebony", priceModifier: 400, stock: 11 },
    ],
  },
  {
    name: "Full Length Wooden Standing Mirror",
    slug: "full-length-wooden-standing-mirror",
    description: "Free-standing full length mirror with a chunky hand-finished wood frame.",
    basePrice: 8500,
    category: "mirrors",
    images: ["https://picsum.photos/seed/wood5/800/800", "https://picsum.photos/seed/wood5b/800/800"],
    isFeatured: true,
    variants: [
      { size: "Medium", finish: "Natural", priceModifier: 0, stock: 5 },
      { size: "Medium", finish: "Walnut", priceModifier: 800, stock: 4 },
      { size: "Large", finish: "Ebony", priceModifier: 1500, stock: 2 },
    ],
  },
  {
    name: "Wooden Floating Dressing Table",
    slug: "wooden-floating-dressing-table",
    description: "Wall-mounted floating dressing table with concealed drawer and integrated mirror.",
    basePrice: 12000,
    category: "dressing",
    images: ["https://picsum.photos/seed/wood6/800/800", "https://picsum.photos/seed/wood6b/800/800"],
    variants: [
      { size: "Small", finish: "Natural", priceModifier: 0, stock: 4 },
      { size: "Medium", finish: "Walnut", priceModifier: 1500, stock: 3 },
      { size: "Large", finish: "White Oak", priceModifier: 3000, stock: 2 },
    ],
  },
  {
    name: "Floating Wooden Laptop Table",
    slug: "floating-wooden-laptop-table",
    description: "Compact floating wall desk perfect for laptops. Includes cable management slot.",
    basePrice: 4200,
    category: "laptop-tables",
    images: ["https://picsum.photos/seed/wood7/800/800", "https://picsum.photos/seed/wood7b/800/800"],
    isFeatured: true,
    variants: [
      { size: "Small", finish: "Natural", priceModifier: 0, stock: 8 },
      { size: "Medium", finish: "Walnut", priceModifier: 500, stock: 5 },
      { size: "Large", finish: "Ebony", priceModifier: 1000, stock: 3 },
    ],
  },
  {
    name: "Hexagonal Wooden Wall Key Organizer",
    slug: "hexagonal-wooden-wall-key-organizer",
    description: "Geometric hexagonal key organiser with brass hooks. Modular — group multiple.",
    basePrice: 1500,
    category: "key-holders",
    images: ["https://picsum.photos/seed/wood8/800/800"],
    variants: [
      { size: "Medium", finish: "Natural", priceModifier: 0, stock: 15 },
      { size: "Medium", finish: "Walnut", priceModifier: 250, stock: 10 },
      { size: "Medium", finish: "Ebony", priceModifier: 500, stock: 6 },
    ],
  },
];

const REVIEW_COMMENTS = [
  "Absolutely stunning piece. The craftsmanship is unreal — feels like a family heirloom already.",
  "Quality is way beyond what I expected. Will be buying more from Woodrix.",
  "Delivered beautifully packaged. The wood grain has so much character.",
  "Built like a tank. Solid, warm, and gorgeous in person.",
  "Best decision for my home — instantly elevated the whole room.",
];

async function main() {
  console.log("🌱 Seeding Woodrix database...");

  // Coupons
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    create: { code: "WELCOME10", discountPercent: 10, maxUses: 100 },
    update: {},
  });
  await prisma.coupon.upsert({
    where: { code: "WOODRIX20" },
    create: { code: "WOODRIX20", discountPercent: 20, maxUses: 50 },
    update: {},
  });

  // Sample users (Supabase Auth must be done separately — these are just DB rows)
  const admin = await prisma.user.upsert({
    where: { email: "admin@woodrix.com" },
    create: { email: "admin@woodrix.com", name: "Woodrix Admin", role: "admin" },
    update: {},
  });
  const customer = await prisma.user.upsert({
    where: { email: "customer@woodrix.com" },
    create: { email: "customer@woodrix.com", name: "Ayesha Khan", role: "customer" },
    update: {},
  });

  // Products + variants + reviews
  for (const p of PRODUCTS) {
    const { variants, ...data } = p;
    const totalStock = variants.reduce((s, v) => s + v.stock, 0);
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      create: { ...data, totalStock, variants: { create: variants } },
      update: { ...data, totalStock },
    });

    // Ensure 3 reviews per product
    const existing = await prisma.review.count({ where: { productId: product.id } });
    if (existing === 0) {
      for (let i = 0; i < 3; i++) {
        await prisma.review.create({
          data: {
            productId: product.id,
            userId: customer.id,
            rating: 4 + (i % 2),
            comment: REVIEW_COMMENTS[(i + p.slug.length) % REVIEW_COMMENTS.length],
          },
        });
      }
    }
  }

  console.log(`✅ Seeded ${PRODUCTS.length} products, 2 users, 2 coupons.`);
  console.log(`   Admin user (DB row only): ${admin.email}`);
  console.log(`   Customer user (DB row only): ${customer.email}`);
  console.log(`\n⚠️  Create the matching auth users in Supabase Dashboard:`);
  console.log(`   admin@woodrix.com / Admin123!  (then set role='admin' in DB)`);
  console.log(`   customer@woodrix.com / Customer123!`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
