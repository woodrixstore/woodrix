"use client";
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StripePaymentForm({ orderId }: { orderId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function onPay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/success?orderId=${orderId}`,
      },
    });
    if (error) {
      toast.error(error.message || "Payment failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onPay} className="space-y-5">
      <PaymentElement options={{ layout: "tabs" }} />
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" /> Secure payment processed by Stripe
      </div>
      <Button type="submit" disabled={loading || !stripe} className="w-full" size="lg">
        {loading ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
}
