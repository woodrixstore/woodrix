export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function AddressesPage() {
  const u = await getSessionUser();
  if (!u) redirect("/login");
  const addresses = await prisma.address.findMany({ where: { userId: u.id } }).catch(() => []);

  return (
    <div>
      <h1 className="font-serif text-3xl text-espresso mb-8">Saved Addresses</h1>
      {addresses.length === 0 ? (
        <p className="text-muted-foreground text-sm">No saved addresses yet. Add one at checkout.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((a) => (
            <div key={a.id} className="bg-card border border-sand rounded-lg p-5">
              <p className="font-medium text-espresso">{a.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {a.line1}{a.line2 ? `, ${a.line2}` : ""}<br />
                {a.city}, {a.state} {a.postalCode}<br />
                {a.country}
              </p>
              {a.isDefault && <span className="inline-block mt-2 text-xs text-accent">Default</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
