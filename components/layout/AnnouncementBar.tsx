"use client";
import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="bg-primary text-primary-foreground text-xs sm:text-sm">
      <div className="container flex items-center justify-center gap-3 py-2 relative">
        <p className="text-center">
          🚚 Free shipping on orders over PKR 3,000 · Handcrafted Real Wood
        </p>
        <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 opacity-75 hover:opacity-100 transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
