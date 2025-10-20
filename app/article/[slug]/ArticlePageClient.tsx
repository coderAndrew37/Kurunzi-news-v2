"use client";
import TopAdBanner from "@/app/TopAdBanner";
import NewsletterSignup from "@/app/components/NewsletterSignup";
import { Story as Article } from "@/app/components/types";
import { useIncrementArticleView } from "@/app/hooks/useIncrementArticleView";
import RelatedArticles from "@/app/news/_components/RelatedArticles";
import { Calendar, Clock, MapPin, RefreshCw, Share2, User } from "lucide-react";
import { useState } from "react";
import ArticleActions from "../_components/ArticleActions";
import CommentsSection from "../_components/ArticleCommentSection";
import ArticleContent from "../_components/ArticleContent";
import ArticleImage from "../_components/ArticleImage";
import Breadcrumbs from "../_components/BreadCrumbs";
import LatestArticlesSidebar from "../_components/LatestArticlesSidebar";
import TagsList from "../_components/TagList";
import { formatTimeAgo } from "@/app/components/utils/formatDate";
import Link from "next/link";

export default function ArticlePageClient({
  article,
  latestArticles,
  trendingArticles,
  relatedArticles,
}: {
  article: Article;
  latestArticles?: Article[];
  trendingArticles?: Article[];
  relatedArticles?: Article[];
}) {
  useIncrementArticleView(article.id);

  // Local state for bookmark and comments visibility
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt ?? article.subtitle ?? "",
    datePublished: article.publishedAt,
    author: article.author
      ? { "@type": "Person", name: article.author.name }
      : undefined,
    image: article.img ? [article.img] : [],
  };

  const publishedDate = new Date(article.publishedAt ?? "");
  const updatedDate = article.updatedAt ? new Date(article.updatedAt) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Top Ad Banner */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <TopAdBanner />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Article Content - Left Column */}
            <div className="lg:col-span-8">
              {/* Breadcrumb - More subtle */}
              <div className="mb-4">
                <Breadcrumbs article={article} />
              </div>

              {/* Article Card - Updated to match Citizen style */}
              <article className="bg-white rounded-lg">
                {/* Article Header - Compact like Citizen */}
                <header className="mb-6 border-b border-gray-200 pb-4">
                  {/* Category Badge - Top position */}
                  {article.category && (
                    <div className="mb-3">
                      <span className="inline-block bg-red-600 text-white px-3 py-1 text-sm font-medium rounded">
                        {article.category.title}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {article.title}
                  </h1>

                  {/* Subtitle/Excerpt */}
                  {article.subtitle && (
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed font-medium">
                      {article.subtitle}
                    </p>
                  )}

                  {/* Meta Information - Compact row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                    {/* Author */}
                    {article.author && article.author.slug && (
                      <Link
                        href={`/authors/${article.author.slug}`}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span className="font-medium underline decoration-transparent hover:decoration-red-600">
                          {article.author.name}
                        </span>
                      </Link>
                    )}

                    {/* Published Date */}
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {publishedDate.toLocaleDateString("en-KE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Reading Time */}
                    {article.readTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime} min read</span>
                      </div>
                    )}

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

                  {/* Time Ago - Secondary */}
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTimeAgo(publishedDate)}
                  </div>
                </header>

                {/* Featured Image */}
                <div className="mb-6">
                  <ArticleImage article={article} />
                </div>

                {/* Share Buttons - Prominent like Citizen */}
                <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-red-600">
                  <span className="text-sm font-semibold text-gray-700">
                    Share this article:
                  </span>
                  <div className="flex items-center space-x-2">
                    <Share2 className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Share</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="mb-8">
                  <ArticleContent article={article} />
                </div>

                {article.views && (
                  <p className="text-sm font-semibold text-gray-700">
                    {article.views?.toLocaleString()} views
                  </p>
                )}

                {/* Tags */}
                <div className="mb-8 pt-6 border-t border-gray-200">
                  <TagsList tags={article.tags} />
                </div>

                {/* Sources - If available */}
                {article.sources && article.sources?.length > 0 && (
                  <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3">
                      Sources
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      {article.sources &&
                        article.sources.map((source, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-blue-900"
                            >
                              {source.title}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Article Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <ArticleActions
                    isBookmarked={isBookmarked}
                    setIsBookmarked={setIsBookmarked}
                    showComments={showComments}
                    setShowComments={setShowComments}
                  />

                  {/* Share Again at Bottom */}
                  <div className="flex items-center justify-center mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Found this article informative? Share it:
                      </p>
                      <div className="flex items-center space-x-2 justify-center">
                        <Share2 className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Share</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {showComments && (
                  <div className="mt-8">
                    <CommentsSection
                      articleId={article.id}
                      slug={article.slug}
                    />
                  </div>
                )}
              </article>

              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-amber-600 mb-4 pb-3 border-b border-gray-200">
                    Also Read
                  </h2>
                  <RelatedArticles
                    currentSlug={article.slug}
                    relatedArticles={relatedArticles}
                  />
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="mt-8">
                <NewsletterSignup />
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Latest Articles Sidebar */}
              <LatestArticlesSidebar latestArticles={latestArticles ?? []} />

              {/* Trending Articles Sidebar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Trending Now
                </h2>
                <div className="space-y-4">
                  {trendingArticles?.map((item, index) => (
                    <a
                      key={item.id}
                      href={`/article/${item.slug}`}
                      className="flex items-center space-x-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="font-medium text-gray-900 group-hover:text-red-600 line-clamp-2 text-sm leading-snug">
                        {item.title}
                      </h3>
                    </a>
                  ))}
                </div>
              </div>

              {/* Sidebar Ad */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-500">Sidebar Ad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
