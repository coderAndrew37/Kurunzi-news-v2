// app/components/NewsSection/NewsSection.tsx
import Link from "next/link";
import NewsCard from "./UI/NewsCard";
const featuredNews = [
  {
    id: 1,
    slug: "host-cities-announced-world-cup-2026",
    title: "Host Cities Announced for World Cup 2026",
    excerpt:
      "FIFA reveals the final list of host cities across North America for the expanded 48-team tournament coming to USA, Canada, and Mexico.",
    category: "Official",
    date: "2024-01-15",
    image: "/placeholder-stadium.jpg",
    readTime: 4,
  },
  {
    id: 2,
    slug: "qualification-process-begins-2026",
    title: "Qualification Process Begins",
    excerpt:
      "Teams from 211 nations start their journey to secure one of 48 spots in the expanded World Cup format.",
    category: "Qualifiers",
    date: "2024-01-12",
    image: "/placeholder-qualifiers.jpg",
    readTime: 3,
  },
  {
    id: 3,
    slug: "stadium-upgrades-underway",
    title: "Stadium Upgrades Underway",
    excerpt:
      "Major renovations and infrastructure improvements begin across all host stadiums in preparation for 2026.",
    category: "Infrastructure",
    date: "2024-01-10",
    image: "/placeholder-construction.jpg",
    readTime: 5,
  },
];

export default function NewsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
          <Link
            href="/news"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300"
          >
            View All News →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredNews.map((news) => (
            <NewsCard
              key={news.id}
              id={news.id}
              slug={news.slug}
              title={news.title}
              excerpt={news.excerpt}
              category={news.category}
              date={news.date}
              image={news.image}
              readTime={news.readTime}
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
