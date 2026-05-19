"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type Review = { id: string; rating: number; comment: string; createdAt: Date | string; user: { name: string | null } };

export function ReviewSection({ productId, reviews }: { productId: string; reviews: Review[] }) {
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    pct: reviews.length ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      const r = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });
      if (!r.ok) throw new Error();
      toast.success("Review posted");
      setOpen(false);
      setComment("");
    } catch {
      toast.error("Sign in to leave a review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border-t border-sand pt-12 mt-12">
      <div className="grid lg:grid-cols-[300px_1fr] gap-10">
        <div>
          <h2 className="font-serif text-3xl text-espresso mb-4">Reviews</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-4xl font-serif tabular-nums">{avg.toFixed(1)}</span>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.round(avg) ? "fill-accent text-accent" : "text-sand")} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{reviews.length} reviews</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {breakdown.map(({ star, pct }) => (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-3">{star}</span>
                <Star className="h-3 w-3 fill-accent text-accent" />
                <div className="flex-1 h-1.5 bg-sand rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right tabular-nums">{Math.round(pct)}%</span>
              </div>
            ))}
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mt-6 w-full" variant="outline">Write a Review</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share your experience</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setRating(n)}>
                        <Star className={cn("h-6 w-6 transition", n <= rating ? "fill-accent text-accent" : "text-sand")} />
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  placeholder="Tell us about your purchase..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button onClick={submit} disabled={loading || comment.length < 5} className="w-full">
                  {loading ? "Posting..." : "Post Review"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          {reviews.length === 0 && (
            <p className="text-muted-foreground">Be the first to review this piece.</p>
          )}
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-sand pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-full bg-secondary/40 flex items-center justify-center font-medium text-espresso text-sm">
                  {(r.user.name || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{r.user.name || "Verified Customer"}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-3.5 w-3.5", i < r.rating ? "fill-accent text-accent" : "text-sand")} />
                ))}
              </div>
              <p className="text-sm text-espresso/90 leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
