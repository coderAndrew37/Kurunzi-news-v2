"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import NewsCard from "../components/UI/NewsCard";
import NewsCardSkeleton from "../components/UI/NewsCardSkeleton";
import NewsFilter from "../components/UI/NewsFilter";
import Pagination from "../components/UI/Pagination";
import { WorldCupArticle, WorldCupCategory } from "../components/types";

const ITEMS_PER_PAGE = 9;

interface NewsPageClientProps {
  articles: WorldCupArticle[];
  categories: WorldCupCategory[];
}

export default function NewsPageClient({
  articles,
  categories,
}: NewsPageClientProps) {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
  ];

  const categoryTitles = categories.map((c) => c.title);

  // Filtering + sorting
  const filteredArticles = useMemo(() => {
    let filtered = articles || [];

    if (currentCategory !== "all") {
      filtered = filtered.filter((article) =>
        article.categories?.some((c) => c.title === currentCategory)
      );
    }

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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const loading = !articles || articles.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            World Cup News
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest World Cup 2026 news.
          </p>
        </div>

        <NewsFilter categories={categoryTitles} />

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <NewsCardSkeleton key={index} variant="default" />
              ))
            : paginatedArticles.map((article) => (
                <NewsCard
                  key={article._id}
                  id={article._id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.categories?.[0]?.title || "News"}
                  date={article.publishedAt}
                  readTime={article.readTime}
                  variant="default"
                />
              ))}
        </div>

        {!loading && paginatedArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No articles found</div>
            <p className="text-gray-400">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}

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
