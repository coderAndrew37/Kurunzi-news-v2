import Link from "next/link";
import { getFeaturedWorldCupArticles } from "../lib/getWorldCupArticles";
import { WorldCupArticle } from "./types";
import NewsCard from "./UI/NewsCard";

export default async function NewsSection() {
  let articles: WorldCupArticle[] = [];

  try {
    const result = await getFeaturedWorldCupArticles();

    if (Array.isArray(result)) {
      articles = result;
    } else {
      console.warn(
        "🟨 [NewsSection] Warning: Expected an array of WorldCupArticle"
      );
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Sanity error";
    console.error("🟥 [NewsSection] Sanity fetch failure:", message);
  }

  // -----------------------------

  const displayArticles = articles.length > 0 ? articles : [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Latest World Cup News
          </h2>
          <Link
            href="/worldcup/news"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300"
          >
            View All News →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayArticles.slice(0, 3).map((article) => (
            <NewsCard
              key={article._id}
              id={article._id}
              slug={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              category={article.categories?.[0]?.title || "News"}
              date={article.publishedAt}
              readTime={article.readTime}
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
