"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { formatTimeAgo } from "@/app/components/utils/formatDate";
import type { ArticleCard } from "@/app/components/types";

interface LatestArticlesSidebarProps {
  latestArticles: ArticleCard[];
  title?: string;
}

export default function LatestArticlesSidebar({
  latestArticles,
  title = "Latest",
}: LatestArticlesSidebarProps) {
  if (!latestArticles.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-bold mb-4 pb-3 border-b">{title}</h2>

      <div className="space-y-4">
        {latestArticles.map((article) => {
          if (!article.category?.slug) return null;

          const href = article.subcategory?.slug
            ? `/${article.category.slug}/${article.subcategory.slug}/${article.slug}`
            : `/${article.category.slug}/${article.slug}`;

          return (
            <Link
              key={article._id}
              href={href}
              className="flex gap-3 group hover:bg-gray-50 p-3 rounded-lg"
            >
              {article.mainImage?.asset?.url && (
                <Image
                  src={article.mainImage.asset.url}
                  alt={article.mainImage.alt ?? article.title}
                  width={64}
                  height={48}
                  className="rounded object-cover"
                />
              )}

              <div className="flex-1">
                <h3 className="text-sm font-medium group-hover:text-red-600 line-clamp-2">
                  {article.title}
                </h3>

                {article.publishedAt && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(new Date(article.publishedAt))}</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
