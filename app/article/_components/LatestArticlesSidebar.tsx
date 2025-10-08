"use client";

import { Clock } from "lucide-react";
import Link from "next/link";
import { Story as Article } from "@/app/components/types";
import { formatTimeAgo } from "@/app/components/utils/formatTimeAgo";

interface LatestArticlesSidebarProps {
  latestArticles: Article[];
  title?: string;
}

export default function LatestArticlesSidebar({
  latestArticles,
  title = "Latest Articles",
}: LatestArticlesSidebarProps) {
  if (!latestArticles?.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
        {title}
      </h2>

      <div className="space-y-4">
        {latestArticles.map((item) => (
          <Link
            key={item.id}
            href={`/article/${item.slug}`}
            className="block group hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2"></div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(new Date(item.publishedAt ?? ""))}</span>
                  {item.category && (
                    <>
                      <span>•</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                        {item.category.title}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
