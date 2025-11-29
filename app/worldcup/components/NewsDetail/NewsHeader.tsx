// app/worldcup/components/NewsDetail/NewsHeader.tsx
"use client";

import { urlFor } from "@/app/lib/sanity.image";
import Image from "next/image";
import NewsSocialShare from "./NewsSocialShare";
import NewsTags from "./NewsTags";
import { WorldCupArticle } from "../types";

interface NewsHeaderProps {
  article: WorldCupArticle;
}

export default function NewsHeader({ article }: NewsHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const primaryCategory = article.categories?.[0];
  const author = article.author;

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-8">
        {/* Category + Date */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {primaryCategory && (
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {primaryCategory.title}
              </span>
            )}

            <span className="text-gray-500 text-sm">
              {formatDate(article.publishedAt)}
            </span>

            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <span className="text-gray-400 text-sm">
                Updated: {formatDate(article.updatedAt)}
              </span>
            )}
          </div>

          {/* Read Time + Share */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 text-sm">
              {article.readTime} min read
            </span>
            <NewsSocialShare article={article} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden relative">
            {author?.image ? (
              <Image
                src={urlFor(author.image).width(48).height(48).url()}
                alt={author.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-semibold">
                {author?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          <div>
            <div className="font-semibold text-gray-900">{author?.name}</div>
            <div className="text-gray-500 text-sm">
              {author?.role || "Contributor"}
            </div>
          </div>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && <NewsTags tags={article.tags} />}
      </div>
    </header>
  );
}
