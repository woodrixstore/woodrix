export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <article className="container max-w-3xl py-16 prose-stone prose-headings:font-serif prose-headings:text-espresso">
      <h1 className="font-serif text-5xl text-espresso mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: 1 January 2025</p>
      <div className="space-y-6 text-espresso/90 leading-relaxed">
        <p>Woodrix respects your privacy. This policy explains what data we collect, why, and how we protect it.</p>
        <h2 className="font-serif text-2xl mt-8">Information We Collect</h2>
        <p>Name, email, shipping address, phone number, and payment details (handled exclusively by Stripe — we never store card numbers).</p>
        <h2 className="font-serif text-2xl mt-8">How We Use It</h2>
        <p>To fulfil orders, send order updates, and improve your experience. We never sell your data.</p>
        <h2 className="font-serif text-2xl mt-8">Your Rights</h2>
        <p>You can request a copy or deletion of your data at any time by emailing hello@woodrix.com.</p>
      </div>
    </article>
  );
}
