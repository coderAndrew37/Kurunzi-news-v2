// app/category/_components/CategorySection.tsx
"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/lib/sanity.utils";
import { Story } from "@/app/components/types";

interface CategorySectionProps {
  categoryTitle: string;
  stories: Story[];
  categorySlug: string;
  currentPage: number;
}

export default function CategorySection({
  categoryTitle,
  stories,
  categorySlug,
  currentPage,
}: CategorySectionProps) {
  const isFirstPage = currentPage === 1;

  // For page 1 layout (People's Daily style)
  if (isFirstPage) {
    return (
      <div className="space-y-8">
        {/* Header - People's Daily Style */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
              {categoryTitle}
            </h1>
            {stories.length > 0 && (
              <p className="text-gray-600 mt-2">
                Latest news and updates in {categoryTitle}
              </p>
            )}
          </div>
          <div className="hidden md:flex items-center text-sm text-gray-500">
            <span className="font-semibold">{stories.length}</span>
            <span className="ml-1">articles</span>
          </div>
        </div>

        {/* Featured Story - Large */}
        {stories[0] && (
          <div className="mb-10 border-b pb-10">
            <Link
              href={`/${categorySlug}/${stories[0].slug}`}
              className="group block"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Image Column */}
                <div className="lg:col-span-2">
                  <div className="relative h-96 overflow-hidden rounded-lg">
                    <Image
                      src={stories[0].img || "/placeholder.jpg"}
                      alt={stories[0].title}
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
                      {stories[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed flex-1">
                      {stories[0].excerpt || stories[0].subtitle}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-500 text-sm">
                        <span className="font-medium">
                          By {stories[0].author?.name || "Staff Reporter"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>{formatDate(stories[0].publishedAt)}</span>
                        {stories[0].readTime && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{stories[0].readTime} min read</span>
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

        {/* Secondary Stories - Grid of 4 */}
        {stories.slice(1, 5).length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stories.slice(1, 5).map((story) => (
                <div
                  key={story.id}
                  className="border-b border-gray-200 pb-8 last:border-0"
                >
                  <Link
                    href={`/${categorySlug}/${story.slug}`}
                    className="group"
                  >
                    <div className="relative h-48 overflow-hidden rounded-lg mb-4">
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
          </div>
        )}

        {/* More Stories - List Style */}
        {stories.slice(5).length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stories.slice(5).map((story, index) => (
                <div
                  key={story.id}
                  className={`pb-6 ${index % 2 === 0 ? "pr-8" : ""} ${index % 2 === 1 ? "pl-8" : ""}`}
                >
                  <Link
                    href={`/${categorySlug}/${story.slug}`}
                    className="group block"
                  >
                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                      {story.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center text-gray-500 text-xs">
                      <span>{formatDate(story.publishedAt)}</span>
                      {story.readTime && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{story.readTime} min</span>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* See All Link */}
        <div className="text-center border-t pt-8">
          <Link
            href={`/${categorySlug}/page/2`}
            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
          >
            View More Articles
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  // For subsequent pages (starting from page 2)
  return (
    <div className="space-y-8">
      {/* Header for Page 2+ */}
      <div className="border-b pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight mb-2">
          {categoryTitle} - Page {currentPage}
        </h1>
        <p className="text-gray-600">More articles in {categoryTitle}</p>
      </div>

      {/* Grid of Stories for Page 2+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {stories.slice(0, 6).map((story) => (
          <div key={story.id} className="border-b pb-8">
            <Link href={`/${categorySlug}/${story.slug}`} className="group">
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
              <p className="text-gray-600 mb-4 text-sm line-clamp-2">
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

      {/* List Stories for Page 2+ */}
      {stories.slice(6).length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6">More Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.slice(6).map((story, index) => (
              <div
                key={story.id}
                className={`pb-6 ${index % 2 === 0 ? "pr-8" : ""} ${index % 2 === 1 ? "pl-8" : ""}`}
              >
                <Link
                  href={`/${categorySlug}/${story.slug}`}
                  className="group block"
                >
                  <h4 className="font-bold text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                    {story.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <span>{formatDate(story.publishedAt)}</span>
                    {story.readTime && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{story.readTime} min</span>
                      </>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
