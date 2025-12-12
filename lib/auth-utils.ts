import type { CookieOptions } from "@supabase/ssr";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// -----------------------------
//  Secure Server Auth Context
// -----------------------------
export async function getServerUserRoles() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, "", options);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No user
  if (!user) {
    return {
      isAuthenticated: false,
      user: null,
      userId: null,
      roles: [] as string[],
    };
  }

  // Extract immutable app_metadata roles
  const roles = Array.isArray(user.app_metadata?.roles)
    ? (user.app_metadata.roles as string[])
    : [];

  return {
    isAuthenticated: true,
    user,
    userId: user.id,
    roles,
  };
}

// -----------------------------
//  Role Checker
// -----------------------------
export function hasRequiredRole(userRoles: string[], requiredRole: string) {
  return userRoles.includes(requiredRole);
}
