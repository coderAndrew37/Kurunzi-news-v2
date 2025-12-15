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
      // 1. Get auth user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/writer/sign-in");
        return;
      }

      // 2. Get profile (THIS WAS MISSING)
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id) // assumes profiles.id === auth.users.id
        .single();

      if (profileError || !profile) {
        toast.error("Writer profile not found");
        router.push("/writer/dashboard");
        return;
      }

      // 3. Create draft using PROFILE id
      const { data, error } = await supabase
        .from("draft_articles")
        .insert({
          author_id: profile.id,
          title: "Untitled Article",
          body: null,
          status: "draft",
        })
        .select("id")
        .single();

      if (error) {
        console.error("Draft insert error:", error);
        toast.error(error.message);
        router.push("/writer/dashboard");
        return;
      }

      // 4. Redirect to editor
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
