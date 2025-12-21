import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AdminShell from "./_components/AdminShell";
import { getServerUserRoles } from "@/lib/auth-utils";
import { createServerSupabaseReadOnly } from "@/lib/supabase-server";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userContext = await getServerUserRoles();

  if (
    process.env.NODE_ENV === "production" &&
    (!userContext.isAuthenticated || !userContext.roles.includes("admin"))
  ) {
    redirect("/auth/admin/sign-in");
  }

  const supabase = await createServerSupabaseReadOnly();

  const [
    { count: publishedArticles },
    { count: writers },
    { count: pendingReviews },
  ] = await Promise.all([
    supabase
      .from("draft_articles")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),

    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .contains("roles", ["writer"]),

    supabase
      .from("draft_articles")
      .select("*", { count: "exact", head: true })
      .eq("status", "submitted"),
  ]);

  return (
    <AdminShell
      counts={{
        publishedArticles: publishedArticles ?? 0,
        writers: writers ?? 0,
        pendingReviews: pendingReviews ?? 0,
      }}
    >
      <Toaster position="top-right" />
      {children}
    </AdminShell>
  );
}
