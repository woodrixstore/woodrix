"use client";
import { useEffect } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

export function ClearCartOnMount() {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}

export function CopyButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(id);
        toast.success("Order number copied");
      }}
      className="flex items-center gap-1.5 text-xs text-accent hover:text-primary"
    >
      <Copy className="h-3 w-3" /> Copy
    </button>
  );
}
