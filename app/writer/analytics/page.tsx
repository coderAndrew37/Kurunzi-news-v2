"use client";

import {
  BarChart3,
  Clock,
  Download,
  Eye,
  MessageSquare,
  Share2,
  ThumbsUp,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = {
    totalViews: 12456,
    totalReads: 8432,
    avgReadTime: "3:42",
    followers: 1243,
    engagementRate: "4.2%",
    topArticle: "The Future of AI Writing",
  };

  const monthlyData = [
    { month: "Jan", views: 1200, reads: 800 },
    { month: "Feb", views: 1800, reads: 1200 },
    { month: "Mar", views: 2400, reads: 1600 },
    { month: "Apr", views: 3200, reads: 2200 },
    { month: "May", views: 2800, reads: 1800 },
    { month: "Jun", views: 3600, reads: 2400 },
  ];

  const topArticles = [
    {
      title: "The Future of AI Writing",
      views: 3560,
      reads: 2840,
      likes: 420,
      shares: 156,
      readTime: "4 min",
    },
    {
      title: "Modern Web Development Trends",
      views: 2840,
      reads: 2240,
      likes: 380,
      shares: 98,
      readTime: "5 min",
    },
    {
      title: "Building Scalable Applications",
      views: 2240,
      reads: 1840,
      likes: 320,
      shares: 64,
      readTime: "6 min",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">
              Track your article performance and audience engagement
            </p>
          </div>
          <div className="flex gap-3">
            <select
              aria-label="Select time range"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Views</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalViews.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.5% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reads</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalReads.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">Read rate: 68%</p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Read Time</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.avgReadTime}
              </p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                +0:24 from average
              </p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Followers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.followers}
              </p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                +45 this month
              </p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Engagement Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Views & Reads Over Time
            </h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center">
                <div className="w-16 text-sm text-gray-600">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(data.views / 4000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {data.views.toLocaleString()} views
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(data.reads / 3000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {data.reads.toLocaleString()} reads
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Articles */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Top Performing Articles
          </h3>
          <div className="space-y-6">
            {topArticles.map((article, index) => (
              <div
                key={index}
                className="pb-4 border-b border-gray-100 last:border-0"
              >
                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Eye className="h-4 w-4 mr-2" />
                    {article.views.toLocaleString()} views
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {article.likes} likes
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Share2 className="h-4 w-4 mr-2" />
                    {article.shares} shares
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Engagement Rate</h4>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.engagementRate}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Industry average: 2.8%
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Comments & Feedback</h4>
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">328</div>
          <div className="text-sm text-gray-600 mt-2">+24 this month</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Social Shares</h4>
            <Share2 className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">1,245</div>
          <div className="text-sm text-gray-600 mt-2">
            Twitter: 42%, LinkedIn: 38%
          </div>
        </div>
      </div>

      {/* Time of Day Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Best Time to Publish
        </h3>
        <div className="grid grid-cols-6 gap-4">
          {[
            { time: "6 AM", value: 30 },
            { time: "9 AM", value: 85 },
            { time: "12 PM", value: 65 },
            { time: "3 PM", value: 75 },
            { time: "6 PM", value: 90 },
            { time: "9 PM", value: 40 },
          ].map((item) => (
            <div key={item.time} className="text-center">
              <div className="mb-2">
                <div className="h-32 bg-gray-100 rounded-lg relative">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-lg"
                    style={{ height: `${item.value}%` }}
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">
                {item.time}
              </div>
              <div className="text-xs text-gray-500">{item.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
