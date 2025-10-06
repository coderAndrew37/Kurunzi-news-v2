"use client";
import TopAdBanner from "@/app/TopAdBanner";
import NewsletterSignup from "@/app/components/NewsletterSignup";
import { Story as Article } from "@/app/components/types";
import { formatTimeAgo } from "@/app/components/utils/formatTimeAgo";
import RelatedArticles from "@/app/news/_components/RelatedArticles";
import { Calendar, Clock, Share2, User } from "lucide-react";
import { useState } from "react";
import ArticleActions from "../_components/ArticleActions";
import CommentsSection from "../_components/ArticleCommentSection";
import ArticleContent from "../_components/ArticleContent";
import ArticleImage from "../_components/ArticleImage";
import Breadcrumbs from "../_components/BreadCrumbs";
import TagsList from "../_components/TagList";

export default function ArticlePageClient({
  article,
  latestArticles,
  trendingArticles,
}: {
  article: Article;
  latestArticles?: Article[];
  trendingArticles?: Article[];
}) {
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
              {/* Breadcrumb */}
              <Breadcrumbs article={article} />

              {/* Article Card */}
              <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Article Header */}
                <div className="border-b border-gray-100 px-6 py-4">
                  <div className="flex items-center justify-between mb-3">
                    {/* Category Badge */}
                    {article.category && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {article.category.title}
                      </span>
                    )}

                    {/* Time Ago */}
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTimeAgo(new Date(article.publishedAt ?? ""))}
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {article.title}
                  </h1>

                  {/* Subtitle/Excerpt */}
                  {article.subtitle && (
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed font-medium">
                      {article.subtitle}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(article.publishedAt ?? "").toLocaleDateString(
                          "en-KE",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    {article.readTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime} min read</span>
                      </div>
                    )}

                    {article.author && (
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span className="font-medium">
                          {article.author.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Featured Image */}
                <div className="px-6 py-6">
                  <ArticleImage article={article} />
                </div>

                {/* Article Content */}
                <div className="px-6 pb-6">
                  <ArticleContent article={article} />

                  {/* Tags */}
                  <TagsList tags={article.tags} />

                  {/* Article Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <ArticleActions
                      isBookmarked={isBookmarked}
                      setIsBookmarked={setIsBookmarked}
                      showComments={showComments}
                      setShowComments={setShowComments}
                    />

                    {/* Share Section */}
                    <div className="flex items-center justify-between mt-6 p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Share this article:
                      </span>
                      <div className="flex items-center space-x-2">
                        <Share2 className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Share</span>
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
                </div>
              </article>

              {/* Newsletter Signup */}
              <div className="mt-8">
                <NewsletterSignup />
              </div>

              {/* Related Articles */}
              <div className="mt-8">
                <RelatedArticles
                  currentSlug={article.slug}
                  relatedArticles={article.relatedArticles ?? []}
                />
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Latest Articles Sidebar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Latest Articles
                </h2>
                <div className="space-y-4">
                  {latestArticles?.map((item) => (
                    <a
                      key={item.id}
                      href={`/article/${item.slug}`}
                      className="block group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-snug">
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>
                              {formatTimeAgo(new Date(item.publishedAt ?? ""))}
                            </span>
                            {item.category && (
                              <>
                                <span>•</span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded">
                                  {item.category.title}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

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
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 text-sm leading-snug">
                        {item.title}
                      </h3>
                    </a>
                  ))}
                </div>
              </div>

              {/* Sidebar Ad */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
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
