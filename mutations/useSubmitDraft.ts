import { createBrowserSupabase } from "@/lib/supabase-browser";
import { useMutation } from "@tanstack/react-query";

export function useSubmitDraft(id: string) {
  const supabase = createBrowserSupabase();

  return useMutation({
    mutationFn: async (payload: any) => {
      const { error } = await supabase
        .from("draft_articles")
        .update({
          ...payload,
          status: "submitted",
          submitted_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
    },
  });
}
