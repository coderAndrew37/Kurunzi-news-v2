"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/invite-writer", label: "Invite Writer" },
  { href: "/admin/writers", label: "Writers" },
  { href: "/admin/authors", label: "Authors (Sanity)" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden lg:block border-r bg-white">
      <div className="px-4 py-6">
        <div className="text-xs uppercase text-slate-500 mb-3">Admin</div>
        <nav className="flex flex-col gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`block px-3 py-2 rounded ${
                  active
                    ? "bg-slate-100 font-medium"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
