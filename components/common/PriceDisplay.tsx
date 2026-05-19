import { formatPKR } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function PriceDisplay({ amount, className }: { amount: number; className?: string }) {
  return <span className={cn("font-medium tabular-nums text-espresso", className)}>{formatPKR(amount)}</span>;
}
