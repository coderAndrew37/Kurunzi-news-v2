import { redirect } from "next/navigation";
import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";

export default async function WriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV !== "production") {
    // ❗ Dev: DO NOT block rendering
    return <>{children}</>;
  }

  const userContext = await getServerUserRoles();

  const isAuthorized =
    userContext.isAuthenticated && hasRequiredRole(userContext.roles, "writer");

  if (!isAuthorized) {
    redirect("/auth/writer/sign-in");
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
