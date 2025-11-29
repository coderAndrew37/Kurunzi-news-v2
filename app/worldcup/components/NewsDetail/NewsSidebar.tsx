"use client";

import { urlFor } from "@/app/lib/sanity.image"; // adjust path as needed
import Image from "next/image";
import Link from "next/link";
import type { WorldCupArticle } from "../types";

interface NewsSidebarProps {
  currentArticle: WorldCupArticle;
  latestArticles: WorldCupArticle[];
}

export default function NewsSidebar({
  currentArticle,
  latestArticles,
}: NewsSidebarProps) {
  // Filter out current article
  const filteredLatestArticles = Array.isArray(latestArticles)
    ? latestArticles.filter((a) => a._id !== currentArticle._id).slice(0, 5)
    : [];

  const popularArticles = filteredLatestArticles.slice(0, 3);

  /**
   * Build a safe thumbnail URL using Sanity urlFor
   */
  const getThumb = (image: unknown): string | null => {
    if (!image) return null;

    if (typeof image === "string") return image;

    if (typeof image === "object" && image !== null && "asset" in image) {
      try {
        return urlFor(image, null).width(200).height(200).url(); // 👈 added null
      } catch (e) {
        console.warn("urlFor failed:", e);
        return null;
      }
    }

    return null;
  };

  return (
    <aside className="space-y-8">
      {/* Latest News */}
      {filteredLatestArticles.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Latest News</h3>

          <div className="space-y-4">
            {filteredLatestArticles.map((article) => {
              const thumb = getThumb(article.featuredImage);

              return (
                <Link
                  key={article._id}
                  href={`/worldcup/news/${article.slug.current}`}
                  className="block group"
                >
                  <div className="flex space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-green-400"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                        {article.title}
                      </h4>

                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-blue-600 font-medium">
                          {article.categories?.[0]?.title || "News"}
                        </span>

                        {article.publishedAt && (
                          <span className="text-xs text-gray-500">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Popular News */}
      {popularArticles.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Most Popular</h3>

          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <Link
                key={article._id}
                href={`/worldcup/news/${article.slug.current}`}
                className="block group"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl font-bold text-gray-300 flex-shrink-0">
                    {index + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                      {article.title}
                    </h4>

                    <div className="flex items-center space-x-2 mt-1">
                      {article.readTime && (
                        <span className="text-xs text-gray-500">
                          {article.readTime} min read
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-lg shadow-sm p-6 text-white">
        <h3 className="text-xl font-bold mb-2">World Cup Updates</h3>
        <p className="text-blue-100 mb-4">
          Get the latest news and updates delivered to your inbox
        </p>

        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 py-2 rounded font-semibold hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
