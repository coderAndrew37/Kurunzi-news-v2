// app/search/_components/SearchFilters.tsx
"use client";

import { Filter, Calendar, Type, SortAsc, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchFiltersProps {
  query: string;
  currentPage: number;
  typeFilter: string;
  dateFilter: string;
  sortBy: string;
  totalResults: number;
}

export default function SearchFilters({
  query,
  currentPage,
  typeFilter,
  dateFilter,
  sortBy,
  totalResults,
}: SearchFiltersProps) {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (filterType: string, value: string) => {
    const params = new URLSearchParams();
    params.set("q", query);
    params.set("page", "1"); // Reset to page 1 when filter changes

    // Add existing filters
    if (filterType !== "type" && typeFilter !== "all")
      params.set("type", typeFilter);
    if (filterType !== "date" && dateFilter !== "all")
      params.set("date", dateFilter);
    if (filterType !== "sort" && sortBy !== "relevance")
      params.set("sort", sortBy);

    // Add new filter
    if (filterType === "type" && value !== "all") params.set("type", value);
    if (filterType === "date" && value !== "all") params.set("date", value);
    if (filterType === "sort" && value !== "relevance")
      params.set("sort", value);

    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=1`);
  };

  const hasActiveFilters =
    typeFilter !== "all" || dateFilter !== "all" || sortBy !== "relevance";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <span className="text-sm text-gray-500">
            {totalResults.toLocaleString()} results
          </span>
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-medium"
            >
              <X className="h-4 w-4" />
              Clear all
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            {showFilters ? "Hide" : "Show"} filters
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {typeFilter !== "all" && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full">
                Type: {typeFilter}
                <button
                  aria-label="Remove type filter"
                  onClick={() => updateFilter("type", "all")}
                  className="hover:text-blue-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {dateFilter !== "all" && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded-full">
                Date: {dateFilter}
                <button
                  aria-label="Remove date filter"
                  onClick={() => updateFilter("date", "all")}
                  className="hover:text-green-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {sortBy !== "relevance" && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 text-sm rounded-full">
                Sort: {sortBy}
                <button
                  aria-label="Remove sort filter"
                  onClick={() => updateFilter("sort", "relevance")}
                  className="hover:text-purple-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Filter Controls - Hidden on mobile unless toggled */}
      <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sort By */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
              <SortAsc className="h-4 w-4 text-gray-500" />
              Sort by
            </label>
            <div className="space-y-2">
              {[
                { value: "relevance", label: "Relevance" },
                { value: "latest", label: "Latest first" },
                { value: "oldest", label: "Oldest first" },
                { value: "popular", label: "Most popular" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFilter("sort", option.value)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    sortBy === option.value
                      ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              Date
            </label>
            <div className="space-y-2">
              {[
                { value: "all", label: "All time" },
                { value: "today", label: "Today" },
                { value: "week", label: "This week" },
                { value: "month", label: "This month" },
                { value: "year", label: "This year" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFilter("date", option.value)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    dateFilter === option.value
                      ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
              <Type className="h-4 w-4 text-gray-500" />
              Content Type
            </label>
            <div className="space-y-2">
              {[
                { value: "all", label: "All content" },
                { value: "articles", label: "Articles only" },
                { value: "news", label: "News" },
                { value: "analysis", label: "Analysis" },
                { value: "opinion", label: "Opinion" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFilter("type", option.value)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    typeFilter === option.value
                      ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
