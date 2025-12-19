"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import toast from "react-hot-toast";

export default function NewArticlePage() {
  const router = useRouter();
  const supabase = createBrowserSupabase();

  useEffect(() => {
    let cancelled = false;

    async function createDraft() {
      // 1. Get authenticated user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Auth error:", authError);
        toast.error("Authentication error");
        router.push("/auth/writer/sign-in");
        return;
      }

      if (!user) {
        router.push("/auth/writer/sign-in");
        return;
      }

      // 2. Create draft using auth user id (matches RLS)
      const { data, error } = await supabase
        .from("draft_articles")
        .insert({
          author_id: user.id, // MUST match auth.uid()
          title: "Untitled Article",
          body: null,
          status: "draft",
        })
        .select("id")
        .single();

      if (cancelled) return;

      if (error) {
        console.error("Draft insert error:", error);

        if (error.code === "42501") {
          toast.error("You don't have permission to create drafts");
        } else {
          toast.error(error.message || "Failed to create draft");
        }

        router.push("/writer/dashboard");
        return;
      }

      if (!data?.id) {
        toast.error("Draft created but no ID returned");
        router.push("/writer/dashboard");
        return;
      }

      // 3. Redirect to editor
      router.replace(`/writer/articles/${data.id}/edit`);
    }

    createDraft();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin h-10 w-10 border-b-2 border-red-600 rounded-full" />
    </div>
  );
}
