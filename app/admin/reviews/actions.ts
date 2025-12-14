"use server";

import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";
import { createServerSupabase } from "@/lib/supabase-server";

export async function getSubmittedDrafts() {
  const caller = await getServerUserRoles();

  if (!caller.isAuthenticated || !hasRequiredRole(caller.roles, "admin")) {
    throw new Error("Unauthorized");
  }

  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("draft_articles")
    .select(
      `
  id,
  title,
  status,
  submitted_at,
  word_count,
  profile:author_id (
    id,
    email
  )
`
    )

    .eq("status", "submitted")
    .order("submitted_at", { ascending: false });

  if (error) throw error;

  return data;
}
