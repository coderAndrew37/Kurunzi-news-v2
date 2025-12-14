"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import toast from "react-hot-toast";

export default function NewArticlePage() {
  const router = useRouter();
  const supabase = createBrowserSupabase();

  useEffect(() => {
    async function createDraft() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/writer/sign-in");
        return;
      }

      const { data, error } = await supabase
        .from("draft_articles")
        .insert({
          author_id: user.id,
          title: "Untitled Article",
          body: null,
          status: "draft",
        })
        .select("id")
        .single();

      if (error || !data) {
        toast.error("Failed to create draft");
        router.push("/writer/dashboard");
        return;
      }

      router.replace(`/writer/articles/${data.id}/edit`);
    }

    createDraft();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin h-10 w-10 border-b-2 border-red-600 rounded-full" />
    </div>
  );
}
