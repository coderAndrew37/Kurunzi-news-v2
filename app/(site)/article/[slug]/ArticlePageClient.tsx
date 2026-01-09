"use client";
import TopAdBanner from "@/app/TopAdBanner";
import NewsletterSignup from "@/app/components/NewsletterSignup";
import { Story as Article } from "@/app/components/types";
import { useIncrementArticleView } from "@/app/hooks/useIncrementArticleView";
import {
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Facebook,
  Mail,
  Twitter,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ArticleActions from "../_components/ArticleActions";
import CommentsSection from "../_components/ArticleCommentSection";
import ArticleImage from "../_components/ArticleImage";
import Breadcrumbs from "../_components/BreadCrumbs";
import EnhancedArticleContent from "../_components/EnhancedArticleContent";
import { formatDate } from "@/app/lib/sanity.utils";
import ArticleSidebar from "../_components/ArticlesSidebar";
import Image from "next/image";
import { urlFor } from "@/app/lib/getHeroStories";

interface ArticlePageClientProps {
  article: Article;
  latestArticles: Article[];
  trendingArticles: Article[];
  relatedArticles: Article[];
  moreFromCategory: Article[];
  tagArticles?: Article[];
}

export default function ArticlePageClient({
  article,
  latestArticles,
  trendingArticles,
  relatedArticles,
  moreFromCategory,
  tagArticles,
}: ArticlePageClientProps) {
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

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://kurunzinews.com/article/${article.slug}`;

  const shareText = `${article.title} - Kurunzi News`;

  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Top Ad Banner */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <TopAdBanner />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumbs - Fixed positioning */}
          <div className="mb-6">
            <Breadcrumbs article={article} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Center Column - Article Content */}
            <div className="lg:col-span-2">
              {/* Article Header */}
              <div className="mb-8">
                {/* Category Badge */}
                {article.category && (
                  <Link
                    href={`/${article.category.slug}`}
                    className="inline-block bg-red-600 text-white px-4 py-1 text-sm font-bold uppercase tracking-wide mb-4 hover:bg-red-700 transition-colors"
                  >
                    {article.category.title}
                  </Link>
                )}

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Subtitle */}
                {article.subtitle && (
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                    {article.subtitle}
                  </p>
                )}

                {/* Meta Information Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-gray-200">
                  {/* Author & Date */}
                  <div className="flex items-center space-x-6">
                    {article.author && (
                      <div className="flex items-center">
                        {article.author.image && (
                          <div className="relative w-10 h-10 mr-3">
                            <Image
                              src={urlFor(article.author.image)}
                              alt={article.author.name}
                              className="rounded-full"
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="40px"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">
                            {article.author.name}
                          </p>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {publishedDate.toLocaleDateString("en-KE", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                            {article.readTime && (
                              <>
                                <span className="mx-2">•</span>
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{article.readTime} min read</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Share & Stats */}
                  <div className="flex items-center space-x-4">
                    {article.views && (
                      <div className="flex items-center text-gray-600">
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {article.views.toLocaleString()} views
                        </span>
                      </div>
                    )}

                    {/* Social Share Buttons */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 font-medium">
                        Share:
                      </span>
                      <div className="flex space-x-2">
                        <Link
                          href={socialShareLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                          aria-label="Share on Facebook"
                        >
                          <Facebook className="h-4 w-4" />
                        </Link>
                        <Link
                          href={socialShareLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors"
                          aria-label="Share on Twitter"
                        >
                          <Twitter className="h-4 w-4" />
                        </Link>
                        <Link
                          href={socialShareLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                          aria-label="Share on WhatsApp"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Link>
                        <Link
                          href={socialShareLinks.email}
                          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white transition-colors"
                          aria-label="Share via Email"
                        >
                          <Mail className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image - Simple container to prevent overlap */}
              <div className="mb-10 relative overflow-hidden">
                <ArticleImage article={article} />
              </div>

              {/* Article Content */}
              <div className="mb-12">
                <EnhancedArticleContent
                  article={article}
                  relatedArticles={relatedArticles}
                  categoryArticles={moreFromCategory}
                  tagArticles={tagArticles}
                />
              </div>

              {/* Article Footer */}
              <div className="py-8 border-t border-gray-200">
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Share Again */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        Share this article
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Help spread the word about this story
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(shareUrl)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                      >
                        Copy Link
                      </button>
                      <button
                        onClick={() =>
                          window.open(socialShareLinks.facebook, "_blank")
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Share on Facebook
                      </button>
                    </div>
                  </div>
                </div>

                {/* Article Actions */}
                <ArticleActions
                  isBookmarked={isBookmarked}
                  setIsBookmarked={setIsBookmarked}
                  showComments={showComments}
                  setShowComments={setShowComments}
                />
              </div>

              {/* Comments Section */}
              {showComments && (
                <div className="mt-12">
                  <CommentsSection articleId={article.id} slug={article.slug} />
                </div>
              )}

              {/* More from this Category */}
              {moreFromCategory.length > 0 && (
                <div className="mt-16 pt-8 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      More from {article.category?.title}
                    </h2>
                    <Link
                      href={`/category/${article.category?.slug}`}
                      className="flex items-center text-red-600 hover:text-red-800 font-medium"
                    >
                      See All <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {moreFromCategory.slice(0, 3).map((story) => (
                      <Link
                        key={story.id}
                        href={`/article/${story.slug}`}
                        className="group"
                      >
                        <div className="relative h-48 overflow-hidden rounded-lg mb-3">
                          <Image
                            src={story.img || "/placeholder.jpg"}
                            alt={story.title}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                          {story.title}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{story.readTime} min read</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-16 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Related Articles
                  </h2>
                  <div className="space-y-6">
                    {relatedArticles.slice(0, 4).map((story) => (
                      <div
                        key={story.id}
                        className="border-b pb-6 last:border-0"
                      >
                        <Link
                          href={`/article/${story.slug}`}
                          className="group flex items-start"
                        >
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                              {story.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {story.excerpt}
                            </p>
                            <div className="flex items-center text-gray-500 text-xs">
                              <span>{formatDate(story.publishedAt)}</span>
                              <span className="mx-2">•</span>
                              <span>{story.readTime} min read</span>
                            </div>
                          </div>
                          <div className="ml-4 w-24 h-16 relative flex-shrink-0">
                            <Image
                              src={story.img || "/placeholder.jpg"}
                              alt={story.title}
                              className="object-cover rounded"
                              fill
                              sizes="96px"
                            />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="mt-16">
                <NewsletterSignup />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <ArticleSidebar
                latestArticles={latestArticles}
                trendingArticles={trendingArticles}
                category={article.category}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
