import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function createMiddlewareSupabase(
  req: NextRequest,
  res: NextResponse
): SupabaseClient {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // <-- CORRECTED: MUST USE ANON KEY
    {
      cookies: {
        get(name: string): string | undefined {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions): void {
          res.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions): void {
          res.cookies.set(name, "", options);
        },
      },
    }
  );
}
