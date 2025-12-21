import { createServerSupabaseReadOnly } from "@/lib/supabase-server";
import { User } from "@supabase/supabase-js";

interface ServerUserContext {
  isAuthenticated: boolean;
  user: User | null;
  userId: string | null;
  roles: string[];
}

export async function getServerUserRoles(): Promise<ServerUserContext> {
  const supabase = await createServerSupabaseReadOnly();

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

  const { data, error } = await supabase
    .from("profiles")
    .select("roles")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Failed to fetch roles:", error);
    return {
      isAuthenticated: true,
      user,
      userId: user.id,
      roles: [],
    };
  }

  return {
    isAuthenticated: true,
    user,
    userId: user.id,
    roles: data.roles ?? [],
  };
}

export function hasRequiredRole(userRoles: string[], requiredRole: string) {
  return userRoles.includes(requiredRole);
}
