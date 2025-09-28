"use client";

import Image from "next/image";
import { Story as Article } from "@/app/components/types";
import { urlFor } from "@/app/lib/sanity.image";

export default function ArticleHeader({ article }: { article: Article }) {
  const categoryTitle = article.category?.title || "General";

  return (
    <header className="mb-8">
      {/* Meta Info */}
      <div className="flex items-center mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
          {categoryTitle}
        </span>
        <span className="mx-2 text-neutral-400">•</span>
        <span className="text-neutral-500 text-sm">
          {article.createdAt || article.publishedAt}
        </span>
        <span className="mx-2 text-neutral-400">•</span>
        <span className="text-neutral-500 text-sm">
          {article.readTime} min read
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-neutral-900 mb-4">
        {article.title}
      </h1>

      {/* Subtitle */}
      {article.subtitle && (
        <p className="text-xl text-neutral-600 mb-6">{article.subtitle}</p>
      )}

      {/* Author */}
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
