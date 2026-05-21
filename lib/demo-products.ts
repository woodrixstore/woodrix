export type DemoVariant = {
  id: string;
  size: string;
  finish: string;
  priceModifier: number;
  stock: number;
};

export type DemoProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  basePrice: number;
  description: string;
  images: string[];
  totalStock: number;
  isFeatured: boolean;
  badge?: string;
  variants: { id: string; size: string; finish: string; priceModifier: number; stock: number }[];
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: "demo-1",
    name: "Wooden Serving Tray",
    slug: "wooden-serving-tray",
    category: "Trays",
    basePrice: 2500,
    description:
      "A beautifully handcrafted wooden serving tray — oil-finished for a warm, buttery surface. Perfect as a coffee table centrepiece, breakfast tray, or organiser. Made by skilled artisans in Karachi, Pakistan.",
    images: [
      "/products/wooden-tray/tray-1.png",
      "/products/wooden-tray/tray-2.png",
      "/products/wooden-tray/tray-3.png",
      "/products/wooden-tray/tray-4.png",
      "/products/wooden-tray/tray-5.png",
      "/products/wooden-tray/tray-6.png",
    ],
    totalStock: 15,
    isFeatured: true,
    badge: "Best Seller",
    variants: [
      { id: "d1v1", size: "Small (30cm)", finish: "Natural", priceModifier: 0, stock: 6 },
      { id: "d1v2", size: "Medium (40cm)", finish: "Natural", priceModifier: 500, stock: 5 },
      { id: "d1v3", size: "Large (50cm)", finish: "Natural", priceModifier: 1000, stock: 4 },
    ],
  },
  {
    id: "demo-2",
    name: "Floating Mini Shelf",
    slug: "floating-mini-shelf",
    category: "Shelves",
    basePrice: 1800,
    description:
      "A sleek floating mini shelf with concealed bracket system — holds up to 10 kg while sitting gracefully light on the wall. Ideal for books, plants, and décor. Available in natural and walnut finish.",
    images: [
      "/products/floating-mini-shelf/mini-shelf-1.jpg",
      "/products/floating-mini-shelf/mini-shelf-2.webp",
      "/products/floating-mini-shelf/mini-shelf-3.jpg",
      "/products/floating-mini-shelf/mini-shelf-4.jpg",
      "/products/floating-mini-shelf/mini-shelf-5.jpg",
      "/products/floating-mini-shelf/mini-shelf-6.jpg",
      "/products/floating-mini-shelf/mini-shelf-7.jpg",
      "/products/floating-mini-shelf/mini-shelf-8.jpg",
      "/products/floating-mini-shelf/mini-shelf-9.jpg",
    ],
    totalStock: 20,
    isFeatured: true,
    variants: [
      { id: "d2v1", size: "40cm", finish: "Natural", priceModifier: 0, stock: 8 },
      { id: "d2v2", size: "60cm", finish: "Natural", priceModifier: 400, stock: 7 },
      { id: "d2v3", size: "40cm", finish: "Walnut Stain", priceModifier: 300, stock: 5 },
    ],
  },
  {
    id: "demo-3",
    name: "Floating Book Shelf",
    slug: "floating-book-shelf",
    category: "Shelves",
    basePrice: 3200,
    description:
      "A solid wood floating bookshelf — spacious enough for your favourite reads, elegant enough to anchor any room. Concealed mounting hardware included. Handcrafted in Karachi.",
    images: [
      "/products/floating-book-shelf/book-shelf-1.png",
      "/products/floating-book-shelf/book-shelf-2.png",
      "/products/floating-book-shelf/book-shelf-3.png",
      "/products/floating-book-shelf/book-shelf-4.png",
    ],
    totalStock: 10,
    isFeatured: true,
    badge: "New Arrival",
    variants: [
      { id: "d3v1", size: "80cm", finish: "Natural", priceModifier: 0, stock: 4 },
      { id: "d3v2", size: "100cm", finish: "Natural", priceModifier: 600, stock: 3 },
      { id: "d3v3", size: "80cm", finish: "Walnut Stain", priceModifier: 500, stock: 3 },
    ],
  },
  {
    id: "demo-4",
    name: "Wooden Footrest",
    slug: "wooden-footrest",
    category: "Furniture",
    basePrice: 3500,
    description:
      "A handcrafted wooden footrest with tapered legs and an oil-finished top — strong, warm and beautifully simple. Equally at home beside the sofa or at the foot of the bed. Built to last a lifetime.",
    images: [
      "/products/wooden-footrest/footrest-1.png",
      "/products/wooden-footrest/footrest-2.png",
      "/products/wooden-footrest/footrest-3.png",
      "/products/wooden-footrest/footrest-4.png",
    ],
    totalStock: 8,
    isFeatured: true,
    variants: [
      { id: "d4v1", size: "Standard", finish: "Natural", priceModifier: 0, stock: 4 },
      { id: "d4v2", size: "Standard", finish: "Walnut Stain", priceModifier: 500, stock: 4 },
    ],
  },
  {
    id: "demo-5",
    name: "Wooden Key Holder",
    slug: "wooden-key-holder",
    category: "Decor",
    basePrice: 1200,
    description:
      "A minimalist wall-mounted wooden key holder — neatly organises your keys, bags and small accessories at the entrance. Hand-finished with smooth rounded hooks. A small detail that makes every home feel considered.",
    images: [
      "/products/wooden-key-holder/key-holder-1.png",
      "/products/wooden-key-holder/key-holder-2.png",
      "/products/wooden-key-holder/key-holder-3.png",
      "/products/wooden-key-holder/key-holder-4.png",
    ],
    totalStock: 25,
    isFeatured: true,
    badge: "Popular",
    variants: [
      { id: "d5v1", size: "3 Hooks", finish: "Natural", priceModifier: 0, stock: 10 },
      { id: "d5v2", size: "5 Hooks", finish: "Natural", priceModifier: 300, stock: 8 },
      { id: "d5v3", size: "3 Hooks", finish: "Walnut Stain", priceModifier: 200, stock: 7 },
    ],
  },
  {
    id: "demo-6",
    name: "Floating Laptop Table",
    slug: "floating-laptop-table",
    category: "Furniture",
    basePrice: 4500,
    description:
      "A wall-mounted floating laptop table — folds flat when not in use, unfolds into a clean, sturdy work surface in seconds. Perfect for home offices, study corners, or small apartments. Space-saving, handcrafted, built to last.",
    images: [
      "/products/floating-laptop-table/laptop-table-1.jpeg",
      "/products/floating-laptop-table/laptop-table-2.jpeg",
      "/products/floating-laptop-table/laptop-table-3.jpeg",
      "/products/floating-laptop-table/laptop-table-4.jpeg",
      "/products/floating-laptop-table/laptop-table-5.jpeg",
    ],
    totalStock: 12,
    isFeatured: true,
    badge: "Space Saver",
    variants: [
      { id: "d6v1", size: "60×40cm", finish: "Natural", priceModifier: 0, stock: 5 },
      { id: "d6v2", size: "80×40cm", finish: "Natural", priceModifier: 800, stock: 4 },
      { id: "d6v3", size: "60×40cm", finish: "Walnut Stain", priceModifier: 500, stock: 3 },
    ],
  },
];

export function getDemoProduct(slug: string): DemoProduct | undefined {
  return DEMO_PRODUCTS.find((p) => p.slug === slug);
}
