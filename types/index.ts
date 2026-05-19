import type {
  Product as PrismaProduct,
  ProductVariant,
  Order,
  OrderItem,
  Review,
  User,
  Address,
} from "@prisma/client";

export type ProductWithVariants = PrismaProduct & {
  variants: ProductVariant[];
};

export type ProductWithRelations = PrismaProduct & {
  variants: ProductVariant[];
  reviews: Review[];
};

export type OrderWithItems = Order & {
  items: (OrderItem & { product: PrismaProduct })[];
};

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
  role: "customer" | "admin";
  avatarUrl?: string | null;
};

export type CartLine = {
  id: string;
  productId: string;
  variantId?: string | null;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  finish?: string;
};

export type { PrismaProduct as Product, ProductVariant, Order, OrderItem, Review, User, Address };
