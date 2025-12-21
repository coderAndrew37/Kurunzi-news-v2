import { getServerUserRoles } from "@/lib/auth-utils";
import AdminDashboardClient from "./AdminDashBoardClientWrapper";

export default async function AdminPage() {
  const userContext = await getServerUserRoles();

  // Example: replace with real Supabase queries
  const counts = {
    pendingReviews: 18,
    scheduledArticles: 42,
  };

  const stats = {
    totalArticles: 1245,
    pendingReviews: 18,
    publishedToday: 24,
    totalWriters: 156,
    activeWriters: 89,
    avgPublishTime: "1.8h",
    approvalRate: "94.2%",
    totalViews: "1.2M",
  };

  return <AdminDashboardClient counts={counts} stats={stats} />;
}
