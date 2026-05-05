import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ALLOWED_ORIGINS = [
  "https://tikitaxicr.com",
  "https://www.tikitaxicr.com",
  "http://localhost:3000",
];

export async function proxy(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const { pathname } = request.nextUrl;

  // --- CORS for API routes ---
  if (pathname.startsWith("/api/")) {
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    // Preflight
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }
  }

  // --- Auth guard for /admin routes ---
  if (pathname.startsWith("/admin")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    let response = NextResponse.next({ request });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Allow the login page itself
    if (pathname === "/admin/login") {
      return response;
    }

    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Verify user is in admin_users table
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!adminUser) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};

