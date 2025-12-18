import { useMutation } from "@tanstack/react-query";
import { createBrowserSupabase } from "@/lib/supabase-browser";

export function useAutosaveDraft(id: string) {
  const supabase = createBrowserSupabase();

  return useMutation({
    mutationFn: async (payload: any) => {
      const { error } = await supabase
        .from("draft_articles")
        .update(payload)
        .eq("id", id);

      if (error) throw error;
    },
  });
}
