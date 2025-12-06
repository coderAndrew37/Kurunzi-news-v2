"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  FileText,
  Send,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar,
  BarChart,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface Article {
  _id: string;
  title: string;
  status: "draft" | "submitted" | "inReview" | "published";
  createdAt: string;
  category?: string;
  wordCount?: number;
}

export default function WriterDashboard() {
  const { user } = useUser();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    drafts: 0,
    submitted: 0,
    published: 0,
    thisMonth: 0,
  });

  useEffect(() => {
    fetchWriterData();
  }, []);

  const fetchWriterData = async () => {
    try {
      // Simulate API call - replace with your actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with actual data from Sanity
      const mockArticles: Article[] = [
        {
          _id: "1",
          title: "The Future of AI in Journalism",
          status: "draft",
          createdAt: new Date().toISOString(),
          category: "Technology",
          wordCount: 1250,
        },
        {
          _id: "2",
          title: "Climate Change Report 2024",
          status: "submitted",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          category: "Environment",
          wordCount: 2100,
        },
        {
          _id: "3",
          title: "Interview with Tech CEO",
          status: "published",
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          category: "Business",
          wordCount: 1800,
        },
      ];

      setArticles(mockArticles);
      setStats({
        total: 24,
        drafts: 5,
        submitted: 3,
        published: 16,
        thisMonth: 8,
      });
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your articles today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Articles</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.total}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.drafts}
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Submitted</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.submitted}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Send className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.published}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Articles */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Articles
                </h2>
                <Link
                  href="/writer/articles"
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  View all
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {articles.map((article) => (
                <div key={article._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            article.status === "draft"
                              ? "bg-gray-100 text-gray-800"
                              : article.status === "submitted"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {article.status}
                        </span>
                        {article.category && (
                          <span className="text-xs text-gray-500">
                            {article.category}
                          </span>
                        )}
                      </div>

                      <h3 className="font-medium text-gray-900 mb-1">
                        {article.title}
                      </h3>

                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {format(new Date(article.createdAt), "MMM d, yyyy")}
                        </span>
                        {article.wordCount && (
                          <>
                            <span className="mx-2">•</span>
                            <span>
                              {article.wordCount.toLocaleString()} words
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/writer/articles/${article._id}/edit`}
                      className="ml-4 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/writer/articles/new"
                className="flex items-center justify-center w-full px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
              >
                Write New Article
              </Link>
              <Link
                href="/writer/drafts"
                className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
              >
                Continue Draft
              </Link>
            </div>
          </div>

          {/* Writing Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <BarChart className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Writing Stats
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Articles this month</span>
                  <span className="font-medium">{stats.thisMonth}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(stats.thisMonth / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Publish rate</span>
                  <span className="font-medium">67%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-blue-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Avg. review time</span>
                  <span className="font-medium">2.5 days</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-yellow-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
