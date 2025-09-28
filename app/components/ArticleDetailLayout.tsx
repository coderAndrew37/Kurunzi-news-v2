import { formatDate } from "./utils/formatDate";
import { formatTimeAgo } from "./utils/formatTimeAgo";
import { urlFor } from "@/app/lib/sanity.image";
import { Calendar, MapPin, RefreshCw, User } from "lucide-react";
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
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Variant-specific header */}
      {variant === "breaking" && (
        <div className="bg-red-600 text-white px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LiveBadge />
              <span className="font-semibold text-sm uppercase tracking-wide">
                BREAKING NEWS
              </span>
              {article.category && (
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium">
                  {article.category}
                </span>
              )}
            </div>
            <div className="text-sm opacity-90">
              {formatTimeAgo(publishedDate)}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.fullTitle}
        </h1>

        {article.excerpt && (
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
            {article.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 border-b border-gray-100 pb-6">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(publishedDate)}</span>
          </div>

          {updatedDate && (
            <div className="flex items-center space-x-1">
              <RefreshCw className="h-4 w-4" />
              <span>Updated {formatTimeAgo(updatedDate)}</span>
            </div>
          )}

          {article.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{article.location}</span>
            </div>
          )}

          {article.author && (
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span className="font-medium">{article.author.name}</span>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8">
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
              <p className="text-sm text-gray-600 mt-3 text-center">
                {article.featuredImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Share */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">
            Share this story:
          </span>
          <ShareButtons
            title={article.fullTitle}
            url={`https://kurunzi.news/news/${article.slug}`}
          />
        </div>

        {/* Body */}
        <div className="prose prose-lg max-w-none">
          <PortableText value={article.content} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <a
                  key={index}
                  href={`/tag/${tag.toLowerCase()}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
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
      </div>

      {/* Newsletter + Related */}
      <div className="mt-8">
        <NewsletterSignup />
      </div>

      <div className="mt-8">
        <RelatedArticles
          currentSlug={article.slug}
          relatedArticles={relatedArticles}
        />
      </div>
    </article>
  );
}
