import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const path = url.pathname;
  const host = req.headers.get("host")?.split(":")[0] ?? "";

  // Always allow auth pages
  if (path.startsWith("/auth")) {
    return NextResponse.next();
  }

  const isDev = host.startsWith("localhost");

  const isAdminArea =
    host.startsWith("admin.") || (isDev && path.startsWith("/admin"));

  const isWriterArea =
    host.startsWith("writer.") || (isDev && path.startsWith("/writer"));

  const { userId, sessionClaims } = await auth();

  const roles =
    (sessionClaims?.publicMetadata as { roles?: string[] })?.roles ?? [];

  if (isAdminArea && (!userId || !roles.includes("admin"))) {
    return NextResponse.redirect(new URL("/auth/admin/sign-in", req.url));
  }

  if (isWriterArea && (!userId || !roles.includes("writer"))) {
    return NextResponse.redirect(new URL("/auth/writer/sign-in", req.url));
  }

  const res = NextResponse.next();
  res.headers.set(
    "x-nonce",
    Buffer.from(crypto.randomUUID()).toString("base64")
  );

  return res;
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/writer/:path*",
    "/((?!.+\\.[\\w]+$|_next|api|auth).*)",
  ],
};
