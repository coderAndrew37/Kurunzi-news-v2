// app/category/_components/CategoryArchiveSidebar.tsx
import { Story } from "@/app/components/types";
import { AppCategory } from "@/app/lib/api";
import { TrendingUp, Calendar, Eye, Bookmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/app/lib/sanity.utils";

interface CategoryArchiveSidebarProps {
  category: AppCategory;
  trendingArticles: Story[];
  latestArticles: Story[];
  currentPage: number;
  totalArticles: number;
}

export default function CategoryArchiveSidebar({
  category,
  trendingArticles,
  latestArticles,
  currentPage,
  totalArticles,
}: CategoryArchiveSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Category Info */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          About {category.title}
        </h3>
        <p className="text-gray-700 text-sm mb-4">
          {category.description ||
            `Stay updated with the latest news and analysis in ${category.title}.`}
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Total Articles</span>
            <span className="font-semibold">{totalArticles}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Current Page</span>
            <span className="font-semibold">{currentPage}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Most Active</span>
            <span className="font-semibold">This Week</span>
          </div>
        </div>
      </div>

      {/* Trending Now */}
      {trendingArticles.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Trending Now</h3>
          </div>
          <div className="space-y-4">
            {trendingArticles.map((article, index) => (
              <div key={article.id} className="flex items-start">
                <div className="flex-shrink-0 w-8">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-3">
                  <Link
                    href={`/${article.category?.slug}/${article.slug}`}
                    className="font-medium text-gray-900 hover:text-red-600 line-clamp-2 text-sm"
                  >
                    {article.title}
                  </Link>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    {article.views && (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{article.views.toLocaleString()} views</span>
                        <span className="mx-2">•</span>
                      </>
                    )}
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest Stories */}
      {latestArticles.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Latest Stories</h3>
          </div>
          <div className="space-y-4">
            {latestArticles.map((article) => (
              <Link
                key={article.id}
                href={`/${article.category?.slug}/${article.slug}`}
                className="group flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={article.img || "/placeholder.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover rounded group-hover:scale-105 transition-transform duration-200"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-red-600 line-clamp-2 text-sm mb-1">
                    {article.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{formatDate(article.publishedAt)}</span>
                    {article.readTime && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{article.readTime} min</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
        <div className="space-y-3">
          <Link
            href={`/${category.slug}`}
            className="flex items-center justify-between text-gray-700 hover:text-red-600"
          >
            <span>Simple View</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-between text-gray-700 hover:text-red-600"
          >
            <span>Homepage</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
          <button className="flex items-center justify-between text-gray-700 hover:text-red-600 w-full">
            <span>Save Category</span>
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Ad Space */}
      <div className="border border-gray-300 p-6 text-center rounded-xl">
        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
          Advertisement
        </p>
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Ad Space 300x250</span>
        </div>
      </div>
    </div>
  );
}
