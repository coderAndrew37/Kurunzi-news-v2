"use client";

import Image from "next/image";
import { Story as Article } from "@/app/components/types";

export default function ArticleImage({ article }: { article: Article }) {
  const image = article.featuredImage;
  const imageUrl = image?.url ?? article.img;

  if (!imageUrl) return null;

  return (
    <figure className="relative w-full mb-8 rounded-xl overflow-hidden">
      <Image
        src={imageUrl}
        alt={image?.alt || article.title || "Article image"}
        width={1200}
        height={630}
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover w-full h-auto"
      />
      {image?.caption && (
        <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
