"use client";

import NewsletterSignup from "@/app/components/NewsletterSignup";
import { Story } from "@/app/components/types";
import { AppCategory } from "@/app/lib/api";

import { formatDate } from "@/app/lib/sanity.utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PaginationControls from "../../[category]/_components/PaginationControls";

interface CategoryArchiveLayoutProps {
  category: AppCategory;
  articles: Story[];
  currentPage: number;
  totalPages: number;
  totalArticles: number;
}

export default function CategoryArchiveLayout({
  category,
  articles,
  currentPage,
  totalPages,
  totalArticles,
}: CategoryArchiveLayoutProps) {
  const isFirstPage = currentPage === 1;

  return (
    <div className="min-h-screen bg-white">
      {/* Red Header Banner - People's Daily Style */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {category.title}
              </h1>
              {category.description && (
                <p className="text-red-100 mt-3 text-lg max-w-3xl">
                  {category.description}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalArticles}</div>
                <div className="text-sm text-red-200">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentPage}</div>
                <div className="text-sm text-red-200">Current Page</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-600 hover:text-red-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-red-600 font-semibold">{category.title}</span>
            {currentPage > 1 && (
              <>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="text-gray-700">Page {currentPage}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div>
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Featured Story - Page 1 Only */}
            {isFirstPage && articles[0] && (
              <div className="mb-12 border-b pb-12">
                <Link
                  href={`/${category.slug}/${articles[0].slug}`}
                  className="group block"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Image Column */}
                    <div className="lg:col-span-2">
                      <div className="relative h-96 overflow-hidden rounded-lg">
                        <Image
                          src={articles[0].img || "/placeholder.jpg"}
                          alt={articles[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 800px"
                          priority
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold uppercase tracking-wide">
                            Featured
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-1">
                      <div className="flex flex-col h-full">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-red-600 mb-4 leading-tight">
                          {articles[0].title}
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed flex-1">
                          {articles[0].excerpt || articles[0].subtitle}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-500 text-sm">
                            <span className="font-medium">
                              By {articles[0].author?.name || "Staff Reporter"}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <span>{formatDate(articles[0].publishedAt)}</span>
                            {articles[0].readTime && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{articles[0].readTime} min read</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Articles Grid */}
            <div className="mb-12">
              {/* Page 1: Show 4 stories in 2x2 grid, then list */}
              {isFirstPage ? (
                <>
                  {/* 2x2 Grid of Next 4 Stories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {articles.slice(1, 5).map((story) => (
                      <div
                        key={story.id}
                        className="border-b border-gray-200 pb-8"
                      >
                        <Link
                          href={`/${category.slug}/${story.slug}`}
                          className="group"
                        >
                          <div className="relative h-56 overflow-hidden rounded-lg mb-4">
                            <Image
                              src={story.img || "/placeholder.jpg"}
                              alt={story.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 mb-3 line-clamp-2">
                            {story.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {story.excerpt}
                          </p>
                          <div className="flex items-center text-gray-500 text-sm">
                            <span>{formatDate(story.publishedAt)}</span>
                            {story.readTime && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{story.readTime} min read</span>
                              </>
                            )}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* List of Remaining Stories */}
                  {articles.slice(5).length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">
                        More Stories
                      </h3>
                      {articles.slice(5).map((story) => (
                        <div
                          key={story.id}
                          className="group flex items-start border-b border-gray-100 pb-6 last:border-0"
                        >
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                              {story.title}
                            </h4>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {story.excerpt}
                            </p>
                            <div className="flex items-center text-gray-500 text-xs">
                              <span className="font-medium">
                                {story.author?.name}
                              </span>
                              <span className="mx-2">•</span>
                              <span>{formatDate(story.publishedAt)}</span>
                              {story.readTime && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>{story.readTime} min</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="ml-6 w-24 h-16 relative flex-shrink-0">
                            <Image
                              src={story.img || "/placeholder.jpg"}
                              alt={story.title}
                              fill
                              className="object-cover rounded"
                              sizes="96px"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Page 2+: 3x2 Grid + List
                <>
                  {/* 3x2 Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {articles.slice(0, 6).map((story) => (
                      <div
                        key={story.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <Link
                          href={`/${category.slug}/${story.slug}`}
                          className="group"
                        >
                          <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                            <Image
                              src={story.img || "/placeholder.jpg"}
                              alt={story.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 mb-3 line-clamp-2">
                            {story.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {story.excerpt}
                          </p>
                          <div className="flex items-center text-gray-500 text-xs">
                            <span>{formatDate(story.publishedAt)}</span>
                            {story.readTime && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{story.readTime} min read</span>
                              </>
                            )}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* List of Remaining Stories */}
                  {articles.slice(6).length > 0 && (
                    <div className="space-y-6">
                      {articles.slice(6).map((story) => (
                        <div
                          key={story.id}
                          className="group flex items-start border-b border-gray-100 pb-6 last:border-0"
                        >
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                              {story.title}
                            </h4>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {story.excerpt}
                            </p>
                            <div className="flex items-center text-gray-500 text-xs">
                              <span className="font-medium">
                                {story.author?.name}
                              </span>
                              <span className="mx-2">•</span>
                              <span>{formatDate(story.publishedAt)}</span>
                              {story.readTime && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>{story.readTime} min</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="ml-6 w-24 h-16 relative flex-shrink-0">
                            <Image
                              src={story.img || "/placeholder.jpg"}
                              alt={story.title}
                              fill
                              className="object-cover rounded"
                              sizes="96px"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 border-t pt-8">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath={`/category/${category.slug}`}
                />
              </div>
            )}

            {/* Newsletter */}
            <div className="mt-12">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
