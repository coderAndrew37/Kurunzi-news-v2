// app/news/page.tsx
"use client";

import { serverClient } from "@/app/lib/sanity.server";
import {
  allWorldCupArticlesQuery,
  worldCupCategoriesQuery,
} from "@/app/lib/worldcupQueries";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import NewsCard from "../components/UI/NewsCard";
import NewsCardSkeleton from "../components/UI/NewsCardSkeleton";
import NewsFilter from "../components/UI/NewsFilter";
import Pagination from "../components/UI/Pagination";

const ITEMS_PER_PAGE = 9;

interface WorldCupArticle {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  featuredImage?: any;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    image?: any;
  };
  categories: Array<{
    title: string;
    slug: {
      current: string;
    };
    color?: string;
  }>;
  tags: string[];
  readTime: number;
  featured?: boolean;
  matchDetails?: any;
}

interface WorldCupCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string;
  icon?: string;
}

export default function NewsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<WorldCupArticle[]>([]);
  const [categories, setCategories] = useState<WorldCupCategory[]>([]);

  // Get current filters from URL
  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  // Fetch data from Sanity
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching articles...");
        const [articlesData, categoriesData] = await Promise.all([
          serverClient.fetch(allWorldCupArticlesQuery),
          serverClient.fetch(worldCupCategoriesQuery),
        ]);

        setArticles(articlesData);
        console.log("Fetched articles:", articlesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Extract category titles for filter
  const categoryTitles = useMemo(() => {
    return categories.map((cat) => cat.title);
  }, [categories]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by category
    if (currentCategory !== "all") {
      filtered = filtered.filter((article) =>
        article.categories.some((cat) => cat.title === currentCategory)
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
  }, [articles, currentCategory, currentSort]);

  // Paginate articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

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
        <NewsFilter categories={categoryTitles} />

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
                  key={article._id}
                  id={article._id}
                  slug={article.slug.current}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.categories[0]?.title || "News"}
                  date={article.publishedAt}
                  readTime={article.readTime}
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
