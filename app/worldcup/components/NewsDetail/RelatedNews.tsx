import { WorldCupArticle } from "../types";
import NewsCard from "../UI/NewsCard";

interface RelatedNewsProps {
  currentArticleId: string;
  relatedArticles: WorldCupArticle[] | undefined;
}

export default function RelatedNews({
  currentArticleId,
  relatedArticles,
}: RelatedNewsProps) {
  // Filter out the current article and ensure we have valid articles
  const validRelatedArticles = relatedArticles?.filter(
    (article) => article && article._id !== currentArticleId && article.slug
  );

  if (!validRelatedArticles || validRelatedArticles.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Related News</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {validRelatedArticles.map((article) => (
          <NewsCard
            key={article._id}
            id={article._id}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            category={article.categories[0]?.title || "News"}
            date={article.publishedAt}
            readTime={article.readTime}
            variant="default"
          />
        ))}
      </div>
    </div>
  );
}
