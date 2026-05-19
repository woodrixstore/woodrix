import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">404</p>
        <h1 className="font-serif text-5xl text-espresso mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8">This page seems to have wandered off. Let's get you back home.</p>
        <Button asChild><Link href="/">Back to Home</Link></Button>
      </div>
    </div>
  );
}
