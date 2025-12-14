"use server";

import { createServerSupabase } from "@/lib/supabase-server";
import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";

export async function getDraftForReview(id: string) {
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
      body,
      excerpt,
      word_count,
      submitted_at,
      profiles:author_id (
        id,
        email
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateDraftStatus(
  id: string,
  status: "approved" | "rejected"
) {
  const caller = await getServerUserRoles();
  if (!caller.isAuthenticated || !hasRequiredRole(caller.roles, "admin")) {
    throw new Error("Unauthorized");
  }

  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("draft_articles")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}
