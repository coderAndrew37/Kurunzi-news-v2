// app/category/_components/FilterSidebar.tsx
"use client";

import { Filter, X, Calendar, Tag, Folder, Clock } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface FilterSidebarProps {
  title: string;
  filterOptions: {
    subcategories?: Array<{ title: string; slug: string; count: number }>;
    years?: string[];
    tags?: Array<{ tag: string; count: number }>;
  };
  currentPage: number;
  basePath: string;
}

export default function FilterSidebar({
  title,
  filterOptions,
  currentPage,
  basePath,
}: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const [activeFilters, setActiveFilters] = useState({
    subcategory: searchParams.get("subcategory") || "",
    tag: searchParams.get("tag") || "",
    year: searchParams.get("year") || "",
    sort: searchParams.get("sort") || "latest",
  });

  const buildFilterUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set("page", "1"); // Reset to first page when filtering
    return `${basePath}?${params.toString()}`;
  };

  const clearFilters = () => {
    window.location.href = `${basePath}?page=1`;
  };

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {activeFilters.subcategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {activeFilters.subcategory}
                  <button
                    aria-label="Remove subcategory filter"
                    onClick={() =>
                      (window.location.href = buildFilterUrl({
                        subcategory: null,
                      }))
                    }
                    className="hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {activeFilters.tag && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  #{activeFilters.tag}
                  <button
                    aria-label="Remove tag filter"
                    onClick={() =>
                      (window.location.href = buildFilterUrl({ tag: null }))
                    }
                    className="hover:text-green-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {activeFilters.year && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  Year: {activeFilters.year}
                  <button
                    aria-label="close button"
                    onClick={() =>
                      (window.location.href = buildFilterUrl({ year: null }))
                    }
                    className="hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Sort By
          </h4>
          <div className="space-y-2">
            {[
              { value: "latest", label: "Latest First" },
              { value: "oldest", label: "Oldest First" },
              { value: "popular", label: "Most Popular" },
              { value: "featured", label: "Featured" },
            ].map((option) => (
              <Link
                key={option.value}
                href={buildFilterUrl({ sort: option.value })}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeFilters.sort === option.value
                    ? "bg-gradient-to-r from-red-50 to-orange-50 text-red-700 font-medium border border-red-200"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Subcategories */}
      {filterOptions.subcategories &&
        filterOptions.subcategories.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Subcategories
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {filterOptions.subcategories.map((subcat) => (
                <Link
                  key={subcat.slug}
                  href={buildFilterUrl({ subcategory: subcat.slug })}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeFilters.subcategory === subcat.slug
                      ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{subcat.title}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeFilters.subcategory === subcat.slug
                        ? "bg-white/20"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {subcat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      {/* Tags */}
      {filterOptions.tags && filterOptions.tags.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Popular Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {filterOptions.tags.slice(0, 15).map((tagItem) => (
              <Link
                key={tagItem.tag}
                href={buildFilterUrl({ tag: tagItem.tag })}
                className={`inline-block px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeFilters.tag === tagItem.tag
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                #{tagItem.tag} ({tagItem.count})
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Years */}
      {filterOptions.years && filterOptions.years.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Archive By Year
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {filterOptions.years.map((year) => (
              <Link
                key={year}
                href={buildFilterUrl({ year })}
                className={`text-center px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeFilters.year === year
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {year}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4">
        <h4 className="font-semibold text-red-900 mb-2">{title} Stats</h4>
        <div className="space-y-2 text-sm text-red-800">
          <div className="flex justify-between">
            <span>Total Articles:</span>
            <span className="font-semibold">{/* Add count */}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated:</span>
            <span className="font-semibold">Today</span>
          </div>
          <div className="flex justify-between">
            <span>Avg. Read Time:</span>
            <span className="font-semibold">5 min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
