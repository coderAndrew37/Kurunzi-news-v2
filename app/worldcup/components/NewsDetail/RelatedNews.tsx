import { newsArticles } from "@/app/data/newsData";
import NewsCard from "../UI/NewsCard";

interface RelatedNewsProps {
  currentArticleId: string;
  relatedIds: string[];
}

export default function RelatedNews({
  currentArticleId,
  relatedIds,
}: RelatedNewsProps) {
  const relatedArticles = newsArticles.filter(
    (article) =>
      relatedIds.includes(article.id) && article.id !== currentArticleId
  );

  if (relatedArticles.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Related News</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {relatedArticles.map((article) => (
          <NewsCard
            key={article.id}
            id={article.id}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            category={article.category}
            date={article.publishedAt}
            readTime={article.readTime}
            variant="default"
          />
        ))}
      </div>
    </div>
  );
}
