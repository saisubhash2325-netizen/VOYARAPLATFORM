import { createServerClient } from "@supabase/ssr";
import type { SetAllCookies } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Let the curated hackathon demo run before the owner adds Supabase credentials.
  if (!projectUrl || projectUrl.includes("YOUR-PROJECT") || !anonKey || anonKey === "your-anon-key") return NextResponse.next();
  let res = NextResponse.next({ request: req });
  const supabase = createServerClient(projectUrl, anonKey, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list: Parameters<SetAllCookies>[0]) => {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const url = req.nextUrl.clone(); url.pathname = "/login"; url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const { data: p } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (p?.role !== "admin") return NextResponse.redirect(new URL("/", req.url));
  }
  return res;
}
export const config = { matcher: ["/booking/:path*", "/checkout/:path*", "/dashboard/:path*", "/admin/:path*"] };
