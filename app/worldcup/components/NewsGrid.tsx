"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import NewsCard from "./UI/NewsCard";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  author: { name: string; slug: string };
  image?: string;
  readTime: number;
  isBreaking: boolean;
  isFeatured: boolean;
}

interface NewsGridProps {
  articles: Article[];
}

// Chelsea FC inspired categories with colors
const CATEGORIES = [
  { name: "All", slug: "all", color: "bg-blue-600" },
  { name: "Matches", slug: "matches", color: "bg-green-600" },
  { name: "Transfers", slug: "transfers", color: "bg-yellow-500" },
  { name: "Interviews", slug: "interviews", color: "bg-purple-600" },
  { name: "Analysis", slug: "analysis", color: "bg-indigo-600" },
];

export default function NewsGrid({ articles }: NewsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter articles based on selected category
  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) =>
          selectedCategory === "breaking"
            ? article.isBreaking
            : article.category.toLowerCase() === selectedCategory
        );

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Separate featured/breaking articles
  const featuredArticle = articles.find((article) => article.isFeatured);
  const breakingArticles = articles.filter((article) => article.isBreaking);
  const regularArticles = articles.filter(
    (article) => !article.isFeatured && !article.isBreaking
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
          {CATEGORIES.map((category) => (
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

      {/* Breaking News Banner (if any) */}
      {/* {breakingArticles.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-2 h-6 bg-red-600 mr-3"></div>
            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
              Breaking News
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breakingArticles.slice(0, 3).map((article) => (
              <NewsCard
                key={article._id}
                id={article._id}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                date={article.publishedAt}
                readTime={article.readTime}
                image={
                  article.image ? { asset: { _ref: article.image } } : undefined
                }
                variant="headline"
              />
            ))}
          </div>
        </div>
      )} */}

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
                slug={featuredArticle.slug}
                title={featuredArticle.title}
                excerpt={featuredArticle.excerpt}
                category={featuredArticle.category}
                date={featuredArticle.publishedAt}
                readTime={featuredArticle.readTime}
                image={
                  featuredArticle.image
                    ? { asset: { _ref: featuredArticle.image } }
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
              slug={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              date={article.publishedAt}
              readTime={article.readTime}
              image={
                article.image ? { asset: { _ref: article.image } } : undefined
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

      {/* Newsletter Signup - Chelsea Style */}
      <div className="mt-16 p-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
        <p className="text-blue-100 mb-6">
          Get the latest World Cup news delivered to your inbox
        </p>
        <form className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-400 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
