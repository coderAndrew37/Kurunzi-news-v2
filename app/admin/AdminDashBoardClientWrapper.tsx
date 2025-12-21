"use client";

import { useState } from "react";

import ExportReports from "./_components/Dashboard/ExportReports";
import FloatingActionButton from "./_components/Dashboard/FloatingActionButton";
import QuickActions from "./_components/Dashboard/QuickActions";
import QuickStats from "./_components/Dashboard/QuickStats";
import RecentActivity from "./_components/Dashboard/RecentActivity";
import StatsSection from "./_components/Dashboard/StatsSection";
import TopWriters, { Writer } from "./_components/Dashboard/TopWriters";

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
  type: "submission" | "publish" | "account" | "review";
  avatarColor: string;
}

interface QuickStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  progress: number;
}

interface AdminDashboardClientProps {
  counts: {
    pendingReviews: number;
    scheduledArticles: number;
  };
  stats: {
    totalArticles: number;
    pendingReviews: number;
    publishedToday: number;
    totalWriters: number;
    activeWriters: number;
    avgPublishTime: string;
    approvalRate: string;
    totalViews: string;
  };
}

export default function AdminDashboardClient({
  counts,
  stats,
}: AdminDashboardClientProps) {
  // -----------------------------
  // Mocked client-only state
  // -----------------------------

  const [recentActivities] = useState<ActivityItem[]>([
    {
      id: 1,
      user: "Alex Johnson",
      action: "submitted 'Future of AI in Healthcare'",
      time: "10 min ago",
      type: "submission",
      avatarColor: "bg-blue-500",
    },
    {
      id: 2,
      user: "Maria Garcia",
      action: "published 'Sustainable Tech Innovations 2024'",
      time: "25 min ago",
      type: "publish",
      avatarColor: "bg-green-500",
    },
    {
      id: 3,
      user: "David Chen",
      action: "joined as a new contributor",
      time: "1 hour ago",
      type: "account",
      avatarColor: "bg-purple-500",
    },
    {
      id: 4,
      user: "Sarah Miller",
      action: "requires urgent review on breaking news",
      time: "2 hours ago",
      type: "review",
      avatarColor: "bg-orange-500",
    },
  ]);

  const [quickStats] = useState<QuickStat[]>([
    {
      label: "Engagement Rate",
      value: "74.3%",
      change: "+8.2%",
      trend: "up",
      icon: <span>📈</span>,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      progress: 74,
    },
    {
      label: "Avg. Read Time",
      value: "4.8min",
      change: "+0.6min",
      trend: "up",
      icon: <span>⏱️</span>,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      progress: 85,
    },
  ]);

  const [topWriters] = useState<Writer[]>([
    {
      name: "Alex Johnson",
      articles: 42,
      views: "245K",
      status: "active",
      rank: 1,
    },
    {
      name: "Maria Garcia",
      articles: 38,
      views: "198K",
      status: "active",
      rank: 2,
    },
  ]);

  // -----------------------------
  // Handlers
  // -----------------------------

  const handleViewTimeline = () => {
    console.log("View timeline");
  };

  const handleLoadMoreActivities = () => {
    console.log("Load more activities");
  };

  const handleViewAllActions = () => {
    console.log("View all actions");
  };

  const handleFloatingAction = () => {
    console.log("Floating action button clicked");
  };

  // -----------------------------
  // Render
  // -----------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <div className="flex-1">
          <main className="px-8 py-8">
            <StatsSection stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-8">
                <QuickActions
                  counts={counts}
                  onViewAll={handleViewAllActions}
                />

                <RecentActivity
                  activities={recentActivities}
                  onViewTimeline={handleViewTimeline}
                  onLoadMore={handleLoadMoreActivities}
                />
              </div>

              {/* Right column */}
              <div className="space-y-8">
                <QuickStats stats={quickStats} />
                <ExportReports />
                <TopWriters writers={topWriters} />
              </div>
            </div>
          </main>
        </div>
      </div>

      <FloatingActionButton onClick={handleFloatingAction} />
    </div>
  );
}
