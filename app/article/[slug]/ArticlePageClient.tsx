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
  useIncrementArticleView(article.slug);

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

      <div className="min-h-screen bg-white">
        {/* Top Ad Banner */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <TopAdBanner />
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative pt-24 pb-12 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <div className="mb-6">
                <Breadcrumbs article={article} />
              </div>

              {/* Category */}
              {article.category && (
                <div className="mb-4">
                  <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    {article.category.title}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Subtitle */}
              {article.subtitle && (
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  {article.subtitle}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-blue-200">
                {/* Author */}
                {article.author && article.author.slug && (
                  <Link
                    href={`/authors/${article.author.slug}`}
                    className="flex items-center space-x-2 hover:text-white transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">{article.author.name}</span>
                  </Link>
                )}

                {/* Published Date */}
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
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
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{article.readTime} min read</span>
                  </div>
                )}

                {/* Location */}
                {article.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{article.location}</span>
                  </div>
                )}
              </div>

              {/* Updated Date */}
              {updatedDate && (
                <div className="flex items-center space-x-2 text-blue-200 mt-4">
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-sm">
                    Updated {formatTimeAgo(updatedDate)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* ARTICLE BODY */}
              <div className="lg:col-span-3 max-w-3xl mx-auto">
                {/* Featured Image */}
                <div className="mb-12 rounded-2xl overflow-hidden">
                  <ArticleImage article={article} />
                </div>

                {/* Share Buttons */}
                <div className="flex items-center justify-between mb-12 p-6 bg-gray-50 rounded-2xl">
                  <span className="text-lg font-semibold text-gray-700">
                    Share this article:
                  </span>
                  <div className="flex items-center space-x-2">
                    <Share2 className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600">Share</span>
                  </div>
                </div>

                {/* Enhanced Article Content with TOC */}
                <div className="mb-12">
                  <EnhancedArticleContent article={article} />
                </div>

                {/* Article Footer */}
                <div className="border-t border-gray-200 pt-12">
                  {/* Views */}
                  {article.views && (
                    <p className="text-sm font-semibold text-gray-700 mb-8">
                      {article.views?.toLocaleString()} people read this
                    </p>
                  )}

                  {/* Tags */}
                  <div className="mb-8">
                    <TagsList tags={article.tags} />
                  </div>

                  {/* Sources */}
                  {article.sources && article.sources?.length > 0 && (
                    <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
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
                  <div className="flex items-center justify-center mt-8 p-8 bg-gray-50 rounded-2xl">
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-700 mb-3">
                        Found this article informative? Share it:
                      </p>
                      <div className="flex items-center space-x-2 justify-center">
                        <Share2 className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-600">Share</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {showComments && (
                  <div className="mt-12">
                    <CommentsSection
                      articleId={article.id}
                      slug={article.slug}
                    />
                  </div>
                )}

                {/* Related Articles */}
                {relatedArticles && relatedArticles.length > 0 && (
                  <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                      Continue Reading
                    </h2>
                    <RelatedArticles
                      currentSlug={article.slug}
                      relatedArticles={relatedArticles}
                    />
                  </div>
                )}

                {/* Newsletter Signup */}
                <div className="mt-16">
                  <NewsletterSignup />
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="lg:col-span-1 space-y-8">
                {/* Latest Articles Sidebar */}
                <LatestArticlesSidebar latestArticles={latestArticles ?? []} />

                {/* Trending Articles Sidebar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
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
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                  <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">Sidebar Ad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
