"use client";

import { createBrowserSupabase } from "@/lib/supabase-browser";
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  MoreVertical,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DraftArticleRow } from "../_components/types";

interface Draft {
  _id: string;
  title: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  wordCount: number;
  readTime: number;
  category?: string;
}

export default function DraftsPage() {
  const supabase = createBrowserSupabase();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDrafts, setSelectedDrafts] = useState<string[]>([]);

  useEffect(() => {
    async function loadDrafts() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = (await supabase
        .from("draft_articles")
        .select(
          "id, title, excerpt, created_at, updated_at, word_count, category_id"
        )
        .eq("author_id", user.id)
        .eq("status", "draft")
        .order("updated_at", { ascending: false })) as {
        data: DraftArticleRow[] | null;
        error: unknown;
      };

      if (error) {
        console.error("Failed to load drafts:", error);
        return;
      }

      const mappedDrafts: Draft[] =
        data?.map((d) => ({
          _id: d.id,
          title: d.title ?? "Untitled Draft",
          excerpt: d.excerpt ?? "No description available",
          createdAt: d.created_at,
          updatedAt: d.updated_at,
          wordCount: d.word_count ?? 0,
          readTime: Math.ceil((d.word_count ?? 0) / 200),
          category: d.category_id ?? undefined,
        })) ?? [];

      setDrafts(mappedDrafts);
      setLoading(false);
    }

    loadDrafts();
  }, [supabase]);

  const filteredDrafts = drafts.filter(
    (draft) =>
      draft.title.toLowerCase().includes(search.toLowerCase()) ||
      draft.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedDrafts.length === filteredDrafts.length) {
      setSelectedDrafts([]);
    } else {
      setSelectedDrafts(filteredDrafts.map((d) => d._id));
    }
  };

  const handleDeleteSelected = async () => {
    if (!confirm("Are you sure you want to delete selected drafts?")) return;

    // Delete logic here
    console.log("Deleting:", selectedDrafts);
    setSelectedDrafts([]);
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
            <h1 className="text-3xl font-bold text-gray-900">Drafts</h1>
            <p className="text-gray-600 mt-2">
              Continue editing your unfinished articles
            </p>
          </div>
          <div className="flex gap-3">
            {selectedDrafts.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete ({selectedDrafts.length})
              </button>
            )}
            <Link
              href="/writer/articles/new"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              New Draft
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Drafts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {drafts.length}
              </p>
            </div>
            <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Words</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {drafts
                  .reduce((sum, d) => sum + d.wordCount, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Words/Draft</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {drafts.length > 0
                  ? Math.round(
                      drafts.reduce((sum, d) => sum + d.wordCount, 0) /
                        drafts.length
                    ).toLocaleString()
                  : "0"}
              </p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Oldest Draft</p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {drafts.length > 0
                  ? new Date(
                      drafts[drafts.length - 1].createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search drafts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Drafts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrafts.map((draft) => (
          <div
            key={draft._id}
            className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
              selectedDrafts.includes(draft._id) ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {/* Checkbox */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDrafts.includes(draft._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDrafts([...selectedDrafts, draft._id]);
                      } else {
                        setSelectedDrafts(
                          selectedDrafts.filter((id) => id !== draft._id)
                        );
                      }
                    }}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Select</span>
                </label>
                <button
                  aria-label="show more button"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Draft Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
                  {draft.title}
                </h3>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{draft.excerpt}</p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>{draft.wordCount.toLocaleString()} words</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>~{draft.readTime} min</span>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  Updated {new Date(draft.updatedAt).toLocaleDateString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href={`/writer/articles/${draft._id}/edit`}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Continue
                </Link>
                <button
                  aria-label="draft delete button"
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this draft?")
                    ) {
                      // Delete logic
                    }
                  }}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDrafts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No drafts found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {search
              ? "No drafts match your search. Try different keywords."
              : "You don't have any drafts yet. Start writing your first article!"}
          </p>
          <Link
            href="/writer/articles/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            <FileText className="h-4 w-4" />
            Create Your First Draft
          </Link>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedDrafts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg px-6 py-4 flex items-center gap-6">
            <span className="text-gray-900 font-medium">
              {selectedDrafts.length} draft
              {selectedDrafts.length !== 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-3">
              <button
                onClick={handleSelectAll}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Select All
              </button>
              <button
                onClick={handleDeleteSelected}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedDrafts([])}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
