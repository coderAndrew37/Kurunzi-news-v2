"use client";
import Image from "next/image";
import Link from "next/link";
import { Story } from "./types";

interface MiddleStoryCardProps {
  story: Story;
}

export default function MiddleStoryCard({ story }: MiddleStoryCardProps) {
  if (!story) return null;

  return (
    <div className="group h-full flex flex-col">
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
        <h3 className="font-bold text-lg text-neutral-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {story.title}
        </h3>
        {story.excerpt && (
          <p className="text-neutral-600 text-sm mb-2 line-clamp-3">
            {story.excerpt}
          </p>
        )}
        {(story.publishedAt || story.createdAt) && (
          <p className="text-xs text-neutral-500 mt-auto">
            {typeof story.createdAt === "undefined"
              ? story.publishedAt
              : story.createdAt}
          </p>
        )}
      </Link>
    </div>
  );
}
