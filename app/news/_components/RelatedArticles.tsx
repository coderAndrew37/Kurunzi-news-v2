import { RelatedArticle } from "@/app/components/types";
import { ArticleCard } from "./ArticleCard";

interface RelatedArticlesProps {
  currentSlug: string;
  relatedArticles: RelatedArticle[];
  limit?: number;
}

export default function RelatedArticles({
  currentSlug,
  relatedArticles,
  limit = 3,
}: RelatedArticlesProps) {
  if (!relatedArticles || relatedArticles.length === 0) return null;

  // Exclude current article
  const filtered = relatedArticles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, limit);

  if (filtered.length === 0) return null;

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filtered.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
