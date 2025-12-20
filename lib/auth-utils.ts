import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

interface ServerUserContext {
  isAuthenticated: boolean;
  user: any | null;
  userId: string | null;
  roles: string[];
}

export async function getServerUserRoles(): Promise<ServerUserContext> {
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

  // 1️⃣ Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      isAuthenticated: false,
      user: null,
      userId: null,
      roles: [],
    };
  }

  // 2️⃣ Fetch roles from DB
  const { data: roleRows, error } = await supabase
    .from("profiles")
    .select("roles")
    .eq("id", user.id);

  if (error) {
    console.error("Failed to fetch roles:", error);
    return {
      isAuthenticated: true,
      user,
      userId: user.id,
      roles: [],
    };
  }

  const roles = roleRows.map((r) => r.roles).flat();

  return {
    isAuthenticated: true,
    user,
    userId: user.id,
    roles,
  };
}

// -----------------------------
// Role Checker
// -----------------------------
export function hasRequiredRole(userRoles: string[], requiredRole: string) {
  return userRoles.includes(requiredRole);
}
