"use client";

import { Story } from "@/app/components/types";
import { formatDate } from "@/app/lib/sanity.utils";
import { Clock, TrendingUp, Star, Hash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RelatedContentProps {
  articles: Story[];
  currentArticle: Story;
  type?: "related" | "trending" | "category" | "tags";
  title?: string;
  maxArticles?: number;
}

export default function RelatedContent({
  articles,
  currentArticle,
  type = "related",
  title,
  maxArticles = 3,
}: RelatedContentProps) {
  const [sortedArticles, setSortedArticles] = useState<Story[]>([]);

  // Safe date helper
  const toDate = (value?: string | null) => {
    return value ? new Date(value) : null;
  };

  useEffect(() => {
    const filtered = articles.filter((a) => a.id !== currentArticle.id);
    const sorted = [...filtered];

    switch (type) {
      case "trending":
        sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;

      case "category":
        sorted.sort((a, b) => {
          const aSameCat =
            a.category?.slug === currentArticle.category?.slug ? 1 : 0;
          const bSameCat =
            b.category?.slug === currentArticle.category?.slug ? 1 : 0;

          const aDate = toDate(a.publishedAt);
          const bDate = toDate(b.publishedAt);

          return (
            bSameCat - aSameCat ||
            (bDate?.getTime() || 0) - (aDate?.getTime() || 0)
          );
        });
        break;

      case "tags":
        sorted.sort((a, b) => {
          const aTags = a.tags || [];
          const bTags = b.tags || [];
          const currentTags = currentArticle.tags || [];

          const aMatches = aTags.filter((tag) =>
            currentTags.includes(tag)
          ).length;
          const bMatches = bTags.filter((tag) =>
            currentTags.includes(tag)
          ).length;

          return bMatches - aMatches;
        });
        break;

      default:
        sorted.sort((a, b) => {
          let scoreA = 0;
          let scoreB = 0;

          if (a.category?.slug === currentArticle.category?.slug) scoreA += 2;
          if (b.category?.slug === currentArticle.category?.slug) scoreB += 2;

          // Recency
          const aFormatted = formatDate(a.publishedAt);
          const bFormatted = formatDate(b.publishedAt);
          const cFormatted = formatDate(currentArticle.publishedAt);

          const aDate = aFormatted ? new Date(aFormatted) : null;
          const bDate = bFormatted ? new Date(bFormatted) : null;
          const cDate = cFormatted ? new Date(cFormatted) : null;

          if (aDate && bDate && cDate) {
            const aRecency = Math.abs(cDate.getTime() - aDate.getTime());
            const bRecency = Math.abs(cDate.getTime() - bDate.getTime());

            if (aRecency < bRecency) scoreA += 1;
            if (bRecency < aRecency) scoreB += 1;
          }

          scoreA += (a.views || 0) / 1000;
          scoreB += (b.views || 0) / 1000;

          return scoreB - scoreA;
        });
        break;
    }

    setSortedArticles(sorted.slice(0, maxArticles));
  }, [articles, currentArticle, type, maxArticles]);

  const getTitle = () => {
    if (title) return title;

    switch (type) {
      case "trending":
        return "Trending Now";
      case "category":
        return `More in ${currentArticle.category?.title || "This Category"}`;
      case "tags":
        return "Related Topics";
      default:
        return "You May Also Like";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "trending":
        return <TrendingUp className="h-5 w-5" />;
      case "category":
        return <Star className="h-5 w-5" />;
      case "tags":
        return <Hash className="h-5 w-5" />;
      default:
        return null;
    }
  };

  if (sortedArticles.length === 0) return null;

  return (
    <div className="my-12 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center mb-6">
        {getIcon() && <div className="mr-3 text-red-600">{getIcon()}</div>}
        <h3 className="text-xl font-bold text-gray-900">{getTitle()}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedArticles.map((article, index) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group block hover:bg-gray-50 p-4 rounded-lg transition-all duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold text-sm">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2 text-sm">
                  {article.title}
                </h4>
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{article.readTime || 3} min read</span>
                  {article.views && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{article.views.toLocaleString()} views</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">
            Keep reading for more insights
          </p>
          <Link
            href={`/${currentArticle.category?.slug || "latest"}`}
            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
          >
            Browse all {currentArticle.category?.title || "news"} →
          </Link>
        </div>
      </div>
    </div>
  );
}
