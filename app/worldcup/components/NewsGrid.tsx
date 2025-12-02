"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import NewsCard from "./UI/NewsCard";
import { WorldCupArticle, WorldCupCategory } from "./types";

interface NewsGridProps {
  articles: WorldCupArticle[];
  categories: WorldCupCategory[];
}

interface UICategory {
  name: string;
  slug: string;
  color: string;
}

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-600",
  red: "bg-red-600",
  green: "bg-green-600",
  yellow: "bg-yellow-600",
};

export default function NewsGrid({ articles, categories }: NewsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categoriesUI: UICategory[] = [
    { name: "All", slug: "all", color: "bg-blue-600" },
    ...categories.map((c) => ({
      name: c.title,
      slug: c.slug.current,
      color: COLOR_MAP[c.color ?? "blue"],
    })),
  ];

  // Filter articles based on selected category
  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) =>
          selectedCategory === "breaking"
            ? article.isBreaking
            : article.categories.some(
                (cat: WorldCupCategory) => cat.slug.current === selectedCategory
              )
        );

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Separate featured/breaking articles
  const featuredArticle = articles.find(
    (article: WorldCupArticle) => article.featured
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header - Chelsea Style */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">World Cup News</h1>
            <p className="text-gray-600 mt-2">
              Latest updates, matches, and transfers
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Filter className="w-4 h-4 mr-2" />
            <span>{articles.length} articles</span>
          </div>
        </div>

        {/* Category Filter - Chelsea Style */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-200">
          {categoriesUI.map((category) => (
            <button
              key={category.slug}
              onClick={() => {
                setSelectedCategory(category.slug);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                selectedCategory === category.slug
                  ? `${category.color} text-white shadow-md`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article (if any) */}
      {featuredArticle && (
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-2 h-6 bg-blue-600 mr-3"></div>
            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
              Featured Story
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2">
              <NewsCard
                key={featuredArticle._id}
                id={featuredArticle._id}
                slug={featuredArticle.slug.current}
                title={featuredArticle.title}
                excerpt={featuredArticle.excerpt}
                category={
                  featuredArticle.categories?.[0]?.title ?? "Uncategorized"
                }
                date={featuredArticle.publishedAt}
                readTime={featuredArticle.readTime}
                image={
                  featuredArticle.featuredImage
                    ? {
                        asset: {
                          _type: "reference",
                          _ref: featuredArticle.featuredImage,
                        },
                      }
                    : undefined
                }
                variant="featured"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main News Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
            Latest News
          </h2>
          <div className="text-sm text-gray-500">
            Showing {paginatedArticles.length} of {filteredArticles.length}{" "}
            articles
          </div>
        </div>

        {/* Chelsea-style 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map((article) => (
            <NewsCard
              key={article._id}
              id={article._id}
              slug={article.slug.current}
              title={article.title}
              excerpt={article.excerpt}
              category={article.categories?.[0]?.title ?? "Uncategorized"}
              date={article.publishedAt}
              readTime={article.readTime}
              image={
                article.featuredImage
                  ? { asset: { _ref: article.featuredImage } }
                  : undefined
              }
              variant="default"
            />
          ))}
        </div>

        {/* Pagination - Chelsea Style */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center space-x-2">
            <button
              aria-label="Previous Page"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-md transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              aria-label="Next Page"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
