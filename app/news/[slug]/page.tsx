import LatestBreakingNews from "@/app/components/LatestBreakingNews";
import NewsletterSignup from "@/app/components/NewsletterSignup";
import TrendingNews from "@/app/components/TrendingNews";
import { formatDate } from "@/app/components/utils/formatDate";
import { formatTimeAgo } from "@/app/components/utils/formatTimeAgo";
import { getBreakingNewsBySlug } from "@/app/lib/getBreakingNews";
import { getRelatedArticles } from "@/app/lib/getRelatedArticles"; // <-- new import
import { urlFor } from "@/app/lib/sanity.image";
import TopAdBanner from "@/app/TopAdBanner";
import { PortableText } from "@portabletext/react";
import { Calendar, MapPin, RefreshCw, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LiveBadge from "../_components/LiveBadge";
import RelatedArticles from "../_components/RelatedArticles";
import ShareButtons from "../_components/ShareButtons";
import { RelatedArticle } from "@/app/components/types";

interface BreakingNewsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BreakingNewsPageProps) {
  const news = await getBreakingNewsBySlug(params.slug);

  if (!news) {
    return {
      title: "Breaking News Not Found",
    };
  }

  return {
    title: `${news.fullTitle} | Kurunzi News`,
    description: news.excerpt || `Breaking news: ${news.headline}`,
    openGraph: {
      title: news.fullTitle,
      description: news.excerpt,
      images: news.featuredImage ? [urlFor(news.featuredImage).url()] : [],
      type: "article",
      publishedTime: news.publishedAt,
    },
  };
}

export default async function BreakingNewsPage({
  params,
}: BreakingNewsPageProps) {
  const news = await getBreakingNewsBySlug(params.slug);

  if (!news) {
    notFound();
  }

  // Safely coerce category into a string for display and for fetch
  const categoryString =
    typeof news.category === "string"
      ? news.category
      : // common Sanity shapes: { title } or { name } or { slug: { current } }
        (news.category?.title ??
        news.category?.name ??
        news.category?.slug?.current ??
        undefined);

  // Fetch related articles in parent (server) — Option A approach
  const relatedArticles = await getRelatedArticles(
    news.slug,
    categoryString,
    3
  );

  const publishedDate = new Date(news.publishedAt);
  const updatedDate = news.updatedAt ? new Date(news.updatedAt) : null;

  return (
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
            <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/news" className="hover:text-blue-600">
                News
              </Link>
              <span>/</span>
              <Link href="/news" className="hover:text-blue-600">
                Breaking News
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate">
                {news.headline}
              </span>
            </nav>

            {/* Article Header */}
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Breaking News Header */}
              <div className="bg-red-600 text-white px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <LiveBadge />
                    <span className="font-semibold text-sm uppercase tracking-wide">
                      BREAKING NEWS
                    </span>
                    {categoryString && (
                      <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium">
                        {categoryString}
                      </span>
                    )}
                  </div>
                  <div className="text-sm opacity-90">
                    {formatTimeAgo(publishedDate)}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {news.fullTitle}
                </h1>

                {/* Excerpt */}
                {news.excerpt && (
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
                    {news.excerpt}
                  </p>
                )}

                {/* Meta Information */}
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

                  {news.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{news.location}</span>
                    </div>
                  )}

                  {news.author && (
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{news.author.name}</span>
                    </div>
                  )}
                </div>

                {/* Featured Image */}
                {news.featuredImage && (
                  <div className="mb-8">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(news.featuredImage).url()}
                        alt={news.featuredImage.alt || news.fullTitle}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    {news.featuredImage.caption && (
                      <p className="text-sm text-gray-600 mt-3 text-center">
                        {news.featuredImage.caption}
                      </p>
                    )}
                  </div>
                )}

                {/* Share Buttons */}
                <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Share this story:
                  </span>
                  <ShareButtons
                    title={news.fullTitle}
                    url={`https://kurunzi.news/news/${news.slug}`}
                  />
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-800 leading-8 text-base">
                    <PortableText value={news.content} />
                  </div>
                </div>

                {/* Tags */}
                {news.tags && news.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {news.tags.map((tag: string, index: number) => (
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
                {news.sources && news.sources.length > 0 && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-blue-900 mb-3">
                      Sources
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      {news.sources.map((source: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <NewsletterSignup />
            </div>

            {/* Related Articles (presentational) */}
            <div className="mt-8">
              <RelatedArticles
                currentSlug={news.slug}
                relatedArticles={relatedArticles as RelatedArticle[]} // type assertion if needed
              />
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Latest Breaking News Sidebar */}
            <LatestBreakingNews />
            {/* Trending News Sidebar */}
            <TrendingNews />

            {/* Sidebar Ad */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Ad Space</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
