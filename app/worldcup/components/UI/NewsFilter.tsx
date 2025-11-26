"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface NewsFilterProps {
  categories: string[];
}

export default function NewsFilter({ categories }: NewsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  const updateFilters = (updates: { category?: string; sort?: string }) => {
    const params = new URLSearchParams(searchParams);

    if (updates.category) {
      if (updates.category === "all") {
        params.delete("category");
      } else {
        params.set("category", updates.category);
      }
    }

    if (updates.sort) {
      params.set("sort", updates.sort);
    }

    // Reset to page 1 when filters change
    params.set("page", "1");

    router.push(`/news?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">
            Category:
          </span>
          <button
            onClick={() => updateFilters({ category: "all" })}
            className={`px-3 py-1 text-sm rounded-full transition ${
              currentCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => updateFilters({ category })}
              className={`px-3 py-1 text-sm rounded-full transition ${
                currentCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            aria-label="Sort Button"
            value={currentSort}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
}
