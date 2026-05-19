import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/dashboard";

  if (code) {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Ensure DB user row exists
      try {
        await prisma.user.upsert({
          where: { id: data.user.id },
          create: {
            id: data.user.id,
            email: data.user.email!,
            name: (data.user.user_metadata?.name as string) || null,
            avatarUrl: (data.user.user_metadata?.avatar_url as string) || null,
          },
          update: {},
        });
      } catch {}
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
