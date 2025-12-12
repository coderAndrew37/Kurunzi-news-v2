"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase-browser";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<any>(null);
  const router = useRouter();
  const supabase = createBrowserSupabase();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/auth/admin/sign-in");
      } else {
        setAdmin(data.user);
      }
    }

    load();
  }, []);

  if (!admin) return null; // loading state or spinner

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-2">Admin Dashboard</h1>
      <p className="text-sm text-slate-600 mb-6">
        Welcome, {admin.user_metadata?.firstName || admin.email || "Admin"}.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-medium">Invite writers</h3>
          <p className="text-sm text-slate-500">
            Send invitations & create writer accounts.
          </p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-medium">Manage authors</h3>
          <p className="text-sm text-slate-500">
            Sync Clerk users with Sanity author documents.
          </p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-medium">Review submissions</h3>
          <p className="text-sm text-slate-500">
            View drafts and approve content.
          </p>
        </div>
      </div>
    </section>
  );
}
