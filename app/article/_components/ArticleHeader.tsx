"use client";

import Image from "next/image";
import { Story as Article } from "@/app/components/types";
import { urlFor } from "@/app/lib/sanity.image";
import { useEffect, useState } from "react";
import { getRelativeTime } from "@/app/components/utils/dateUtils";

export default function ArticleHeader({ article }: { article: Article }) {
  const categoryTitle = article.category?.title || "General";

  // ✅ choose best available date
  const dateString =
    article.publishedAt || article.createdAt || article.updatedAt || null;

  const [relativeDate, setRelativeDate] = useState<string>(
    getRelativeTime(dateString)
  );

  // Auto-refresh every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeDate(getRelativeTime(dateString));
    }, 60000);
    return () => clearInterval(interval);
  }, [dateString]);

  return (
    <header className="mb-8">
      <div className="flex items-center mb-4 text-sm text-neutral-500">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 font-medium rounded-full">
          {categoryTitle}
        </span>

        <span className="mx-2 text-neutral-400">•</span>

        <time
          title={
            dateString
              ? new Date(dateString).toLocaleString()
              : "Unknown publish date"
          }
          className="text-neutral-500"
        >
          {relativeDate}
        </time>

        {article.readTime && (
          <>
            <span className="mx-2 text-neutral-400">•</span>
            <span>{article.readTime} min read</span>
          </>
        )}
      </div>

      <h1 className="text-4xl font-bold text-neutral-900 mb-4">
        {article.title}
      </h1>

      {article.subtitle && (
        <p className="text-xl text-neutral-600 mb-6">{article.subtitle}</p>
      )}

      {article.author && typeof article.author !== "string" && (
        <div className="flex items-center mb-6">
          {article.author.image && (
            <Image
              src={urlFor(article.author.image).url()}
              alt={article.author.name}
              width={48}
              height={48}
              className="rounded-full mr-3"
            />
          )}
          <div>
            <p className="font-medium text-neutral-900">
              {article.author.name}
            </p>
            {article.author.role && (
              <p className="text-sm text-neutral-500">{article.author.role}</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
