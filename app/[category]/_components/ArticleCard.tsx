import { Story } from "@/app/components/types";
import { urlFor } from "@/app/lib/sanity.image";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  article: Story;
  categoryLabel?: string;
  href: string;
  variant?: "default" | "featured" | "compact";
}

export default function ArticleCard({
  article,
  categoryLabel,
  href,
  variant = "default",
}: ArticleCardProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (variant === "compact") {
    return (
      <Link href={href} className="group block">
        <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-snug transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>
                {formatTimeAgo(new Date(article.publishedAt ?? Date.now()))}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={href} className="group block">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={
                article.img
                  ? urlFor(article.img).url()
                  : "/placeholder-image.jpg"
              }
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {categoryLabel && (
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {categoryLabel}
                </span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-2 transition-colors">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatTimeAgo(new Date(article.publishedAt ?? Date.now()))}
              </span>
              {article.readTime && <span>{article.readTime} min read</span>}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={
              article.img ? urlFor(article.img).url() : "/placeholder-image.jpg"
            }
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {categoryLabel && (
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                {categoryLabel}
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-3 transition-colors">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-gray-600 line-clamp-3 mb-4">{article.excerpt}</p>
          )}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>
                {formatTimeAgo(new Date(article.publishedAt ?? Date.now()))}
              </span>
            </div>
            {article.readTime && <span>{article.readTime} min read</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
