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

interface HeroSectionProps {
  featuredArticle?: Article;
}

export default function HeroSection({ featuredArticle }: HeroSectionProps) {
  if (!featuredArticle) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-8 text-white mb-8">
        <div className="max-w-2xl">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Featured Story
          </span>
          <h1 className="text-4xl font-bold mb-4">FIFA World Cup 2026</h1>
          <p className="text-xl mb-6">
            48 teams, 16 cities, 1 dream. Follow the road to glory.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/worldcup/fixtures"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Fixtures
            </Link>
            <Link
              href="/worldcup/teams"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Teams
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden mb-8">
      {featuredArticle.image && (
        <Image
          src={featuredArticle.image}
          alt={featuredArticle.title}
          width={1200}
          height={600}
          className="w-full h-96 object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="max-w-3xl">
          <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Featured Story
          </span>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            {featuredArticle.title}
          </h1>
          <p className="text-xl mb-6 text-gray-200">
            {featuredArticle.excerpt}
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <span>
              {new Date(featuredArticle.publishedAt).toLocaleDateString()}
            </span>
            <span>{featuredArticle.readTime} min read</span>
            <span>By {featuredArticle.author.name}</span>
          </div>
          <Link
            href={`/worldcup/news/${featuredArticle.slug}`}
            className="inline-block mt-4 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Read Story
          </Link>
        </div>
      </div>
    </div>
  );
}
