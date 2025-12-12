// /app/admin/layout.tsx
import React from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "./_components/AdminSidebar";
import AdminHeader from "./_components/AdminHeader";
import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";
import { Toaster } from "react-hot-toast";

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
  // 1. Read the user and roles securely on the server
  const userContext = await getServerUserRoles();

  // 2. Check permissions
  const isAuthorized =
    userContext.isAuthenticated && hasRequiredRole(userContext.roles, "admin");

  // 3. Block unauthorized access
  if (!isAuthorized) {
    redirect("/auth/admin/sign-in");
  }

  // 4. Info to send to Header (client)
  const admin = {
    id: userContext.userId!,
    userId: userContext.userId!,
    name: userContext.user?.user_metadata?.name ?? null,
    email: userContext.user?.email ?? null,
  };

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
