// app/admin/page.tsx
"use client";

import { useState } from "react";
import Header from "./_components/Dashboard/Header";
import StatsSection from "./_components/Dashboard/StatsSection";
import QuickActions from "./_components/Dashboard/QuickActions";
import RecentActivity from "./_components/Dashboard/RecentActivity";
import QuickStats from "./_components/Dashboard/QuickStats";
import ExportReports from "./_components/Dashboard/ExportReports";
import TopWriters, { Writer } from "./_components/Dashboard/TopWriters";
import FloatingActionButton from "./_components/Dashboard/FloatingActionButton";
import Sidebar from "./_components/Dashboard/Sidebar";

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

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArticles: 1245,
    pendingReviews: 18,
    publishedToday: 24,
    totalWriters: 156,
    activeWriters: 89,
    avgPublishTime: "1.8h",
    approvalRate: "94.2%",
    totalViews: "1.2M",
  });

  // Recent activities data
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
    {
      id: 5,
      user: "James Wilson",
      action: "updated SEO optimization guidelines",
      time: "3 hours ago",
      type: "submission",
      avatarColor: "bg-indigo-500",
    },
  ]);

  // Quick stats data
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
    {
      label: "Pending Reviews",
      value: "12",
      change: "-3",
      trend: "down",
      icon: <span>⚠️</span>,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      progress: 40,
    },
    {
      label: "Content Velocity",
      value: "32/day",
      change: "+12%",
      trend: "up",
      icon: <span>⚡</span>,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      progress: 68,
    },
  ]);

  // Top writers data
  const [topWriters, setTopWriters] = useState<Writer[]>([
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
    {
      name: "David Chen",
      articles: 35,
      views: "187K",
      status: "away",
      rank: 3,
    },
    {
      name: "Sarah Miller",
      articles: 31,
      views: "162K",
      status: "active",
      rank: 4,
    },
    {
      name: "James Wilson",
      articles: 28,
      views: "154K",
      status: "active",
      rank: 5,
    },
  ]);

  

  const handleViewTimeline = () => {
    console.log("View timeline clicked");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* With Sidebar Layout */}
      <div className="flex">
        <div className="flex-1">
          <main className="px-8 py-8">
            <StatsSection stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                <QuickActions onViewAll={handleViewAllActions} />
                <RecentActivity
                  activities={recentActivities}
                  onViewTimeline={handleViewTimeline}
                  onLoadMore={handleLoadMoreActivities}
                />
              </div>

              {/* Right Column */}
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
