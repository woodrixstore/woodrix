export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const sess = await getSessionUser();
  if (!sess) redirect("/login");
  const user = await prisma.user.findUnique({ where: { id: sess.id } });

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-3xl text-espresso mb-8">Profile</h1>
      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input defaultValue={user?.name || ""} className="mt-1.5" />
        </div>
        <div>
          <Label>Email</Label>
          <Input defaultValue={user?.email || ""} disabled className="mt-1.5" />
        </div>
        <div>
          <Label>Phone</Label>
          <Input defaultValue={user?.phone || ""} className="mt-1.5" placeholder="+923001234567" />
        </div>
        <p className="text-xs text-muted-foreground">Profile editing API endpoint can be wired to PATCH /api/users/me.</p>
      </div>
    </div>
  );
}
