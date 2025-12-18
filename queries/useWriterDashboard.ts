import { createBrowserSupabase } from "@/lib/supabase-browser";
import { useQuery } from "@tanstack/react-query";

export function useWriterDashboard(userId: string) {
  const supabase = createBrowserSupabase();

  return useQuery({
    queryKey: ["writer-dashboard", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("draft_articles")
        .select("id, title, status, created_at, word_count")
        .eq("author_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}
