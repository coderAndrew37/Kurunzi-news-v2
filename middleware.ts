import { createMiddlewareSupabase } from "@/lib/supabase-middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const path = req.nextUrl.pathname;

  if (path.startsWith("/auth")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const supabase = createMiddlewareSupabase(req, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const roles = user?.app_metadata?.roles as string[] | undefined;

  if (path.startsWith("/admin")) {
    if (!user || !roles?.includes("admin")) {
      return NextResponse.redirect(new URL("/auth/admin/sign-in", req.url));
    }
  }

  if (path.startsWith("/writer")) {
    if (!user || !roles?.includes("writer")) {
      return NextResponse.redirect(new URL("/auth/writer/sign-in", req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/writer/:path*"],
};
