"use client";
import Image from "next/image";
import Link from "next/link";
import { Story } from "./types";

interface TopStoriesListProps {
  stories: Story[];
}

export default function TopStoriesList({ stories }: TopStoriesListProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4">
      <h3 className="font-bold text-lg text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
        Top Stories
      </h3>
      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="group flex gap-3">
            <Link href={`/article/${story.slug}`} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={story.img || "/placeholder.png"}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h4 className="font-medium text-neutral-900 text-sm group-hover:text-blue-700 transition-colors line-clamp-2">
                  {story.title}
                </h4>
                {(story.publishedAt || story.createdAt) && (
                  <p className="text-xs text-neutral-500 mt-auto">
                    {typeof story.createdAt === "undefined"
                      ? story.publishedAt
                      : story.createdAt}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
