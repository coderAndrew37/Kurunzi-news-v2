"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../lib/sanity.utils";
import { Story } from "./types";

interface SectionWithLeadProps {
  sectionTitle: string;
  stories: Story[];
  sectionSlug: string;
  layoutType?: "featured" | "standard" | "compact";
  isCompact?: boolean;
  sectionIndex?: number;
}

export default function SectionWithLead({
  sectionTitle,
  stories,
  sectionSlug,
  layoutType = "standard",
  isCompact = false,
  sectionIndex = 0,
}: SectionWithLeadProps) {
  // === IMAGE HELPER ===
  function getImageUrl(image?: Story["featuredImage"]) {
    if (!image) return "/placeholder.jpg";
    return image.url;
  }

  // === FEATURED LAYOUT ===
  const renderFeaturedLayout = () => {
    const mainStory = stories[0];
    const secondaryStories = stories.slice(1, 4);
    const listStories = stories.slice(4, 8);

    return (
      <div className="border-t border-b border-gray-200 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
            <Link
              href={`/${sectionSlug}`}
              className="hover:text-red-600 transition-colors"
            >
              {sectionTitle}
            </Link>
          </h2>
          <Link
            href={`/${sectionSlug}`}
            className="flex items-center text-sm font-medium text-red-600 hover:text-red-800"
          >
            See All <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured */}
          <div className="lg:col-span-2">
            {mainStory && (
              <Link
                href={`/${sectionSlug}/${mainStory.slug}`}
                className="group block"
              >
                <div className="relative h-80 overflow-hidden rounded-lg">
                  <Image
                    src={getImageUrl(mainStory.featuredImage)}
                    alt={mainStory.title}
                    fill
                    sizes="100%"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full mb-3">
                      FEATURED
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                      {mainStory.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                      {mainStory.excerpt}
                    </p>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span>{formatDate(mainStory.publishedAt)}</span>
                      <span className="mx-2">•</span>
                      <span>{mainStory.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Secondary Stories */}
          <div className="space-y-4">
            {secondaryStories.map((story) => (
              <div
                key={`${story.id}-${story.slug}`}
                className="pb-4 border-b border-gray-100 last:border-0"
              >
                <Link href={`/${sectionSlug}/${story.slug}`} className="group">
                  <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                    {story.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <span>{formatDate(story.publishedAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{story.readTime} min</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* List Stories */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {listStories.map((story) => (
            <div key={`${story.id}-${story.slug}`} className="border-t pt-4">
              <Link
                href={`/${sectionSlug}/${story.slug}`}
                className="group flex items-start"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-red-600 mb-1 line-clamp-2">
                    {story.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <span>{formatDate(story.publishedAt)}</span>
                  </div>
                </div>
                <div className="ml-4 w-24 h-16 relative flex-shrink-0">
                  <Image
                    src={getImageUrl(story.featuredImage)}
                    alt={story.title}
                    fill
                    sizes="96px"
                    className="object-cover rounded"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === STANDARD LAYOUT ===
  const renderStandardLayout = () => {
    const mainStory = stories[0];
    const otherStories = stories.slice(1, 7);

    return (
      <div className="border-t py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">
            <Link
              href={`/${sectionSlug}`}
              className="hover:text-red-600 transition-colors"
            >
              {sectionTitle}
            </Link>
          </h2>
          <Link
            href={`/${sectionSlug}`}
            className="flex items-center text-sm font-medium text-red-600 hover:text-red-800"
          >
            See All <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainStory && (
            <div className="md:col-span-2 lg:col-span-1">
              <Link
                href={`/${sectionSlug}/${mainStory.slug}`}
                className="group block"
              >
                <div className="relative h-64 overflow-hidden rounded-lg mb-4">
                  <Image
                    src={getImageUrl(mainStory.featuredImage)}
                    alt={mainStory.title}
                    fill
                    sizes="100%"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                  {mainStory.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {mainStory.excerpt}
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                  <span>{formatDate(mainStory.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{mainStory.readTime} min read</span>
                </div>
              </Link>
            </div>
          )}

          {/* Other Stories */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherStories.map((story, index) => (
                <div
                  key={`${story.id}-${story.slug}`}
                  className={index >= 2 ? "border-t pt-6" : ""}
                >
                  <Link
                    href={`/${sectionSlug}/${story.slug}`}
                    className="group flex items-start"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-red-600 mb-2 line-clamp-2">
                        {story.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                        {story.excerpt}
                      </p>
                      <div className="flex items-center text-gray-500 text-xs">
                        <span>{formatDate(story.publishedAt)}</span>
                        <span className="mx-2">•</span>
                        <span>{story.readTime} min</span>
                      </div>
                    </div>

                    <div className="ml-4 w-20 h-14 relative flex-shrink-0">
                      <Image
                        src={getImageUrl(story.featuredImage)}
                        alt={story.title}
                        fill
                        sizes="80px"
                        className="object-cover rounded"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // === COMPACT LAYOUT ===
  const renderCompactLayout = () => (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
          <Link
            href={`/${sectionSlug}`}
            className="hover:text-red-600 transition-colors"
          >
            {sectionTitle}
          </Link>
        </h2>
        <Link
          href={`/${sectionSlug}`}
          className="text-sm text-red-600 hover:text-red-800"
        >
          More
        </Link>
      </div>

      <div className="space-y-4">
        {stories.slice(0, 6).map((story) => (
          <Link
            key={`${story.id}-${story.slug}`}
            href={`/${sectionSlug}/${story.slug}`}
            className="group block border-b pb-4 last:border-0"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-red-600 mb-1 line-clamp-2">
              {story.title}
            </h3>
            <div className="flex items-center text-gray-500 text-xs">
              <span>{formatDate(story.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>{story.readTime} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  // === RENDER SWITCH ===
  if (isCompact) return renderCompactLayout();

  switch (layoutType) {
    case "featured":
      return renderFeaturedLayout();
    case "compact":
      return renderCompactLayout();
    default:
      return renderStandardLayout();
  }
}
