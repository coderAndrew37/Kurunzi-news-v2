"use client";

import Image from "next/image";
import Link from "next/link";
import { Story } from "./types";
import { Play, Clock, Calendar } from "lucide-react";
import { formatTimeAgo } from "./utils/formatDate";

interface HeroProps {
  stories: Story[];
}

export default function Hero({ stories }: HeroProps) {
  if (!stories || stories.length === 0) return null;

  const featuredStory = stories[0];
  const topStories = stories.slice(1, 5);
  const sideStories = stories.slice(5, 8);

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Story - Left Column */}
          <div className="lg:col-span-2">
            <div className="relative group">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <Image
                  src={
                    typeof featuredStory.img === "string"
                      ? featuredStory.img
                      : "/placeholder.jpeg"
                  }
                  alt={featuredStory.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge */}
                {featuredStory.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {typeof featuredStory.category === "object"
                        ? featuredStory.category.title
                        : featuredStory.category}
                    </span>
                  </div>
                )}

                {/* Video Badge */}
                {featuredStory.isVideo && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full">
                    <Play className="h-5 w-5" fill="white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors">
                  <Link
                    href={`/${featuredStory.category?.slug}/${featuredStory.slug}`}
                  >
                    {featuredStory.title}
                  </Link>
                </h1>

                {featuredStory.excerpt && (
                  <p className="text-lg text-gray-700 leading-relaxed line-clamp-3">
                    {featuredStory.excerpt}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatTimeAgo(new Date(featuredStory.publishedAt ?? ""))}
                    </span>
                  </div>

                  {featuredStory.readTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredStory.readTime} min read</span>
                    </div>
                  )}

                  {featuredStory.author && (
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">
                        By {featuredStory.author.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Top Stories - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Top Stories
              </h2>

              <div className="space-y-4">
                {topStories.map((story, index) => (
                  <div key={story.id} className="group">
                    <Link
                      href={`/${featuredStory.category?.slug}/${featuredStory.slug}`}
                      className="flex items-start space-x-3"
                    >
                      {/* Number Badge */}
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-1">
                        {index + 1}
                      </span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-snug transition-colors">
                          {story.title}
                        </h3>

                        {/* Meta */}
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatTimeAgo(
                              new Date(
                                story.publishedAt ?? story.createdAt ?? ""
                              )
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Stories - Below Top Stories */}
            {sideStories.length > 0 && (
              <div className="mt-6 space-y-4">
                {sideStories.map((story) => (
                  <div
                    key={story.id}
                    className="group flex items-center space-x-3 bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    {/* Small Thumbnail */}
                    <div className="flex-shrink-0 relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={
                          typeof story.img === "string"
                            ? story.img
                            : "/placeholder.jpg"
                        }
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 text-sm leading-snug transition-colors">
                        <Link
                          href={`/${featuredStory.category?.slug}/${featuredStory.slug}`}
                        >
                          {story.title}
                        </Link>
                      </h4>

                      {/* Meta */}
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatTimeAgo(new Date(story.publishedAt ?? ""))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Breaking News Ticker Style - Additional Stories Row */}
        {stories.length > 8 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded">
                Latest
              </span>

              <div className="flex-1 overflow-hidden">
                <div className="flex space-x-6 animate-marquee-inline">
                  {stories.slice(8, 12).map((story) => (
                    <Link
                      key={story.id}
                      href={`/${featuredStory.category?.slug}/${featuredStory.slug}`}
                      className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600 whitespace-nowrap transition-colors"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>{story.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
