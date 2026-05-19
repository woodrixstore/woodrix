export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <article className="container max-w-3xl py-16">
      <h1 className="font-serif text-5xl text-espresso mb-2">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: 1 January 2025</p>
      <div className="space-y-6 text-espresso/90 leading-relaxed">
        <p>By using woodrix.com you agree to the following terms.</p>
        <h2 className="font-serif text-2xl">Orders</h2>
        <p>All orders are subject to availability and confirmation. We reserve the right to refuse any order.</p>
        <h2 className="font-serif text-2xl">Pricing</h2>
        <p>All prices are in PKR and inclusive of taxes where applicable.</p>
        <h2 className="font-serif text-2xl">Intellectual Property</h2>
        <p>All Woodrix branding, photography, and content remain property of Woodrix.</p>
        <h2 className="font-serif text-2xl">Liability</h2>
        <p>Our liability is limited to the value of the order placed.</p>
      </div>
    </article>
  );
}
