"use server";

import { createActionSupabase } from "@/lib/supabase-actions";

export async function getSubmittedDrafts() {
  const supabase = await createActionSupabase();

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

  if (error) {
    throw error;
  }

  return data ?? [];
}
