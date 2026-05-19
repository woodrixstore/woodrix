"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

const STEPS = ["pending", "confirmed", "processing", "packed", "shipped", "out_for_delivery", "delivered"] as const;

export function OrderTimeline({ status }: { status: string }) {
  const currentIdx = STEPS.indexOf(status as any);
  return (
    <div className="grid lg:grid-cols-7 gap-2 lg:gap-0">
      {STEPS.map((s, i) => {
        const done = i < currentIdx;
        const current = i === currentIdx;
        return (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex lg:flex-col items-center gap-3 lg:gap-2 relative"
          >
            <div
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center shrink-0 text-xs font-medium relative z-10",
                done && "bg-accent text-primary-foreground",
                current && "bg-primary text-primary-foreground ring-4 ring-primary/20 animate-pulse",
                !done && !current && "bg-surface border border-sand text-muted-foreground",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <p className={cn("text-xs text-center", (done || current) ? "text-espresso font-medium" : "text-muted-foreground")}>
              {ORDER_STATUS_LABELS[s]}
            </p>
            {i < STEPS.length - 1 && (
              <div className={cn(
                "hidden lg:block absolute top-4 left-1/2 right-0 h-px",
                done ? "bg-accent" : "bg-sand",
              )} style={{ width: "100%" }} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
