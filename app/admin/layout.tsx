import React from "react";
import AdminSidebar from "./_components/AdminSidebar";
import AdminHeader from "./_components/AdminHeader";
import { getServerUserRoles } from "@/lib/auth-utils";
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
  const userContext =
    process.env.NODE_ENV === "production" ? await getServerUserRoles() : null;

  const admin = userContext?.user
    ? {
        id: userContext.userId!,
        userId: userContext.userId!,
        name: userContext.user.user_metadata?.name ?? null,
        email: userContext.user.email ?? null,
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
