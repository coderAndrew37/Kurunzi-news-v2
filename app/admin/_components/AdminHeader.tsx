"use client";

import Link from "next/link";
import type { AdminInfo } from "@/app/components/types";
import { createBrowserSupabase } from "@/lib/supabase-browser";

interface Props {
  admin: AdminInfo | null;
}

export default function AdminHeader({ admin }: Props) {
  const supabase = createBrowserSupabase();

  const displayName = admin?.name || admin?.email || "Admin";

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/auth/admin/sign-in";
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-lg font-bold">
            Newsroom Admin
          </Link>

          <nav className="hidden sm:flex items-center gap-4 text-sm text-slate-600">
            <Link href="/admin/invite-writer" className="hover:underline">
              Invite
            </Link>
            <Link href="/admin/writers" className="hover:underline">
              Writers
            </Link>
            <Link href="/admin/articles" className="hover:underline">
              Articles
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-slate-700">
            Signed in as <strong>{displayName}</strong>
          </span>

          <button
            onClick={handleSignOut}
            className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium hover:bg-slate-200 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
