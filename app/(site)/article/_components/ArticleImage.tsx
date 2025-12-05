// app/article/_components/ArticleImage.tsx
"use client";

import { Story as Article } from "@/app/components/types";

interface ArticleImageProps {
  article: Article;
}

export default function ArticleImage({ article }: ArticleImageProps) {
  if (!article.img && !article.featuredImage) return null;

  const imageUrl = article.img || article.featuredImage?.url;
  const altText = article.featuredImage?.alt || article.title;

  return (
    <figure className="mb-8">
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-gray-100">
        <img
          src={imageUrl || "/placeholder.jpg"}
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
      {article.featuredImage?.caption && (
        <figcaption className="text-center text-gray-600 mt-3 text-sm italic">
          {article.featuredImage.caption}
        </figcaption>
      )}
    </figure>
  );
}
