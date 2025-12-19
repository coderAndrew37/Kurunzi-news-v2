"use client";

import { useState, useEffect } from "react";
import {
  Users,
  FileText,
  Send,
  BarChart3,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Download,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Eye,
  Edit,
  MoreVertical,
  Sparkles,
  Target,
  Zap,
  Shield,
  Calendar,
  UserPlus,
  Activity,
  TrendingDown,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw,
  Globe,
} from "lucide-react";
import Link from "next/link";

// Type definitions
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
  progress?: number;
}

interface ArticleMetric {
  category: string;
  articles: number;
  engagement: number;
  growth: number;
  color: string;
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

  const [timeRange, setTimeRange] = useState<
    "day" | "week" | "month" | "quarter"
  >("week");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);

  // Enhanced recent activities
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([
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

  // Enhanced quick stats with progress
  const [quickStats, setQuickStats] = useState<QuickStat[]>([
    {
      label: "Engagement Rate",
      value: "74.3%",
      change: "+8.2%",
      trend: "up",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      progress: 74,
    },
    {
      label: "Avg. Read Time",
      value: "4.8min",
      change: "+0.6min",
      trend: "up",
      icon: <Clock className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      progress: 85,
    },
    {
      label: "Pending Reviews",
      value: "12",
      change: "-3",
      trend: "down",
      icon: <AlertCircle className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      progress: 40,
    },
    {
      label: "Content Velocity",
      value: "32/day",
      change: "+12%",
      trend: "up",
      icon: <Zap className="h-5 w-5" />,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      progress: 68,
    },
  ]);

  // Article metrics by category
  const [articleMetrics, setArticleMetrics] = useState<ArticleMetric[]>([
    {
      category: "Technology",
      articles: 324,
      engagement: 88,
      growth: 24,
      color: "bg-blue-500",
    },
    {
      category: "Business",
      articles: 287,
      engagement: 76,
      growth: 18,
      color: "bg-green-500",
    },
    {
      category: "Health",
      articles: 212,
      engagement: 82,
      growth: 32,
      color: "bg-purple-500",
    },
    {
      category: "Lifestyle",
      articles: 198,
      engagement: 65,
      growth: 12,
      color: "bg-pink-500",
    },
    {
      category: "Science",
      articles: 176,
      engagement: 91,
      growth: 28,
      color: "bg-indigo-500",
    },
  ]);

  // Top performing writers
  const [topWriters, setTopWriters] = useState([
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

  // Time range filter
  const timeRanges = [
    { label: "Today", value: "day" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "This Quarter", value: "quarter" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-violet-600 p-2 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Last updated: Today, 2:14 PM •{" "}
                  <span className="text-emerald-600 font-medium">Live</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Time Range Filter */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100/80 rounded-lg p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value as any)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                      timeRange === range.value
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Enhanced Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search writers, articles, metrics..."
                  className="pl-10 pr-4 py-2.5 w-64 bg-gray-100/80 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  aria-label="Refresh"
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="h-5 w-5" />
                </button>

                <button
                  aria-label="Notifications"
                  className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                  )}
                </button>

                <button className="flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-95">
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        {/* Main Stats Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Articles",
              value: stats.totalArticles,
              change: "+124 this week",
              icon: <FileText className="h-8 w-8" />,
              color: "from-blue-500 to-cyan-500",
              bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
            },
            {
              label: "Pending Review",
              value: stats.pendingReviews,
              change: "Needs attention",
              icon: <AlertCircle className="h-8 w-8" />,
              color: "from-amber-500 to-orange-500",
              bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
              urgent: true,
            },
            {
              label: "Published Today",
              value: stats.publishedToday,
              change: "Ahead of schedule",
              icon: <CheckCircle className="h-8 w-8" />,
              color: "from-emerald-500 to-green-500",
              bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
            },
            {
              label: "Active Writers",
              value: `${stats.activeWriters}/${stats.totalWriters}`,
              change: "87% active rate",
              icon: <Users className="h-8 w-8" />,
              color: "from-violet-500 to-purple-500",
              bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-2xl ${stat.bgColor} border border-gray-200/60 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div
                className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"
                style={{ background: `linear-gradient(135deg, ${stat.color})` }}
              ></div>

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.label}
                  </p>
                  <p
                    className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${stat.color})`,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-2 ${stat.urgent ? "text-amber-600 font-semibold" : "text-gray-500"}`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                >
                  {stat.icon}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/40">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">View details</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions - Enhanced */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Quick Actions
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Common tasks and shortcuts
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      aria-label="filter"
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Filter className="h-5 w-5" />
                    </button>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                      View all
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Review Submissions",
                      description: "18 articles awaiting review",
                      icon: <Eye className="h-6 w-6" />,
                      color: "from-orange-500 to-amber-500",
                      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
                      count: 18,
                    },
                    {
                      title: "Invite Writers",
                      description: "Send invites & manage access",
                      icon: <UserPlus className="h-6 w-6" />,
                      color: "from-blue-500 to-cyan-500",
                      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
                      count: null,
                    },
                    {
                      title: "Content Calendar",
                      description: "Schedule & plan publications",
                      icon: <Calendar className="h-6 w-6" />,
                      color: "from-emerald-500 to-green-500",
                      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
                      count: 42,
                    },
                    {
                      title: "Analytics Report",
                      description: "Generate performance insights",
                      icon: <Activity className="h-6 w-6" />,
                      color: "from-violet-500 to-purple-500",
                      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
                      count: null,
                    },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="group relative text-left p-5 rounded-xl border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${action.color})`,
                        }}
                      ></div>

                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${action.bgColor}`}>
                          <div
                            className={`bg-gradient-to-br ${action.color} bg-clip-text text-transparent`}
                          >
                            {action.icon}
                          </div>
                        </div>
                        {action.count && (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {action.count}
                          </span>
                        )}
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>

                      <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                        <span>Take action</span>
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity - Enhanced */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Recent Activity
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Latest actions across platform
                    </p>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                    View timeline
                  </button>
                </div>

                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="group flex items-center p-4 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
                    >
                      <div className="relative mr-4">
                        <div
                          className={`w-10 h-10 ${activity.avatarColor} rounded-xl flex items-center justify-center text-white font-medium`}
                        >
                          {activity.user.charAt(0)}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            activity.type === "submission"
                              ? "bg-blue-500"
                              : activity.type === "publish"
                                ? "bg-emerald-500"
                                : activity.type === "account"
                                  ? "bg-purple-500"
                                  : "bg-amber-500"
                          }`}
                        ></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold text-gray-900 truncate">
                            {activity.user}
                          </p>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              activity.type === "submission"
                                ? "bg-blue-100 text-blue-700"
                                : activity.type === "publish"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : activity.type === "account"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {activity.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {activity.action}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {activity.time}
                        </span>
                        <button
                          aria-label="more button"
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-gray-200">
                  <button className="w-full py-3 text-center text-gray-600 hover:text-gray-900 font-medium hover:bg-gray-50 rounded-xl transition-colors">
                    Load more activities
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Export */}
          <div className="space-y-8">
            {/* Quick Stats - Enhanced */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Performance Metrics
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Key indicators this week
                </p>

                <div className="space-y-5">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                            <div className={stat.color}>{stat.icon}</div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {stat.value}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`flex items-center space-x-1 text-sm font-medium ${
                            stat.trend === "up"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.trend === "up" ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          <span>{stat.change}</span>
                        </div>
                      </div>

                      {stat.progress !== undefined && (
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              stat.trend === "up"
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                            style={{ width: `${stat.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Overall Score
                      </p>
                      <p className="text-2xl font-bold text-gray-900">8.6/10</p>
                    </div>
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3"
                          strokeDasharray="86, 100"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">
                        86%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Reports - Enhanced */}
            <div
              aria-label="Export Reports"
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Export Reports
                    </h2>
                    <p className="text-sm text-gray-300 mt-1">
                      Generate insights & analytics
                    </p>
                  </div>
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Download className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: "Weekly Analytics",
                      format: "PDF",
                      color: "bg-blue-500/20",
                      icon: <BarChart3 className="h-5 w-5" />,
                    },
                    {
                      title: "Writer Performance",
                      format: "CSV",
                      color: "bg-emerald-500/20",
                      icon: <Target className="h-5 w-5" />,
                    },
                    {
                      title: "Content Schedule",
                      format: "Excel",
                      color: "bg-violet-500/20",
                      icon: <Calendar className="h-5 w-5" />,
                    },
                    {
                      title: "Audience Insights",
                      format: "PDF",
                      color: "bg-pink-500/20",
                      icon: <Globe className="h-5 w-5" />,
                    },
                  ].map((report, index) => (
                    <button
                      key={index}
                      className="group w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div
                          className={`p-2 ${report.color} rounded-lg mr-3 group-hover:scale-110 transition-transform`}
                        >
                          <div className="text-white">{report.icon}</div>
                        </div>
                        <div className="text-left">
                          <span className="font-medium text-white">
                            {report.title}
                          </span>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Last updated: Today
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-300">
                          {report.format}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <button className="w-full mt-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Custom Report</span>
                </button>
              </div>
            </div>

            {/* Top Writers */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Top Contributors
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  This week's best performers
                </p>

                <div className="space-y-4">
                  {topWriters.map((writer) => (
                    <div
                      key={writer.rank}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold mr-3">
                        {writer.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold text-gray-900 truncate">
                            {writer.name}
                          </p>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              writer.status === "active"
                                ? "bg-emerald-500"
                                : "bg-gray-400"
                            }`}
                          ></span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {writer.articles} articles • {writer.views} views
                        </p>
                      </div>
                      <button
                        aria-label="More options"
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        aria-label="New Post"
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 active:scale-95 group"
      >
        <div className="relative">
          <Sparkles className="h-6 w-6" />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
        </div>
      </button>
    </div>
  );
}
