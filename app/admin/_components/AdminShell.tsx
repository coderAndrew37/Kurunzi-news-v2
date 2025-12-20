"use client";

import { useState } from "react";
import Header from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [timeRange, setTimeRange] = useState<
    "day" | "week" | "month" | "quarter"
  >("week");

  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notifications={notifications}
        onRefresh={handleRefresh}
      />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
