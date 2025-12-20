import React from "react";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

import AdminSidebar from "./_components/AdminSidebar";
import AdminHeader from "./_components/AdminHeader";
import { getServerUserRoles } from "@/lib/auth-utils";

export const metadata = {
  title: "Admin - Newsroom",
  description: "Administrative Dashboard for Newsroom",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userContext = await getServerUserRoles();

  /**
   * 🚨 IMPORTANT
   * - In production: hard redirect
   * - In development: allow render, enforce auth elsewhere
   */
  if (process.env.NODE_ENV === "production") {
    if (!userContext.isAuthenticated || !userContext.roles.includes("admin")) {
      redirect("/auth/admin/sign-in");
    }
  }

  const admin =
    userContext.isAuthenticated && userContext.roles.includes("admin")
      ? {
          id: userContext.userId!,
          userId: userContext.userId!,
          name: userContext.user?.user_metadata?.name ?? null,
          email: userContext.user?.email ?? null,
        }
      : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader admin={admin} />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Toaster position="top-right" />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
