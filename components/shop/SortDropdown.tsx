"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "bestseller", label: "Bestseller" },
  { value: "rating", label: "Top Rated" },
];

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const current = sp.get("sort") || "newest";

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(sp.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select value={current} onChange={onChange} className="input-base max-w-[200px] text-sm">
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>Sort: {o.label}</option>
      ))}
    </select>
  );
}
