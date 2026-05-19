export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/formatters";

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    include: { orders: true },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div>
      <h1 className="font-serif text-3xl text-espresso mb-8">Customers</h1>
      <div className="bg-card border border-sand rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Joined</th>
              <th className="text-right p-4">Orders</th>
              <th className="text-right p-4">Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {users.map((u) => {
              const spent = u.orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
              return (
                <tr key={u.id} className="hover:bg-surface/50">
                  <td className="p-4 font-medium">{u.name || "—"}</td>
                  <td className="p-4 text-muted-foreground">{u.email}</td>
                  <td className="p-4">{formatDate(u.createdAt)}</td>
                  <td className="p-4 text-right tabular-nums">{u.orders.length}</td>
                  <td className="p-4 text-right tabular-nums">{formatPKR(spent)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
