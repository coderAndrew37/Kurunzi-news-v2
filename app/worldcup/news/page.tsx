// app/news/page.tsx
import NewsCard from "../components/UI/NewsCard";
import Breadcrumb from "../components/UI/Breadcrumb";
import { newsArticles } from "@/app/data/newsData";

export default function NewsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page Header */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            World Cup News
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, updates, and announcements for
            the FIFA World Cup 2026
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {newsArticles.map((article) => (
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
    </div>
  );
}
