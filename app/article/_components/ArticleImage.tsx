"use client";

import Image from "next/image";
import { Story as Article } from "@/app/components/types";

export default function ArticleImage({ article }: { article: Article }) {
  const imageSrc = article.img ?? "/placeholder.jpg"; // fallback path

  return (
    <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
      <Image src={imageSrc} alt={article.title} fill className="object-cover" />
    </div>
  );
}
