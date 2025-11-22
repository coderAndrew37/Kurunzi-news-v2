import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  let host = req.headers.get("host") || "";

  // Remove port (e.g., :3000)
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
    return NextResponse.rewrite(
      new URL(`/worldcup${req.nextUrl.pathname}`, req.url)
    );
  }

  return NextResponse.next();
}
