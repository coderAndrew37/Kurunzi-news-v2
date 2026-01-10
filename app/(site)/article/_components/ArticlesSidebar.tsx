"use client";

import type { ArticleCard, Story } from "@/app/components/types";
import TrendingNews from "@/app/components/TrendingNews";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/app/lib/sanity.utils";
import { urlFor } from "@/app/lib/getHeroStories";
import LatestArticlesSidebar from "@/app/components/LatestArticles";

interface ArticleSidebarProps {
  latestArticles: ArticleCard[];
  trendingArticles: ArticleCard[];
  category?: { title: string; slug: string } | null;
  categoryArticles?: Story[];
}

export default function ArticleSidebar({
  latestArticles,
  trendingArticles,
  category,
  categoryArticles = [],
}: ArticleSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Latest Articles */}
      <LatestArticlesSidebar latestArticles={latestArticles} />

      {/* Trending Articles */}
      <TrendingNews trendingArticles={trendingArticles} />

      {/* Sidebar Ad */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium">ADVERTISEMENT</p>
            <p className="text-gray-500 text-xs mt-1">300x250</p>
          </div>
        </div>
      </div>

      {/* Category Highlights (full Story needed) */}
      {category && categoryArticles.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              More in {category.title}
            </h2>
            <Link
              href={`/category/${category.slug}`}
              className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
            >
              More <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {categoryArticles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/${article.category?.slug}/${article.slug}`}
                className="group block pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-20 aspect-square overflow-hidden rounded">
                    <Image
                      src={
                        article.img ? urlFor(article.img) : "/placeholder.jpg"
                      }
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium group-hover:text-red-600 line-clamp-2">
                      {article.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
