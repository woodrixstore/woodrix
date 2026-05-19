"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import { formatPKR } from "@/lib/formatters";
import { SHIPPING } from "@/lib/constants";
import { cn } from "@/lib/utils";

const BANK_INFO = `Bank Name: Meezan Bank
Account Title: WOODRIX
Account Number: 9110011234567
IBAN: PK31MEZN0099110011234567

Please make a 30% advance payment to confirm your order.
Send payment screenshot to WhatsApp: +92-300-1234567
"You will be reverted back between 11AM–12PM"`;

type PaymentMethod = "cod" | "bank";

export function CheckoutClient() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clearCart = useCart((s) => s.clear);

  const [form, setForm] = useState({
    email: "", newsOffers: false,
    firstName: "", lastName: "",
    address: "", apt: "",
    city: "", postalCode: "",
    phone: "",
    saveInfo: false,
    textOffers: false,
  });
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [billingSame, setBillingSame] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const shippingCost = useMemo(
    () => subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.standardCost,
    [subtotal]
  );
  const total = subtotal + shippingCost;

  useEffect(() => {
    if (items.length === 0) router.replace("/shop");
  }, [items.length, router]);

  function field(key: keyof typeof form) {
    return {
      value: form[key] as string,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.firstName || !form.address || !form.city || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    clearCart();
    router.push("/order/success?demo=1");
    setSubmitting(false);
  }

  return (
    <div className="bg-background min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-[1fr_440px] min-h-screen">

          {/* ── Left: form ── */}
          <div className="px-6 lg:px-16 py-12 space-y-10 border-r border-walnut/10">

            {/* Contact */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-[22px] text-espresso font-bold">Contact</h2>
                <a href="/login" className="text-[12px] text-amber hover:underline">Sign in</a>
              </div>
              <div className="space-y-3">
                <input {...field("email")} type="email" placeholder="Email" required
                  className="w-full border border-walnut/20 rounded-lg px-4 py-3 text-[14px] text-espresso placeholder:text-warmgrey/60 focus:outline-none focus:border-walnut bg-background" />
                <label className="flex items-center gap-2 text-[13px] text-warmgrey cursor-pointer">
                  <input type="checkbox" checked={form.newsOffers} onChange={(e) => setForm(f => ({ ...f, newsOffers: e.target.checked }))}
                    className="rounded border-walnut/30 text-walnut" />
                  Email me with news and offers
                </label>
              </div>
            </section>

            {/* Delivery */}
            <section>
              <h2 className="font-display text-[22px] text-espresso font-bold mb-5">Delivery</h2>
              <div className="space-y-3">
                <div className="w-full border border-walnut/20 rounded-lg px-4 py-3 text-[14px] text-espresso bg-surface flex justify-between items-center">
                  <span>Pakistan</span>
                  <svg className="h-4 w-4 text-warmgrey" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input {...field("firstName")} placeholder="First name" required
                    className="border border-walnut/20 rounded-lg px-4 py-3 text-[14px] text-espresso placeholder:text-warmgrey/60 focus:outline-none focus:border-walnut bg-background" />
                  <input {...field("lastName")} placeholder="Last name"
                    className="border border-walnut/20 rounded-lg px-4 py-3 text-[14px] text-espresso placeholder:text-warmgrey/60 focus:outline-none focus:border-walnut bg-background" />
                </div>
                <input {...field("address")} placeholder="Address" required
                  className="w-full border border-walnut/20 rounded-lg px-4 py-3 text-[14px] text-espresso placeholder:text-warmgrey/60 focus:outline-none focus:border-walnut bg-background" />
                <input {...field("apt")} placeholder="Apartment, suite, etc. (optional)"
                  className="w-full border border-walnut/20 rounded-lg px-4 py-3 text-[14px] text-espresso placeholder:text-warmgrey/60 focus:outline-none focus:border-walnut bg-background" />
                <div className="grid grid-cols-2 gap-3">
                  <input {...field("city")} placeholder="City" required
                    className="border border-walnut/20 rounded-lg px-4 py-3 text-[14px] text-espresso placeholder:text-warmgrey/60 focus:outline-none focus:border-walnut bg-background" />
                  <input {...field("postalCode")} placeholder="Postal code (optional)"
                    className="border border-walnut/20 rounded-lg px-4 py-3 text-[14px] text-espresso placeholder:text-warmgrey/60 focus:outline-none focus:border-walnut bg-background" />
                </div>
                <input {...field("phone")} type="tel" placeholder="Phone" required
                  className="w-full border border-walnut/20 rounded-lg px-4 py-3 text-[14px] text-espresso placeholder:text-warmgrey/60 focus:outline-none focus:border-walnut bg-background" />
                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 text-[13px] text-warmgrey cursor-pointer">
                    <input type="checkbox" checked={form.saveInfo} onChange={(e) => setForm(f => ({ ...f, saveInfo: e.target.checked }))}
                      className="rounded border-walnut/30 text-walnut" />
                    Save this information for next time
                  </label>
                  <label className="flex items-center gap-2 text-[13px] text-warmgrey cursor-pointer">
                    <input type="checkbox" checked={form.textOffers} onChange={(e) => setForm(f => ({ ...f, textOffers: e.target.checked }))}
                      className="rounded border-walnut/30 text-walnut" />
                    Text me with news and offers
                  </label>
                </div>
              </div>
            </section>

            {/* Shipping method */}
            <section>
              <h2 className="font-display text-[22px] text-espresso font-bold mb-5">Shipping method</h2>
              <div className="border border-walnut/20 rounded-lg px-5 py-4 flex items-center justify-between bg-surface">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full border-2 border-walnut bg-walnut flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-background" />
                  </div>
                  <span className="text-[14px] font-medium text-espresso">FLAT SHIPPING</span>
                </div>
                <span className="text-[14px] font-semibold text-espresso tabular-nums">
                  {shippingCost === 0 ? "Free" : `Rs ${shippingCost.toLocaleString()}`}
                </span>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-display text-[22px] text-espresso font-bold mb-2">Payment</h2>
              <p className="text-[12px] text-emerald-700 mb-4">All transactions are secure and encrypted.</p>
              <div className="space-y-3">
                {/* COD */}
                <div
                  className={cn("border rounded-lg overflow-hidden transition-all", payment === "cod" ? "border-walnut" : "border-walnut/20")}
                >
                  <button type="button" onClick={() => setPayment("cod")}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface/50 transition">
                    <div className={cn("h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center transition",
                      payment === "cod" ? "border-walnut" : "border-walnut/30")}>
                      {payment === "cod" && <div className="h-2 w-2 rounded-full bg-walnut" />}
                    </div>
                    <span className="text-[14px] font-medium text-espresso">Cash on Delivery (COD)</span>
                  </button>
                  {payment === "cod" && (
                    <div className="px-5 pb-5 pt-2 text-[13px] text-warmgrey leading-relaxed bg-surface/40 border-t border-walnut/10 whitespace-pre-line">
                      {BANK_INFO}
                    </div>
                  )}
                </div>

                {/* Bank Deposit */}
                <div
                  className={cn("border rounded-lg overflow-hidden transition-all", payment === "bank" ? "border-walnut" : "border-walnut/20")}
                >
                  <button type="button" onClick={() => setPayment("bank")}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface/50 transition">
                    <div className={cn("h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center transition",
                      payment === "bank" ? "border-walnut" : "border-walnut/30")}>
                      {payment === "bank" && <div className="h-2 w-2 rounded-full bg-walnut" />}
                    </div>
                    <span className="text-[14px] font-medium text-espresso">Bank Deposit</span>
                  </button>
                  {payment === "bank" && (
                    <div className="px-5 pb-5 pt-2 text-[13px] text-warmgrey leading-relaxed bg-surface/40 border-t border-walnut/10 whitespace-pre-line">
                      {BANK_INFO}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Billing address */}
            <section>
              <h2 className="font-display text-[22px] text-espresso font-bold mb-4">Billing address</h2>
              <div className="space-y-3">
                <label className={cn("flex items-center gap-3 border rounded-lg px-5 py-4 cursor-pointer transition",
                  billingSame ? "border-walnut bg-surface/40" : "border-walnut/20")}>
                  <div className={cn("h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center",
                    billingSame ? "border-walnut" : "border-walnut/30")}>
                    {billingSame && <div className="h-2 w-2 rounded-full bg-walnut" />}
                  </div>
                  <input type="radio" className="sr-only" checked={billingSame} onChange={() => setBillingSame(true)} />
                  <span className="text-[14px] text-espresso">Same as shipping address</span>
                </label>
                <label className={cn("flex items-center gap-3 border rounded-lg px-5 py-4 cursor-pointer transition",
                  !billingSame ? "border-walnut bg-surface/40" : "border-walnut/20")}>
                  <div className={cn("h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center",
                    !billingSame ? "border-walnut" : "border-walnut/30")}>
                    {!billingSame && <div className="h-2 w-2 rounded-full bg-walnut" />}
                  </div>
                  <input type="radio" className="sr-only" checked={!billingSame} onChange={() => setBillingSame(false)} />
                  <span className="text-[14px] text-espresso">Use a different billing address</span>
                </label>
              </div>
            </section>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-espresso text-background py-4 rounded-xl text-[15px] font-medium tracking-wide hover:bg-walnut transition-colors duration-300 disabled:opacity-60"
            >
              {submitting ? "Placing order…" : "Complete order"}
            </button>
          </div>

          {/* ── Right: order summary ── */}
          <aside className="bg-surface px-6 lg:px-10 py-12 space-y-6 border-l border-walnut/10">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-background ring-1 ring-walnut/10">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    <span className="absolute -top-1.5 -right-1.5 bg-walnut text-background text-[10px] font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-espresso truncate">{item.name}</p>
                    {(item.size || item.finish) && (
                      <p className="text-[11px] text-warmgrey">{[item.size, item.finish].filter(Boolean).join(" / ")}</p>
                    )}
                  </div>
                  <p className="text-[13px] font-medium text-espresso tabular-nums shrink-0">{formatPKR(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-walnut/15 pt-5 space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-warmgrey">Subtotal</span>
                <span className="text-espresso tabular-nums">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-warmgrey flex items-center gap-1">
                  Shipping
                  <span className="text-[10px] border border-walnut/20 rounded px-1 text-warmgrey">ⓘ</span>
                </span>
                <span className="text-espresso tabular-nums">
                  {shippingCost === 0 ? "Free" : `Rs ${shippingCost.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-[16px] pt-2 border-t border-walnut/15">
                <span className="text-espresso">Total</span>
                <span className="text-warmgrey text-[12px] self-end pb-0.5 mr-1">PKR</span>
                <span className="text-espresso tabular-nums">{formatPKR(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
