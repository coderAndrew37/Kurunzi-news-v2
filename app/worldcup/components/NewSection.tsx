import Link from "next/link";
import NewsCard from "./UI/NewsCard";
import NewsCardSkeleton from "./UI/NewsCardSkeleton";
import { getFeaturedWorldCupArticles } from "../lib/getWorldCupArticles";
import { WorldCupArticle } from "./types";

export default async function NewsSection() {
  console.log("🟦 [NewsSection] Fetching featured WC articles…");

  let articles: WorldCupArticle[] = [];

  try {
    const result = await getFeaturedWorldCupArticles();

    console.log(
      "🟩 [NewsSection] Raw Sanity Response:",
      JSON.stringify(result, null, 2)
    );

    if (Array.isArray(result)) {
      articles = result;
    } else {
      console.log("🟨 [NewsSection] Warning: Sanity returned non-array value");
    }
  } catch (error: any) {
    console.error(
      "🟥 [NewsSection] Sanity fetch failure:",
      error?.message || error
    );
  }

  console.log("🟪 [NewsSection] Final article count:", articles?.length);

  const fallbackNews = [
    {
      _id: "1",
      slug: { current: "host-cities-announced-world-cup-2026" },
      title: "Host Cities Announced for World Cup 2026",
      excerpt:
        "FIFA reveals the final list of host cities across North America for the expanded 48-team tournament.",
      category: "Official",
      publishedAt: "2024-01-15T00:00:00Z",
      readTime: 4,
      categories: [
        { title: "Official", slug: { current: "official" }, color: "blue" },
      ],
      author: { name: "World Cup News Team" },
      tags: ["host-cities", "announcement"],
    },
    {
      _id: "2",
      slug: { current: "qualification-process-begins-2026" },
      title: "Qualification Process Begins",
      excerpt:
        "Teams from 211 nations start their journey to secure one of 48 spots in the expanded World Cup format.",
      category: "Qualifiers",
      publishedAt: "2024-01-12T00:00:00Z",
      readTime: 3,
      categories: [
        {
          title: "Qualifiers",
          slug: { current: "qualifiers" },
          color: "green",
        },
      ],
      author: { name: "World Cup News Team" },
      tags: ["qualification", "teams"],
    },
    {
      _id: "3",
      slug: { current: "stadium-upgrades-underway" },
      title: "Stadium Upgrades Underway",
      excerpt:
        "Major renovations and infrastructure improvements begin across all host stadiums.",
      category: "Infrastructure",
      publishedAt: "2024-01-10T00:00:00Z",
      readTime: 5,
      categories: [
        {
          title: "Infrastructure",
          slug: { current: "infrastructure" },
          color: "orange",
        },
      ],
      author: { name: "World Cup News Team" },
      tags: ["stadiums", "construction"],
    },
  ];

  const displayArticles =
    articles && Array.isArray(articles) && articles.length > 0
      ? articles
      : fallbackNews;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Latest World Cup News
          </h2>
          <Link
            href="/news"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300"
          >
            View All News →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayArticles.slice(0, 3).map((article: WorldCupArticle) => (
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
