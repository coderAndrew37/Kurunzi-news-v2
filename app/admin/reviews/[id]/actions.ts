"use server";

import { createServerSupabase } from "@/lib/supabase-server";
import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";
import { publishDraftToSanity } from "@/lib/sanity/publishDraft";

// ❌ REMOVE auth check here
export async function getDraftForReview(id: string) {
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
  console.log("SERVER ROLES:", caller.roles);

  if (!caller.isAuthenticated || !hasRequiredRole(caller.roles, "admin")) {
    throw new Error("Unauthorized");
  }

  const supabase = await createServerSupabase();

  if (status === "rejected") {
    const { error } = await supabase
      .from("draft_articles")
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
        approved_by: caller.userId,
      })
      .eq("id", id);

    if (error) throw error;
    return;
  }

  // 👇 APPROVAL FLOW
  // 1. Lock draft
  const { data: draft, error } = await supabase
    .from("draft_articles")
    .update({
      status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: caller.userId,
    })
    .eq("id", id)
    .select()
    .single();

  if (error || !draft) throw error;

  // 2. Publish to Sanity
  const sanityId = await publishDraftToSanity(draft);

  // 3. Mark published
  const { error: publishError } = await supabase
    .from("draft_articles")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
      sanity_id: sanityId,
    })
    .eq("id", id);

  if (publishError) throw publishError;
}
