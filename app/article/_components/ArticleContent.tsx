"use client";

import { Story as Article } from "@/app/components/types";
import { PortableText } from "@portabletext/react";

export default function ArticleContent({ article }: { article: Article }) {
  if (!article.content) return null;

  return (
    <div className="prose prose-lg max-w-none mb-8">
      <PortableText value={article.content} />
    </div>
  );
}
