import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { getServerUserRoles } from "@/lib/auth-utils";
import AdminShell from "./_components/AdminShell";

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

  return (
    <AdminShell>
      <Toaster position="top-right" />
      {children}
    </AdminShell>
  );
}
