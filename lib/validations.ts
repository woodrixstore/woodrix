import { z } from "zod";

export const emailSchema = z.string().email("Enter a valid email address");
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must include an uppercase letter")
  .regex(/[0-9]/, "Must include a number");

export const pakistaniPhoneSchema = z
  .string()
  .regex(/^\+92\d{10}$/, "Use +92 format, e.g. +923001234567");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: emailSchema,
  password: passwordSchema,
});

export const contactStepSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: emailSchema,
  phone: pakistaniPhoneSchema,
});

export const shippingStepSchema = z.object({
  line1: z.string().min(3, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State / Province is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().default("Pakistan"),
  shippingMethod: z.enum(["standard", "express"]),
  saveAddress: z.boolean().optional(),
});

export const addressSchema = z.object({
  name: z.string().min(2),
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().default("Pakistan"),
  isDefault: z.boolean().optional(),
});

export const reviewSchema = z.object({
  productId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5, "Please write at least 5 characters"),
});

export const newsletterSchema = z.object({ email: emailSchema });

export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: emailSchema,
  subject: z.string().min(3),
  message: z.string().min(10),
});

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  basePrice: z.number().positive(),
  category: z.string().min(2),
  images: z.array(z.string().url()).min(1),
  isFeatured: z.boolean().default(false),
  totalStock: z.number().int().nonnegative().default(0),
  variants: z
    .array(
      z.object({
        size: z.string(),
        finish: z.string(),
        priceModifier: z.number().default(0),
        stock: z.number().int().nonnegative().default(0),
      }),
    )
    .default([]),
});

export const couponSchema = z.object({
  code: z.string().min(3).toUpperCase(),
  discountPercent: z.number().min(1).max(100),
  maxUses: z.number().int().min(1),
  expiresAt: z.string().datetime().optional(),
});

export const cartAddSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(1).max(99),
});

export const checkoutSchema = z.object({
  contact: contactStepSchema,
  shipping: shippingStepSchema,
  couponCode: z.string().optional(),
});
