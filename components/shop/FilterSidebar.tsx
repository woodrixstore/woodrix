"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, WOOD_FINISHES, SIZES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [category, setCategory] = useState(sp.get("category") || "");
  const [finish, setFinish] = useState(sp.get("finish") || "");
  const [size, setSize] = useState(sp.get("size") || "");
  const [minPrice, setMinPrice] = useState(sp.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(sp.get("maxPrice") || "");
  const [inStock, setInStock] = useState(sp.get("inStock") === "1");
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount = [category, finish, size, minPrice, maxPrice, inStock ? "1" : ""].filter(Boolean).length;

  function apply() {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (finish) params.set("finish", finish);
    if (size) params.set("size", size);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (inStock) params.set("inStock", "1");
    router.push(`${pathname}?${params.toString()}`);
    setMobileOpen(false);
  }

  function reset() {
    setCategory(""); setFinish(""); setSize(""); setMinPrice(""); setMaxPrice(""); setInStock(false);
    router.push(pathname);
    setMobileOpen(false);
  }

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Category</h3>
        <div className="space-y-1.5">
          <button onClick={() => setCategory("")} className={`block text-sm transition ${!category ? "text-accent font-medium" : "text-espresso hover:text-accent"}`}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.slug} onClick={() => setCategory(c.slug)} className={`block text-sm transition ${category === c.slug ? "text-accent font-medium" : "text-espresso hover:text-accent"}`}>{c.name}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Wood Finish</h3>
        <div className="flex flex-wrap gap-2">
          {WOOD_FINISHES.map((f) => (
            <button key={f} onClick={() => setFinish(finish === f ? "" : f)} className={`text-xs px-3 py-1.5 rounded-full border transition ${finish === f ? "bg-primary text-primary-foreground border-primary" : "border-sand text-espresso hover:border-accent"}`}>{f}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Size</h3>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map((s) => (
            <button key={s} onClick={() => setSize(size === s ? "" : s)} className={`text-xs px-3 py-1.5 rounded-full border transition ${size === s ? "bg-primary text-primary-foreground border-primary" : "border-sand text-espresso hover:border-accent"}`}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Price (PKR)</h3>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="input-base text-xs" />
          <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="input-base text-xs" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-primary" />
        <span>In stock only</span>
      </label>
      <div className="space-y-2 pt-4 border-t border-sand">
        <Button onClick={apply} className="w-full">Apply Filters</Button>
        <Button onClick={reset} variant="ghost" className="w-full">Reset</Button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile: toggle button only ── */}
      <div className="lg:hidden flex items-center gap-3 mb-1">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-espresso border border-sand rounded-lg px-4 py-2 hover:border-accent transition"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">{activeCount}</span>
          )}
        </button>
        {activeCount > 0 && (
          <button onClick={reset} className="text-xs text-muted-foreground hover:text-accent underline transition">Clear all</button>
        )}
      </div>

      {/* ── Mobile: bottom sheet overlay ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-espresso/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative bg-background rounded-t-2xl p-6 max-h-[82vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl text-espresso">Filters</h2>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded-md hover:bg-surface transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* ── Desktop: always-visible sticky sidebar ── */}
      <aside className="hidden lg:block space-y-6 sticky top-24">
        {filterContent}
      </aside>
    </>
  );
}
