"use server";

import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";
import { createServerSupabase } from "@/lib/supabase-server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

// High-privilege client using the Service Role Key
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // The critical secret key
);

/**
 * Invites a new user and grants them the 'writer' role.
 * This function is protected by an explicit check for the 'admin' role.
 */

export async function inviteWriter(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, message: "Email is required." };
  }

  // AUTH CHECK
  const caller = await getServerUserRoles();
  if (!caller.isAuthenticated || !hasRequiredRole(caller.roles, "admin")) {
    return { success: false, message: "Forbidden: Admins only." };
  }

  try {
    const { data: inviteData, error: inviteError } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(email);

    if (inviteError || !inviteData.user) {
      return {
        success: false,
        message: inviteError?.message || "Failed to send invite.",
      };
    }

    const newUserId = inviteData.user.id;
    const initialRoles = ["authenticated", "writer"];

    const supabaseRLS = await createServerSupabase();

    const { error: roleUpdateError } = await supabaseRLS
      .from("profiles")
      .update({ roles: initialRoles })
      .eq("id", newUserId);

    if (roleUpdateError) {
      return {
        success: false,
        message: "User invited, but failed to assign roles.",
      };
    }

    return { success: true, message: "Invitation sent successfully!" };
  } catch (e) {
    return { success: false, message: "Unexpected server error." };
  }
}
