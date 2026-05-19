export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({ orderBy: { code: "asc" } }).catch(() => []);
  return (
    <div>
      <h1 className="font-serif text-3xl text-espresso mb-8">Coupons</h1>
      <div className="bg-card border border-sand rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="text-left p-4">Code</th>
              <th className="text-right p-4">Discount</th>
              <th className="text-right p-4">Used</th>
              <th className="text-left p-4">Expires</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {coupons.map((c) => (
              <tr key={c.id}>
                <td className="p-4 font-mono">{c.code}</td>
                <td className="p-4 text-right">{c.discountPercent}%</td>
                <td className="p-4 text-right">{c.usedCount} / {c.maxUses}</td>
                <td className="p-4 text-muted-foreground">{c.expiresAt ? formatDate(c.expiresAt) : "—"}</td>
                <td className="p-4"><Badge variant={c.isActive ? "success" : "outline"}>{c.isActive ? "Active" : "Disabled"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
