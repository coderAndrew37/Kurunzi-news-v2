"use client";

import Image from "next/image";
import { Story as Article } from "@/app/components/types";

export default function ArticleImage({ article }: { article: Article }) {
  if (!article?.img) return null; // skip rendering if no image

  return (
    <figure className="relative w-full h-[480px] mb-8 rounded-xl overflow-hidden">
      <Image
        src={article.img}
        alt={article.title ?? "Article image"}
        fill
        priority // ✅ ensures LCP (largest contentful paint) loads fast
        sizes="(max-width: 768px) 100vw, 1200px" // ✅ responsive image hints
        className="object-cover"
      />
      {article.title && (
        <figcaption className="sr-only">{article.title}</figcaption>
      )}
    </figure>
  );
}
