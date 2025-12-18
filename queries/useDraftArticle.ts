import { useQuery } from "@tanstack/react-query";
import { createBrowserSupabase } from "@/lib/supabase-browser";

export function useDraftArticle(id: string) {
  const supabase = createBrowserSupabase();

  return useQuery({
    queryKey: ["draft-article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("draft_articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}
