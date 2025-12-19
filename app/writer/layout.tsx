import WriterHeader from "./_components/WriterHeader";
import WriterFooter from "./_components/WriterFooter";
import { getServerUserRoles } from "@/lib/auth-utils";

export default async function WriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Optional: user context for header/footer only
  if (process.env.NODE_ENV === "production") {
    await getServerUserRoles();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WriterHeader />
      {children}
      <WriterFooter />
    </div>
  );
}
