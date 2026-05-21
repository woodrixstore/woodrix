import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY || "");

const _envFrom = process.env.RESEND_FROM_EMAIL || "";
// Gmail cannot be a Resend sender — fall back to onboarding@resend.dev if misconfigured
export const FROM_EMAIL = (_envFrom && !_envFrom.includes("gmail.com"))
  ? _envFrom
  : "Woodrix <onboarding@resend.dev>";
