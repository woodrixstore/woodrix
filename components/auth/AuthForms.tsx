"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { loginSchema, signupSchema } from "@/lib/validations";

export function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back");
    router.push(sp.get("redirect") || "/dashboard");
    router.refresh();
  }

  async function googleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl text-espresso">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-2">Sign in to continue your Woodrix journey.</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" required />
        </div>
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs text-accent hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <div className="relative text-center">
        <span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-widest relative z-10">or</span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-sand -z-0" />
      </div>
      <Button variant="outline" onClick={googleSignIn} className="w-full">
        <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.5 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.22-4.74 3.22-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.99 7.28-2.66l-3.57-2.75c-.99.67-2.26 1.07-3.71 1.07-2.85 0-5.27-1.93-6.13-4.52H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.87 14.14a6.99 6.99 0 0 1 0-4.28V7.02H2.18a11 11 0 0 0 0 9.96l3.69-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.69 2.84C6.73 7.3 9.15 5.38 12 5.38z"/></svg>
        Continue with Google
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        New to Woodrix? <Link href="/signup" className="text-primary hover:text-accent font-medium">Create an account</Link>
      </p>
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = signupSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    // Best-effort: create user row
    if (data.user) {
      await fetch("/api/users/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data.user.id, email, name }),
      }).catch(() => {});
    }
    toast.success("Check your email to verify your account.");
    router.push("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl text-espresso">Join Woodrix</h1>
        <p className="text-sm text-muted-foreground mt-2">Get 10% off your first order + early access.</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label>Full Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" required />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" required />
          <p className="text-xs text-muted-foreground mt-1.5">At least 8 characters with one uppercase letter & number.</p>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <Link href="/login" className="text-primary hover:text-accent font-medium">Sign in</Link>
      </p>
    </div>
  );
}

export function ForgotPasswordForm() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl text-espresso">Reset password</h1>
      {sent ? (
        <p className="text-sm text-muted-foreground">
          We've sent a password-reset link to <strong>{email}</strong>. Check your inbox.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link.</p>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      )}
      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="text-primary hover:text-accent">Back to sign in</Link>
      </p>
    </div>
  );
}

export function ResetPasswordForm() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated");
    router.push("/login");
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl text-espresso">Set new password</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label>New Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" required />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Update password"}
        </Button>
      </form>
    </div>
  );
}
