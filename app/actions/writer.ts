"use server";

import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";
import { createActionSupabase } from "@/lib/supabase-actions";
import { z } from "zod";

const draftSchema = z.object({
  title: z.string().min(3).max(200),
  excerpt: z.string().max(300).nullable(),
  body: z.any(), // TipTap JSON
  draftId: z.string().uuid().optional(),
});

export async function saveDraft(input: z.infer<typeof draftSchema>) {
  const caller = await getServerUserRoles();

  if (!caller.isAuthenticated || !hasRequiredRole(caller.roles, "writer")) {
    throw new Error("Unauthorized");
  }

  const supabase = await createActionSupabase();

  const data = draftSchema.parse(input);

  if (data.draftId) {
    await supabase
      .from("draft_articles")
      .update({
        title: data.title,
        excerpt: data.excerpt,
        body: data.body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.draftId)
      .eq("author_id", caller.userId);
  } else {
    await supabase.from("draft_articles").insert({
      author_id: caller.userId,
      title: data.title,
      excerpt: data.excerpt,
      body: data.body,
      status: "draft",
    });
  }

  return { success: true };
}
