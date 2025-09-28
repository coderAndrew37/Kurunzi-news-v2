"use client";
import Image from "next/image";
import Link from "next/link";
import { Story } from "./types";

interface GridStoryCardProps {
  story: Story;
  showAd?: boolean;
  adPosition?: number;
  index: number;
}

export default function GridStoryCard({
  story,
  showAd = false,
  adPosition,
  index,
}: GridStoryCardProps) {
  return (
    <div className="group">
      <Link href={`/article/${story.slug}`}>
        <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
          <Image
            src={story.img || "/placeholder.png"}
            alt={story.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {story.category && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-blue-700 text-white text-xs font-medium rounded">
                {typeof story.category === "string"
                  ? story.category
                  : story.category?.title}
              </span>
            </div>
          )}
        </div>
        <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {story.title}
        </h3>
        {story.excerpt && (
          <p className="text-neutral-600 text-sm mb-2 line-clamp-2">
            {story.excerpt}
          </p>
        )}
        {(story.createdAt || story.publishedAt) && (
          <p className="text-xs text-neutral-500">
            {typeof story.createdAt === "undefined"
              ? story.publishedAt
              : story.createdAt}
          </p>
        )}
      </Link>

      {/* Inject Ad after specified position */}
      {showAd && adPosition === index && (
        <div className="w-full h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg border border-neutral-300 flex flex-col items-center justify-center text-neutral-500 mt-4">
          <div className="text-sm font-medium mb-1">Advertisement</div>
          <div className="text-xs">Ad Slot (300x250)</div>
        </div>
      )}
    </div>
  );
}
