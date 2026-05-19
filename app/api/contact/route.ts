import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { BRAND } from "@/lib/constants";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { name, email, subject, message } = parsed.data;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: BRAND.email,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: `<h2>New message from ${name} (${email})</h2><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "We received your message — Woodrix",
      html: `<p>Hi ${name},</p><p>Thanks for reaching out. We'll get back to you within 24 hours.</p><p>— Team Woodrix</p>`,
    });
  } catch {}

  return NextResponse.json({ ok: true });
}
