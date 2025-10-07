import { formatDate } from "./utils/formatDate";
import { formatTimeAgo } from "./utils/formatTimeAgo";
import { urlFor } from "@/app/lib/sanity.image";
import { Calendar, MapPin, RefreshCw, User, Clock } from "lucide-react";
import Image from "next/image";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import RelatedArticles from "../news/_components/RelatedArticles";
import ShareButtons from "../news/_components/ShareButtons";
import NewsletterSignup from "./NewsletterSignup";
import LiveBadge from "../news/_components/LiveBadge";
import { RelatedArticle } from "./types";

interface ArticleDetailProps {
  article: {
    slug: string;
    headline: string;
    fullTitle: string;
    excerpt?: string;
    featuredImage?: {
      url: string;
      alt?: string;
      caption?: string;
    };
    publishedAt: string;
    updatedAt?: string;
    location?: string;
    author?: { name: string };
    category?: string;
    content: PortableTextBlock[];
    tags?: string[];
    sources?: string[];
  };
  relatedArticles: RelatedArticle[];
  variant?: "article" | "breaking"; // control the header styling
}

export default function ArticleDetailLayout({
  article,
  relatedArticles,
  variant = "article",
}: ArticleDetailProps) {
  const publishedDate = new Date(article.publishedAt);
  const updatedDate = article.updatedAt ? new Date(article.updatedAt) : null;

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Article Header */}
      <header className="mb-6 border-b border-gray-200 pb-4">
        {/* Category */}
        {article.category && (
          <div className="mb-3">
            <span className="inline-block bg-red-600 text-white px-3 py-1 text-sm font-medium rounded">
              {article.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.fullTitle}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-lg text-gray-700 mb-4 leading-relaxed font-medium">
            {article.excerpt}
          </p>
        )}

        {/* Meta Information - Compact row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
          {/* Author */}
          {article.author && (
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span className="font-medium">{article.author.name}</span>
            </div>
          )}

          {/* Published Date */}
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(publishedDate)}</span>
          </div>

          {/* Reading Time - Add this if you have it */}
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>3 min read</span>
          </div>

          {/* Updated Date */}
          {updatedDate && (
            <div className="flex items-center space-x-1 text-blue-600">
              <RefreshCw className="h-4 w-4" />
              <span>Updated {formatTimeAgo(updatedDate)}</span>
            </div>
          )}
        </div>

        {/* Location */}
        {article.location && (
          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{article.location}</span>
          </div>
        )}

        {/* Breaking News Badge */}
        {variant === "breaking" && (
          <div className="flex items-center space-x-2 mt-2">
            <LiveBadge />
            <span className="text-red-600 font-semibold text-sm">
              BREAKING NEWS
            </span>
          </div>
        )}
      </header>

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="mb-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={urlFor(article.featuredImage).url()}
              alt={article.featuredImage.alt || article.fullTitle}
              fill
              className="object-cover"
              priority
            />
          </div>
          {article.featuredImage.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {article.featuredImage.caption}
            </p>
          )}
        </div>
      )}

      {/* Share Buttons - More prominent like Citizen */}
      <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-red-600">
        <span className="text-sm font-semibold text-gray-700">
          Share this article:
        </span>
        <ShareButtons
          title={article.fullTitle}
          url={`https://kurunzi.news/news/${article.slug}`}
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <PortableText value={article.content} />
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <a
                key={index}
                href={`/tag/${tag.toLowerCase()}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {article.sources && article.sources.length > 0 && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">Sources</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            {article.sources.map((source, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                {source}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Share Again at Bottom */}
      <div className="flex items-center justify-center mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Found this article informative? Share it:
          </p>
          <ShareButtons
            title={article.fullTitle}
            url={`https://kurunzi.news/news/${article.slug}`}
          />
        </div>
      </div>

      {/* Newsletter */}
      <div className="mb-8">
        <NewsletterSignup />
      </div>

      {/* Related Articles */}
      <div className="mb-8">
        <RelatedArticles
          currentSlug={article.slug}
          relatedArticles={relatedArticles}
        />
      </div>
    </div>
  );
}
