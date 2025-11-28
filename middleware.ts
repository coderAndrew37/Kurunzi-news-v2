import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  let res = NextResponse.next();

  // generate nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  res.headers.set("x-nonce", nonce);

  // handle subdomain rewrites
  let host = req.headers.get("host") || "";
  host = host.split(":")[0];

  if (host.startsWith("sports.")) {
    return NextResponse.rewrite(
      new URL(`/sports${req.nextUrl.pathname}`, req.url)
    );
  }

  if (host.startsWith("politics.")) {
    return NextResponse.rewrite(
      new URL(`/politics${req.nextUrl.pathname}`, req.url)
    );
  }

  if (host.startsWith("worldcup.")) {
    const path = req.nextUrl.pathname || "/";
    return NextResponse.rewrite(new URL(`/worldcup${path}`, req.url));
  }

  return res;
}
