// /app/writer/layout.tsx
import React from "react";
import { redirect } from "next/navigation";
// Import the secure authorization utility
import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";

export const metadata = {
  title: "Writer Panel - Newsroom",
};

export default async function WriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userContext = await getServerUserRoles();

  // Authorization Check: Must be authenticated AND have the 'writer' role.
  // Since Admins have the 'writer' role in their array, they are authorized here too.
  const isAuthorized =
    userContext.isAuthenticated && hasRequiredRole(userContext.roles, "writer");

  if (!isAuthorized) {
    // Redirect to the writer-specific sign-in if not authorized
    redirect("/auth/writer/sign-in");
  }

  // You can use the userContext.userId to fetch profile data for the header if needed
  const writerId = userContext.userId;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Newsroom Writer Dashboard
          </h1>
          <p className="text-sm text-gray-600">User ID: {writerId}</p>
          {/* Add sign-out button component here */}
        </div>
      </header>
             {" "}
      <main className="flex-1 p-6">
                  <div className="max-w-4xl mx-auto">{children}</div>     
         {" "}
      </main>
         {" "}
    </div>
  );
}
