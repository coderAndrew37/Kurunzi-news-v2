// /middleware.ts
import { createMiddlewareSupabase } from "@/lib/supabase-middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;

  // Always a string, removes the port if present
  const host = (req.headers.get("host") ?? "").split(":")[0];
  const isDev = host.startsWith("localhost");

  const redirectUrl = (path: string) => new URL(path, req.url);

  if (path.startsWith("/auth")) {
    return NextResponse.next();
  }

  const isAdminArea =
    host.startsWith("admin.") || (isDev && path.startsWith("/admin"));

  const isWriterArea =
    host.startsWith("writer.") || (isDev && path.startsWith("/writer"));

  const response = NextResponse.next();
  const supabase = createMiddlewareSupabase(req, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // roles is ALWAYS an array if present
  const roles = user?.app_metadata?.roles as string[] | undefined;

  const isAuthenticated = !!user;

  // ADMIN AREA
  if (isAdminArea) {
    if (!isAuthenticated || !roles?.includes("admin")) {
      return NextResponse.redirect(redirectUrl("/auth/admin/sign-in"));
    }
  }

  // WRITER AREA
  if (isWriterArea) {
    if (!isAuthenticated || !roles?.includes("writer")) {
      return NextResponse.redirect(redirectUrl("/auth/writer/sign-in"));
    }
  }

  // Pass refreshed cookies
  response.headers.set(
    "x-nonce",
    Buffer.from(crypto.randomUUID()).toString("base64")
  );

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/writer/:path*",
    "/((?!.+\\.[\\w]+$|_next|api|auth).*)",
  ],
};
