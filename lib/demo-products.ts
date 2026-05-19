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
    name: "Walnut Serving Tray",
    slug: "walnut-serving-tray",
    category: "Trays",
    basePrice: 12500,
    description:
      "A beautifully turned serving tray crafted from solid walnut. Hand-finished with natural oil for a buttery, warm surface. Perfect as a coffee table centrepiece or breakfast tray.",
    images: [
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
    ],
    totalStock: 12,
    isFeatured: true,
    badge: "Best Seller",
    variants: [
      { id: "d1v1", size: "Small (30cm)", finish: "Natural", priceModifier: 0, stock: 5 },
      { id: "d1v2", size: "Medium (40cm)", finish: "Natural", priceModifier: 1500, stock: 4 },
      { id: "d1v3", size: "Small (30cm)", finish: "Walnut", priceModifier: 500, stock: 3 },
      { id: "d1v4", size: "Medium (40cm)", finish: "Walnut", priceModifier: 2000, stock: 2 },
    ],
  },
  {
    id: "demo-2",
    name: "Oak Floating Shelf",
    slug: "oak-floating-shelf",
    category: "Shelves",
    basePrice: 9500,
    description:
      "A solid oak floating shelf with a hidden bracket system. Graceful in proportion, strong in structure — it holds up to 15 kg while looking effortlessly light on the wall.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
    ],
    totalStock: 8,
    isFeatured: true,
    variants: [
      { id: "d2v1", size: "60cm", finish: "Natural", priceModifier: 0, stock: 3 },
      { id: "d2v2", size: "90cm", finish: "Natural", priceModifier: 2000, stock: 2 },
      { id: "d2v3", size: "60cm", finish: "Walnut", priceModifier: 800, stock: 2 },
      { id: "d2v4", size: "90cm", finish: "Walnut", priceModifier: 2800, stock: 1 },
    ],
  },
  {
    id: "demo-3",
    name: "Teak Footrest Stool",
    slug: "teak-footrest-stool",
    category: "Furniture",
    basePrice: 18500,
    description:
      "A handcrafted teak footrest with tapered legs and an oil-finished top. Strong, warm and beautifully simple — equally at home beside the sofa or at the foot of the bed.",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
    ],
    totalStock: 6,
    isFeatured: true,
    badge: "New Arrival",
    variants: [
      { id: "d3v1", size: "Standard", finish: "Teak Natural", priceModifier: 0, stock: 3 },
      { id: "d3v2", size: "Standard", finish: "Ebony", priceModifier: 2000, stock: 2 },
      { id: "d3v3", size: "Large", finish: "Teak Natural", priceModifier: 3000, stock: 1 },
    ],
  },
  {
    id: "demo-4",
    name: "Walnut Standing Mirror",
    slug: "walnut-standing-mirror",
    category: "Mirrors",
    basePrice: 32000,
    description:
      "A full-length standing mirror in a solid walnut frame. The proportions are considered, the joinery is honest, and the finish is buttery. An heirloom piece made in Pakistan.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop",
    ],
    totalStock: 3,
    isFeatured: true,
    badge: "Only 3 Left",
    variants: [
      { id: "d4v1", size: "160 × 50cm", finish: "Walnut", priceModifier: 0, stock: 2 },
      { id: "d4v2", size: "180 × 60cm", finish: "Walnut", priceModifier: 5000, stock: 1 },
    ],
  },
  {
    id: "demo-5",
    name: "Mango Wood Bowl",
    slug: "mango-wood-bowl",
    category: "Decor",
    basePrice: 6500,
    description:
      "A hand-turned bowl in mango wood — each piece unique in grain and colour. Use it for fruit, keys, or simply as a warm presence on any surface.",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
    ],
    totalStock: 15,
    isFeatured: false,
    variants: [
      { id: "d5v1", size: "Small", finish: "Natural", priceModifier: 0, stock: 8 },
      { id: "d5v2", size: "Large", finish: "Natural", priceModifier: 2000, stock: 7 },
    ],
  },
  {
    id: "demo-6",
    name: "Acacia Wood Cheese Board",
    slug: "acacia-cheese-board",
    category: "Trays",
    basePrice: 8500,
    description:
      "A generously sized acacia cheese board with juice groove and integrated handle. Hand-oiled and ready to use. A thoughtful gift and a daily pleasure.",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
    ],
    totalStock: 20,
    isFeatured: false,
    variants: [
      { id: "d6v1", size: "Standard", finish: "Acacia Natural", priceModifier: 0, stock: 20 },
    ],
  },
  {
    id: "demo-7",
    name: "Sheesham Bedside Table",
    slug: "sheesham-bedside-table",
    category: "Furniture",
    basePrice: 22000,
    description:
      "A solid sheesham bedside table with a single drawer and open shelf. The grain is naturally rich — no two tables are exactly alike.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
    ],
    totalStock: 5,
    isFeatured: false,
    badge: "Handmade",
    variants: [
      { id: "d7v1", size: "Standard", finish: "Natural", priceModifier: 0, stock: 3 },
      { id: "d7v2", size: "Standard", finish: "Walnut Stain", priceModifier: 2500, stock: 2 },
    ],
  },
  {
    id: "demo-8",
    name: "Driftwood Wall Art",
    slug: "driftwood-wall-art",
    category: "Decor",
    basePrice: 14000,
    description:
      "A hand-assembled driftwood wall piece — each element collected, cleaned and arranged by our craftsmen. Raw, organic and quietly beautiful.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
    ],
    totalStock: 4,
    isFeatured: false,
    variants: [
      { id: "d8v1", size: "60 × 40cm", finish: "Raw", priceModifier: 0, stock: 2 },
      { id: "d8v2", size: "90 × 60cm", finish: "Raw", priceModifier: 4000, stock: 2 },
    ],
  },
];

export function getDemoProduct(slug: string): DemoProduct | undefined {
  return DEMO_PRODUCTS.find((p) => p.slug === slug);
}
