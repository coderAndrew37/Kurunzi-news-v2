"use client";

import React from "react";
import Link from "next/link";
import { UserButton, SignOutButton } from "@clerk/nextjs";

interface Props {
  admin: any;
}

export default function AdminHeader({ admin }: Props) {
  const displayName =
    admin?.firstName || admin?.lastName
      ? `${admin.firstName ?? ""} ${admin.lastName ?? ""}`.trim()
      : (admin?.emailAddresses?.[0]?.emailAddress ?? "Admin");

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

          <div className="flex items-center gap-2">
            <UserButton />
            {/* SignOutButton is optional but useful for an explicit sign out action */}
            <SignOutButton>
              <button className="hidden sm:inline-block px-3 py-1 rounded bg-slate-100 text-sm">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </header>
  );
}
