"use client";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Something broke</p>
        <h1 className="font-serif text-5xl text-espresso mb-3">We hit a knot.</h1>
        <p className="text-muted-foreground mb-8">{error.message || "An unexpected error occurred."}</p>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
