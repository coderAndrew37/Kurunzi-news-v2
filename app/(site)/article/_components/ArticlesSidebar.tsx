// app/article/_components/ArticleSidebar.tsx
"use client";

import { Story } from "@/app/components/types";
import { formatDate } from "@/app/lib/sanity.utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ArticleSidebarProps {
  latestArticles: Story[];
  trendingArticles: Story[];
  category?: { title: string; slug: string } | null;
}

export default function ArticleSidebar({
  latestArticles,
  trendingArticles,
  category,
}: ArticleSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Latest News */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Latest News</h2>
          <Link
            href="/latest"
            className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
          >
            More <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {latestArticles.slice(0, 5).map((article, index) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
            >
              <span className="flex-shrink-0 text-gray-400 font-medium text-sm w-6">
                {index + 1}
              </span>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-red-600 text-sm leading-relaxed line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
          <Link
            href="/trending"
            className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
          >
            More <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {trendingArticles.slice(0, 5).map((article, index) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
            >
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-red-600 text-sm leading-relaxed line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <span>{article.views?.toLocaleString()} views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sidebar Ad */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium">ADVERTISEMENT</p>
            <p className="text-gray-500 text-xs mt-1">300x250</p>
          </div>
        </div>
      </div>

      {/* Category Highlights */}
      {category && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              More in {category.title}
            </h2>
            <Link
              href={`/${category.slug}`}
              className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
            >
              More <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {latestArticles
              .filter((article) => article.category?.slug === category.slug)
              .slice(0, 3)
              .map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group block pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-20">
                      <div className="aspect-square overflow-hidden rounded">
                        <img
                          src={article.img || "/placeholder.jpg"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-red-600 text-sm leading-relaxed line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup (Compact) */}
      <div className="bg-red-50 rounded-lg border border-red-200 p-6">
        <h3 className="font-bold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-gray-600 text-sm mb-4">
          Get the latest news delivered directly to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
