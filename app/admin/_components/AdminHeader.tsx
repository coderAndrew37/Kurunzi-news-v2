"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AdminInfo } from "@/app/components/types";
import { createBrowserSupabase } from "@/lib/supabase-browser";

interface Props {
  admin: AdminInfo;
}

export default function AdminHeader({ admin }: Props) {
  const router = useRouter();
  const supabase = createBrowserSupabase();

  const displayName = admin.name || admin.email || "Admin";

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/auth/admin/sign-in");
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-lg font-bold">
            Newsroom Admin
          </Link>

          <nav className="hidden sm:flex items-center gap-3 text-sm text-slate-600">
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
          <div className="hidden sm:block text-sm text-slate-700">
            Signed in as {displayName}
          </div>

          <button
            onClick={handleSignOut}
            className="px-3 py-1 rounded bg-slate-100 text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
