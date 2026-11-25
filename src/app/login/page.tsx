import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

async function signIn(fd: FormData) {
  "use server";
  const sb = await createClient();
  const { error } = await sb.auth.signInWithPassword({ email: String(fd.get("email")), password: String(fd.get("password")) });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}
async function signUp(fd: FormData) {
  "use server";
  const sb = await createClient();
  const { error } = await sb.auth.signUp({ email: String(fd.get("email")), password: String(fd.get("password")), options: { data: { full_name: String(fd.get("full_name") || "") } } });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("YOUR-PROJECT")) return <div className="simple-panel login-panel"><span className="eyebrow">WELCOME TO VOYARA</span><h1>Travel on your terms.</h1><p>Demo browsing and bookings are open. You can explore stays, save a sample trip, and switch currencies without making an account.</p><Link className="search-button" href="/hotels">Explore stays ↗</Link><p className="login-setup-note">Setting up a live Supabase project enables account sign-in and synced bookings.</p></div>;
  return (
    <form className="simple-panel login-panel" style={{ display: "grid", gap: 10, maxWidth: 440 }}>
      <span className="eyebrow">WELCOME BACK</span><h1>Your travels, together.</h1>{error && <p className="error-message">{error}</p>}
      <label>YOUR NAME <input name="full_name" autoComplete="name" placeholder="For new accounts"/></label><label>EMAIL <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label>PASSWORD <input name="password" type="password" autoComplete="current-password" placeholder="At least 6 characters" required minLength={6} /></label>
      <button formAction={signIn}>Sign in ↗</button><button className="signup-button" formAction={signUp}>Create an account</button>
    </form>
  );
}
