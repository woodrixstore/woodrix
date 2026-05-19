export const metadata = { title: "Returns" };

export default function ReturnsPage() {
  return (
    <article className="container max-w-3xl py-16">
      <h1 className="font-serif text-5xl text-espresso mb-2">Returns & Exchanges</h1>
      <p className="text-muted-foreground mb-8">7-day easy returns. No questions asked.</p>
      <div className="space-y-6 text-espresso/90 leading-relaxed">
        <p>If your piece doesn't speak to your home, we'll take it back within 7 days of delivery — provided it's unused and in original packaging.</p>
        <h2 className="font-serif text-2xl">How to Return</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Email <strong>hello@woodrix.com</strong> with your order number.</li>
          <li>We'll arrange pickup or share a return address.</li>
          <li>Refund processed within 5 business days of receipt.</li>
        </ol>
        <h2 className="font-serif text-2xl">Exclusions</h2>
        <p>Custom/personalised pieces are non-returnable unless damaged in transit.</p>
      </div>
    </article>
  );
}
