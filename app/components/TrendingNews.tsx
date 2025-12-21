import { getTrendingArticles } from "@/app/lib/getTrendingArticles";
import { RelatedArticle } from "@/app/components/types";

export default async function TrendingNews() {
  const articles = await getTrendingArticles();

  if (!articles.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
        Trending Now
      </h2>

      <div className="space-y-4">
        {articles.map((article: RelatedArticle, index: number) => (
          <a
            key={article._id}
            href={`/article/${article.slug}`}
            className="flex items-center space-x-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full text-sm font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 group-hover:text-red-600 line-clamp-2 text-sm leading-snug">
                {article.title}
              </h3>
              {article.category?.title && (
                <span className="text-xs text-gray-500">
                  {article.category.title}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export const revalidate = 300; // Revalidate every 5 minutes
