// app/news/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import NewsCard from "../components/UI/NewsCard";
import NewsCardSkeleton from "../components/UI/NewsCardSkeleton";
import Pagination from "../components/UI/Pagination";
import NewsFilter from "../components/UI/NewsFilter";
import Breadcrumb from "../components/UI/Breadcrumb";
import { useSearchParams } from "next/navigation";
import { newsArticles } from "@/app/data/newsData";

const ITEMS_PER_PAGE = 9;

export default function NewsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  // Get current filters from URL
  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(newsArticles.map((article) => article.category)));
  }, []);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = newsArticles;

    // Filter by category
    if (currentCategory !== "all") {
      filtered = filtered.filter(
        (article) => article.category === currentCategory
      );
    }

    // Sort articles
    filtered = [...filtered].sort((a, b) => {
      switch (currentSort) {
        case "oldest":
          return (
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
          );
        case "popular":
          return b.readTime - a.readTime;
        case "newest":
        default:
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
      }
    });

    return filtered;
  }, [currentCategory, currentSort]);

  // Paginate articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentPage, currentCategory, currentSort]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page Header */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            World Cup News
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, updates, and announcements for
            the FIFA World Cup 2026
          </p>
        </div>

        {/* Filters */}
        <NewsFilter categories={categories} />

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          {loading
            ? // Show skeletons while loading
              Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <NewsCardSkeleton key={index} variant="default" />
              ))
            : // Show actual news cards
              paginatedArticles.map((article) => (
                <NewsCard
                  date={""}
                  key={article.id}
                  {...article}
                  variant="default"
                />
              ))}
        </div>

        {/* No Results Message */}
        {!loading && paginatedArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No articles found</div>
            <p className="text-gray-400">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/news"
          />
        )}
      </div>
    </div>
  );
}
