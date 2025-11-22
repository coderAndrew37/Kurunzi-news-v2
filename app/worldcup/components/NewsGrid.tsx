import Link from "next/link";
import Image from "next/image";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  author: { name: string; slug: string };
  image?: string;
  readTime: number;
  isBreaking: boolean;
  isFeatured: boolean;
}

interface NewsGridProps {
  articles: Article[];
}

export default function NewsGrid({ articles }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <Link
          key={article._id}
          href={`/worldcup/news/${article.slug}`}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          {article.image && (
            <Image
              src={article.image}
              alt={article.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 text-xs font-medium rounded mb-2">
              {article.category}
            </span>
            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
