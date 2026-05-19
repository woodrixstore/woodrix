export const dynamic = 'force-dynamic';
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/formatters";
import { Button } from "@/components/ui/button";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-espresso">Products</h1>
        <Button asChild><Link href="/admin/products/new">+ Add Product</Link></Button>
      </div>
      <div className="bg-card border border-sand rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Category</th>
              <th className="text-right p-4">Price</th>
              <th className="text-right p-4">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-surface/50">
                <td className="p-4">
                  <div className="relative h-12 w-12 rounded-sm overflow-hidden bg-surface">
                    {p.images[0] && <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="48px" />}
                  </div>
                </td>
                <td className="p-4 font-medium text-espresso">{p.name}</td>
                <td className="p-4 text-muted-foreground">{p.category}</td>
                <td className="p-4 text-right tabular-nums">{formatPKR(p.basePrice)}</td>
                <td className="p-4 text-right tabular-nums">{p.totalStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
