"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error();
      toast.success("Welcome to the Woodrix community!");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="bg-surface rounded-lg px-6 py-16 lg:py-20 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Newsletter</p>
          <h2 className="font-serif text-3xl lg:text-5xl text-espresso mb-4">
            Join the Woodrix Community
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Get 10% off your first order + exclusive launch updates.
          </p>
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
