// app/writer/articles/page.tsx
"use client";

import { createBrowserSupabase } from "@/lib/supabase-browser";
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  MoreVertical,
  Search,
  Send,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DraftArticleRow } from "../_components/types";

interface Article {
  _id: string;
  title: string;
  status: "draft" | "submitted" | "inReview" | "published" | "rejected";
  createdAt: string;
  updatedAt: string;
  category?: string;
  wordCount?: number;
  readTime?: number;
  views?: number;
}

export default function ArticlesPage() {
  const supabase = createBrowserSupabase();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    async function loadArticles() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = (await supabase
        .from("draft_articles")
        .select("*, article_stats(views)")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false })) as {
        data: DraftArticleRow[] | null;
        error: unknown;
      };

      if (error) {
        console.error("Failed to load articles:", error);
        return;
      }
      const mappedArticles: Article[] =
        data?.map((a) => ({
          _id: a.id,
          title: a.title,
          status: a.status,
          createdAt: a.created_at,
          updatedAt: a.updated_at,
          wordCount: a.word_count ?? 0,
          readTime: Math.ceil((a.word_count ?? 0) / 200),
          views: a.article_stats?.views ?? 0,
        })) ?? [];

      setArticles(mappedArticles);
      setLoading(false);
    }

    loadArticles();
  }, [supabase]);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "all" || article.status === filter;
    return matchesSearch && matchesFilter;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "views":
        return (b.views || 0) - (a.views || 0);
      case "wordCount":
        return (b.wordCount || 0) - (a.wordCount || 0);
      default:
        return 0;
    }
  });

  const statusCounts = {
    all: articles.length,
    draft: articles.filter((a) => a.status === "draft").length,
    submitted: articles.filter((a) => a.status === "submitted").length,
    published: articles.filter((a) => a.status === "published").length,
    inReview: articles.filter((a) => a.status === "inReview").length,
    rejected: articles.filter((a) => a.status === "rejected").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "inReview":
        return "bg-yellow-100 text-yellow-800";
      case "published":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Clock className="h-4 w-4" />;
      case "submitted":
        return <Send className="h-4 w-4" />;
      case "published":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
            <p className="text-gray-600 mt-2">
              Manage all your articles in one place
            </p>
          </div>
          <Link
            href="/writer/articles/new"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            New Article
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-2xl font-bold text-gray-900">
            {statusCounts.all}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Drafts</div>
          <div className="text-2xl font-bold text-gray-900">
            {statusCounts.draft}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Submitted</div>
          <div className="text-2xl font-bold text-gray-900">
            {statusCounts.submitted}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">In Review</div>
          <div className="text-2xl font-bold text-gray-900">
            {statusCounts.inReview}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Published</div>
          <div className="text-2xl font-bold text-gray-900">
            {statusCounts.published}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Rejected</div>
          <div className="text-2xl font-bold text-gray-900">
            {statusCounts.rejected}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative">
              <select
                aria-label="status filter selector"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="inReview">In Review</option>
                <option value="published">Published</option>
                <option value="rejected">Rejected</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                aria-label="sort by selector"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="views">Most Views</option>
                <option value="wordCount">Longest First</option>
              </select>
              <TrendingUp className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                  Article
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                  Words
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                  Views
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                  Last Updated
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedArticles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(article.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}
                      >
                        {getStatusIcon(article.status)}
                        {article.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900 font-medium">
                      {article.wordCount?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      ~{article.readTime} min read
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900 font-medium">
                      {article.views?.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-500">
                      {new Date(article.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {article.status === "draft" && (
                        <Link
                          href={`/writer/articles/${article._id}/edit`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Edit
                        </Link>
                      )}
                      <Link
                        href={`/writer/articles/${article._id}`}
                        className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                      >
                        View
                      </Link>
                      <button
                        aria-label="view button"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedArticles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 mb-4">
              {search
                ? "Try a different search term"
                : "Start by creating your first article"}
            </p>
            <Link
              href="/writer/articles/new"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Create New Article →
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedArticles.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing 1-{Math.min(10, sortedArticles.length)} of{" "}
            {sortedArticles.length} articles
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 text-blue-600 border-blue-200">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
