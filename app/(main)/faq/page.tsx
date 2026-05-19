import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata = { title: "FAQ" };

const SECTIONS = [
  {
    title: "Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard 5–7 business days across Pakistan. Express in 2–3 days." },
      { q: "Is shipping free?", a: "Free standard shipping on orders over PKR 3,000." },
    ],
  },
  {
    title: "Returns",
    items: [
      { q: "What is your return policy?", a: "We offer 7-day no-questions-asked returns on unused pieces in original packaging." },
      { q: "How do refunds work?", a: "Refunds are processed within 5 business days after we receive the returned item." },
    ],
  },
  {
    title: "Product Care",
    items: [
      { q: "How do I care for the wood?", a: "Wipe with a soft dry cloth. Re-oil annually with food-safe mineral oil." },
      { q: "Can I use water?", a: "Avoid prolonged exposure. Wipe up spills quickly to maintain finish." },
    ],
  },
  {
    title: "Payments",
    items: [
      { q: "What payment methods do you accept?", a: "All major credit/debit cards via secure Stripe checkout." },
      { q: "Is payment secure?", a: "Yes — all payments are encrypted end-to-end by Stripe. We never see your card details." },
    ],
  },
  {
    title: "Custom Orders",
    items: [
      { q: "Do you take custom orders?", a: "Yes — email hello@woodrix.com with your idea and we'll quote you." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="container max-w-3xl py-16">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">FAQ</p>
        <h1 className="font-serif text-5xl text-espresso">Questions, answered.</h1>
      </div>
      {SECTIONS.map((s) => (
        <div key={s.title} className="mb-10">
          <h2 className="font-serif text-2xl text-espresso mb-3">{s.title}</h2>
          <Accordion type="single" collapsible className="border-t border-sand">
            {s.items.map((it, i) => (
              <AccordionItem key={i} value={`${s.title}-${i}`}>
                <AccordionTrigger>{it.q}</AccordionTrigger>
                <AccordionContent>{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
