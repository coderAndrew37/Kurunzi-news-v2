import { redirect } from "next/navigation";
import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";
import WriterFooter from "./_components/WriterFooter";
import WriterHeader from "./_components/WriterHeader";

export default async function WriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    const userContext = await getServerUserRoles();

    const isAuthorized =
      userContext.isAuthenticated &&
      hasRequiredRole(userContext.roles, "writer");

    if (!isAuthorized) {
      redirect("/auth/writer/sign-in");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WriterHeader />
      {children}
      <WriterFooter />
    </div>
  );
}
