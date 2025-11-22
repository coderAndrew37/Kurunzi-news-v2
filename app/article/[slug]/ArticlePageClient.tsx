"use client";
import TopAdBanner from "@/app/TopAdBanner";
import NewsletterSignup from "@/app/components/NewsletterSignup";
import { Story as Article } from "@/app/components/types";
import { formatTimeAgo } from "@/app/components/utils/formatDate";
import { useIncrementArticleView } from "@/app/hooks/useIncrementArticleView";
import RelatedArticles from "@/app/news/_components/RelatedArticles";
import { Calendar, Clock, MapPin, RefreshCw, Share2, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ArticleActions from "../_components/ArticleActions";
import CommentsSection from "../_components/ArticleCommentSection";
import ArticleImage from "../_components/ArticleImage";
import Breadcrumbs from "../_components/BreadCrumbs";
import LatestArticlesSidebar from "../_components/LatestArticlesSidebar";
import TagsList from "../_components/TagList";
import EnhancedArticleContent from "../_components/EnhancedArticleContent";

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

      <div className="min-h-screen bg-white font-serif">
        {/* Top Ad Banner */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <TopAdBanner />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Main Article Content */}
            <div className="lg:col-span-8 xl:col-span-9">
              {/* Breadcrumb */}
              <div className="mb-6">
                <Breadcrumbs article={article} />
              </div>

              {/* Article Card */}
              <article className="bg-white">
                {/* Article Header */}
                <header className="mb-8">
                  {/* Category Badge */}
                  {article.category && (
                    <div className="mb-4">
                      <span className="inline-block bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-full tracking-wide">
                        {article.category.title}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight font-serif">
                    {article.title}
                  </h1>

                  {/* Subtitle/Excerpt */}
                  {article.subtitle && (
                    <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed font-light tracking-wide border-l-4 border-red-600 pl-6 py-2 bg-red-50 rounded-r-lg">
                      {article.subtitle}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-base text-gray-600 mb-4">
                    {/* Author */}
                    {article.author && article.author.slug && (
                      <Link
                        href={`/authors/${article.author.slug}`}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors font-medium"
                      >
                        <User className="h-5 w-5" />
                        <span className="underline decoration-transparent hover:decoration-red-600">
                          {article.author.name}
                        </span>
                      </Link>
                    )}

                    {/* Published Date */}
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">
                        {publishedDate.toLocaleDateString("en-KE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Reading Time */}
                    {article.readTime && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">
                          {article.readTime} min read
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Location & Updated */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    {article.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{article.location}</span>
                      </div>
                    )}

                    {updatedDate && (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <RefreshCw className="h-4 w-4" />
                        <span>Updated {formatTimeAgo(updatedDate)}</span>
                      </div>
                    )}

                    {/* Time Ago */}
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTimeAgo(publishedDate)}
                    </div>
                  </div>
                </header>

                {/* Featured Image */}
                <div className="mb-8">
                  <ArticleImage article={article} />
                </div>

                {/* Share Buttons */}
                <div className="flex items-center justify-between mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-red-600">
                  <span className="text-base font-semibold text-gray-700">
                    Share this article:
                  </span>
                  <div className="flex items-center space-x-2">
                    <Share2 className="h-5 w-5 text-gray-600" />
                    <span className="text-base text-gray-600">Share</span>
                  </div>
                </div>

                {/* Enhanced Article Content with TOC */}
                <div className="mb-8 relative">
                  <EnhancedArticleContent article={article} />
                </div>

                {/* Article Footer */}
                <div className="border-t border-gray-200 pt-8">
                  {/* Views */}
                  {article.views && (
                    <p className="text-sm font-semibold text-gray-700 mb-6">
                      {article.views?.toLocaleString()} people read this
                    </p>
                  )}

                  {/* Tags */}
                  <div className="mb-8">
                    <TagsList tags={article.tags} />
                  </div>

                  {/* Sources */}
                  {article.sources && article.sources?.length > 0 && (
                    <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-4 text-lg">
                        Sources & References
                      </h3>
                      <ul className="space-y-3 text-blue-800">
                        {article.sources.map((source, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">•</span>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-blue-900 transition-colors leading-relaxed"
                            >
                              {source.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Article Actions */}
                  <ArticleActions
                    isBookmarked={isBookmarked}
                    setIsBookmarked={setIsBookmarked}
                    showComments={showComments}
                    setShowComments={setShowComments}
                  />

                  {/* Share Again at Bottom */}
                  <div className="flex items-center justify-center mt-8 p-6 bg-gray-50 rounded-xl">
                    <div className="text-center">
                      <p className="text-base font-medium text-gray-700 mb-3">
                        Found this article informative? Share it:
                      </p>
                      <div className="flex items-center space-x-2 justify-center">
                        <Share2 className="h-5 w-5 text-gray-600" />
                        <span className="text-base text-gray-600">Share</span>
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
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 font-serif">
                    Continue Reading
                  </h2>
                  <RelatedArticles
                    currentSlug={article.slug}
                    relatedArticles={relatedArticles}
                  />
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="mt-12">
                <NewsletterSignup />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-8">
              {/* Latest Articles Sidebar */}
              <LatestArticlesSidebar latestArticles={latestArticles ?? []} />

              {/* Trending Articles Sidebar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200 font-serif">
                  Trending Now
                </h2>
                <div className="space-y-4">
                  {trendingArticles?.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/article/${item.slug}`}
                      className="flex items-start space-x-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full text-sm font-bold flex items-center justify-center mt-1">
                        {index + 1}
                      </span>
                      <h3 className="font-medium text-gray-900 group-hover:text-red-600 line-clamp-3 text-sm leading-relaxed">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Ad */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-lg">
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
