// components/NewsGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { WorldCupArticle } from "./components/types";
import { urlFor } from "../lib/sanity.image";

interface NewsGridProps {
  articles: WorldCupArticle[];
  title?: string;
  showCategory?: boolean;
  columns?: 2 | 3 | 4;
}

export default function NewsGrid({
  articles,
  title = "Latest News",
  showCategory = true,
  columns = 3,
}: NewsGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">{title}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-red-600"></div>
          </div>
          <Link
            href="/worldcup/news"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group"
          >
            View All News
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* News Grid */}
        <div className={`grid gap-8 ${gridCols[columns]}`}>
          {articles.map((article, index) => (
            <article
              key={article._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {article.featuredImage && (
                  <Image
                    src={urlFor(article.featuredImage)
                      .width(600)
                      .height(400)
                      .url()}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Category Badge */}
                {showCategory && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      {article.categories.join(", ")}
                    </span>
                  </div>
                )}

                {/* Breaking News Badge */}
                {article.isBreaking && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold uppercase animate-pulse">
                      ⚡ Breaking
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/worldcup/news/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    By {article.author.name}
                  </span>
                  <Link
                    href={`/worldcup/news/${article.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group/readmore"
                  >
                    Read More
                    <span className="group-hover/readmore:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
