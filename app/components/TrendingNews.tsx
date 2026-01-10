import type { ArticleCard } from "@/app/components/types";
import Image from "next/image";
import Link from "next/link";

interface TrendingNewsProps {
  trendingArticles: ArticleCard[];
  title?: string;
}

export default function TrendingNews({
  trendingArticles,
  title = "Trending Now",
}: TrendingNewsProps) {
  if (!trendingArticles.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4 pb-3 border-b">{title}</h2>

      <div className="space-y-4">
        {trendingArticles.map((article, index) => {
          const href =
            article.subcategory?.category?.slug && article.subcategory?.slug
              ? `/${article.subcategory.category.slug}/${article.subcategory.slug}/${article.slug}`
              : `/${article.slug}`;

          return (
            <Link
              key={article._id}
              href={href}
              className="flex items-center gap-3 group hover:bg-gray-50 p-3 rounded-lg"
            >
              <span className="w-6 h-6 bg-red-600 text-white rounded-full text-sm font-bold flex items-center justify-center">
                {index + 1}
              </span>

              {article.mainImage?.asset?.url && (
                <Image
                  src={article.mainImage.asset.url}
                  alt={article.mainImage.alt ?? article.title}
                  width={48}
                  height={48}
                  className="rounded object-cover"
                />
              )}

              <div>
                <h3 className="text-sm font-medium group-hover:text-red-600 line-clamp-2">
                  {article.title}
                </h3>

                {article.subcategory?.title && (
                  <span className="text-xs text-gray-500">
                    {article.subcategory.title}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
