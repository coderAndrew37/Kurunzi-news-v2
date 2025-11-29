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
  // 📌 Strongly typed fallback
  // -----------------------------
  const fallbackNews: WorldCupArticle[] = [
    {
      _id: "fallback-1",
      slug: { current: "host-cities-announced-world-cup-2026" },
      title: "Host Cities Announced for World Cup 2026",
      excerpt:
        "FIFA reveals the final list of host cities across North America for the expanded 48-team tournament.",
      publishedAt: "2024-01-15T00:00:00Z",
      readTime: 4,
      content: [],
      categories: [
        {
          _id: "cat-official",
          title: "Official",
          slug: { current: "official" },
          color: "blue",
        },
      ],
      author: { name: "World Cup News Team", image: undefined },
      tags: ["host-cities", "announcement"],
      featuredImage: null,
      matchDetails: undefined,
    },
    {
      _id: "fallback-2",
      slug: { current: "qualification-process-begins-2026" },
      title: "Qualification Process Begins",
      excerpt:
        "Teams from 211 nations start their journey to secure one of 48 spots in the expanded World Cup format.",
      publishedAt: "2024-01-12T00:00:00Z",
      readTime: 3,
      content: [],
      categories: [
        {
          _id: "cat-qualifiers",
          title: "Qualifiers",
          slug: { current: "qualifiers" },
          color: "green",
        },
      ],
      author: { name: "World Cup News Team", image: undefined },
      tags: ["qualification", "teams"],
      featuredImage: null,
      matchDetails: undefined,
    },
    {
      _id: "fallback-3",
      slug: { current: "stadium-upgrades-underway" },
      title: "Stadium Upgrades Underway",
      excerpt:
        "Major renovations and infrastructure improvements begin across all host stadiums.",
      publishedAt: "2024-01-10T00:00:00Z",
      readTime: 5,
      content: [],
      categories: [
        {
          _id: "cat-infrastructure",
          title: "Infrastructure",
          slug: { current: "infrastructure" },
          color: "orange",
        },
      ],
      author: { name: "World Cup News Team", image: undefined },
      tags: ["stadiums", "construction"],
      featuredImage: null,
      matchDetails: undefined,
    },
  ];

  const displayArticles = articles.length > 0 ? articles : fallbackNews;

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
              slug={article.slug.current}
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
