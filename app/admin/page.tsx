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
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArticles: 245,
    pendingReviews: 12,
    publishedToday: 8,
    totalWriters: 42,
    activeWriters: 28,
    avgPublishTime: "2.4h",
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      user: "Alex Johnson",
      action: "submitted article",
      time: "10 min ago",
      type: "submission",
    },
    {
      id: 2,
      user: "Maria Garcia",
      action: "article published",
      time: "25 min ago",
      type: "publish",
    },
    {
      id: 3,
      user: "David Chen",
      action: "account created",
      time: "1 hour ago",
      type: "account",
    },
    {
      id: 4,
      user: "Sarah Miller",
      action: "requires review",
      time: "2 hours ago",
      type: "review",
    },
  ]);

  const [quickStats, setQuickStats] = useState([
    {
      label: "Engagement Rate",
      value: "68%",
      change: "+12%",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      label: "Avg. Read Time",
      value: "4.2min",
      change: "-0.3min",
      icon: <Clock className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      label: "Pending Tasks",
      value: "7",
      change: "-2",
      icon: <AlertCircle className="h-5 w-5" />,
      color: "text-orange-600",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                aria-label="Notifications"
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                aria-label="Settings"
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Articles</p>
                <p className="text-3xl font-bold mt-2">{stats.totalArticles}</p>
                <p className="text-sm text-green-600 mt-1">+12 this week</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold mt-2">
                  {stats.pendingReviews}
                </p>
                <p className="text-sm text-orange-600 mt-1">Needs attention</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published Today</p>
                <p className="text-3xl font-bold mt-2">
                  {stats.publishedToday}
                </p>
                <p className="text-sm text-green-600 mt-1">On track</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Writers</p>
                <p className="text-3xl font-bold mt-2">
                  {stats.activeWriters}/{stats.totalWriters}
                </p>
                <p className="text-sm text-gray-600 mt-1">Currently writing</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Actions
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/admin/users">
                  <div className="group p-6 bg-blue-50 hover:bg-blue-100 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-300 transition-all duration-200 text-left">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-white rounded-lg mr-3 group-hover:scale-110 transition-transform">
                        <Send className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">
                        Invite Writers
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Send invitations & create new writer accounts
                    </p>
                  </div>
                </Link>

                <div className="group p-6 bg-purple-50 hover:bg-purple-100 rounded-xl border-2 border-dashed border-purple-200 hover:border-purple-300 transition-all duration-200 text-left">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-white rounded-lg mr-3 group-hover:scale-110 transition-transform">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-gray-900">
                      Manage Authors
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sync users with author profiles and permissions
                  </p>
                </div>

                <Link href="/admin/reviews">
                  <div className="group p-6 bg-orange-50 hover:bg-orange-100 rounded-xl border-2 border-dashed border-orange-200 hover:border-orange-300 transition-all duration-200 text-left">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-white rounded-lg mr-3 group-hover:scale-110 transition-transform">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">
                        Review Submissions
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      View drafts, approve or request changes
                    </p>
                  </div>
                </Link>

                <Link href="/admin/analytics">
                  <div className="group p-6 bg-green-50 hover:bg-green-100 rounded-xl border-2 border-dashed border-green-200 hover:border-green-300 transition-all duration-200 text-left">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-white rounded-lg mr-3 group-hover:scale-110 transition-transform">
                        <BarChart3 className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">
                        View Analytics
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track performance and engagement metrics
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg mr-4 ${
                        activity.type === "submission"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "publish"
                            ? "bg-green-100 text-green-600"
                            : activity.type === "account"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {activity.type === "submission" ? (
                        <FileText className="h-5 w-5" />
                      ) : activity.type === "publish" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : activity.type === "account" ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Quick Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Stats
              </h2>
              <div className="space-y-6">
                {quickStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-white rounded-lg mr-3 shadow-sm">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Section */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Export Reports
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Generate and download reports for analytics, submissions, or
                user activity.
              </p>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <Download className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium">Weekly Analytics</span>
                  </div>
                  <span className="text-sm text-gray-500">PDF</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <Download className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium">Writer Performance</span>
                  </div>
                  <span className="text-sm text-gray-500">CSV</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <Download className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="font-medium">Content Schedule</span>
                  </div>
                  <span className="text-sm text-gray-500">Excel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
