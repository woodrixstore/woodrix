export const BRAND = {
  name: "Woodrix",
  tagline: "Crafted for the way you live.",
  email: "woodrix.store@gmail.com",
  whatsapp: "+923390065105",
  instagram: "https://instagram.com/woodrix",
  facebook: "https://facebook.com/woodrix",
};

export const CATEGORIES = [
  { slug: "footrest", name: "Footrests", description: "Ergonomic wooden footrests for comfort." },
  { slug: "trays", name: "Serving Trays", description: "Handcrafted wooden serving trays." },
  { slug: "shelves", name: "Floating Shelves", description: "Floating book shelves in real wood." },
  { slug: "key-holders", name: "Key Holders", description: "Wall-mount wooden key organizers." },
  { slug: "mirrors", name: "Standing Mirrors", description: "Full-length wooden mirrors." },
  { slug: "dressing", name: "Dressing Tables", description: "Floating dressing tables." },
  { slug: "laptop-tables", name: "Laptop Tables", description: "Floating wooden laptop desks." },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const WOOD_FINISHES = ["Natural", "Walnut", "Ebony", "White Oak"] as const;
export const SIZES = ["Small", "Medium", "Large"] as const;

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
] as const;

export const ORDER_STATUS_LABELS: Record<(typeof ORDER_STATUSES)[number], string> = {
  pending: "Order Placed",
  confirmed: "Payment Confirmed",
  processing: "Processing",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const SHIPPING = {
  freeThreshold: 3000,
  standardCost: 250,
  expressCost: 500,
};

export const CURRENCY = "PKR";
