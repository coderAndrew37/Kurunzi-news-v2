"use client";

import { Story } from "@/app/components/types";
import { formatDate } from "@/app/lib/sanity.utils";
import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface InlineRelatedArticlesProps {
  articles: Story[];
  title?: string;
  layout?: "horizontal" | "vertical" | "compact";
  position?: number;
  showCount?: number;
}

export default function InlineRelatedArticles({
  articles,
  title = "Related Stories",
  layout = "horizontal",
  showCount = 3,
}: InlineRelatedArticlesProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!articles || articles.length === 0) return null;

  const displayArticles = articles.slice(0, showCount);

  const renderHorizontalLayout = () => (
    <div className={`my-12 ${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
      <div className="border-t border-b border-gray-200 py-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {articles.length > showCount && (
            <Link
              href="/latest"
              className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
            >
              More stories <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayArticles.map((article) => (
            <Link
              key={article.id}
              href={`/${article.category?.slug}/${article.slug}`}
              className="group block"
            >
              <div className="relative h-48 overflow-hidden rounded-lg mb-3">
                <Image
                  src={article.img || "/placeholder.jpg"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                {article.title}
              </h4>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-3 w-3 mr-1" />
                <span>{article.readTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVerticalLayout = () => (
    <div className={`my-12 ${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className="space-y-4">
          {displayArticles.map((article) => (
            <Link
              key={article.id}
              href={`/${article.category?.slug}/${article.slug}`}
              className="group flex items-start pb-4 border-b border-gray-200 last:border-0"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>
              <div className="ml-4 w-20 flex-shrink-0">
                <div className="relative h-16 overflow-hidden rounded">
                  <Image
                    src={article.img || "/placeholder.jpg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    fill
                    sizes="(max-width: 768px) 100vw, 80px"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompactLayout = () => (
    <div className={`my-12 ${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
      <div className="border-l-4 border-red-600 pl-4 py-2">
        <h4 className="font-bold text-gray-900 mb-3 text-lg">{title}</h4>
        <div className="space-y-3">
          {displayArticles.map((article) => (
            <Link
              key={article.id}
              href={`/${article.category?.slug}/${article.slug}`}
              className="group block"
            >
              <p className="text-gray-700 group-hover:text-red-600 text-sm leading-relaxed">
                {article.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  switch (layout) {
    case "vertical":
      return renderVerticalLayout();
    case "compact":
      return renderCompactLayout();
    default:
      return renderHorizontalLayout();
  }
}
