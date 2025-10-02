"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Story } from "./types";

interface ImageCarouselProps {
  stories: Story[];
}

export default function ImageCarousel({ stories }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stories.length]);

  const currentStory = stories[currentIndex];
  const slug = currentStory.slug;

  // Ensure we have category data
  const category =
    typeof currentStory.category === "string"
      ? {
          title: currentStory.category,
          slug: String(currentStory.category).toLowerCase(),
        }
      : currentStory.category;

  return (
    <div className="relative h-full rounded-xl overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src={
            typeof currentStory.img === "string"
              ? currentStory.img
              : "/placeholder.jpeg"
          }
          alt={currentStory.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {currentStory.isVideo && (
          <div className="absolute top-4 left-4 flex items-center">
            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center">
              ▶ VIDEO
            </div>
            {currentStory.duration && (
              <span className="ml-2 text-white text-xs bg-black/50 px-2 py-1 rounded-md">
                {currentStory.duration}
              </span>
            )}
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6">
          {category?.slug && (
            <Link
              href={`/${category.slug}`}
              className="text-blue-300 text-sm font-medium mb-2 block hover:underline"
            >
              {category.title}
            </Link>
          )}

          <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2">
            {currentStory.title}
          </h2>

          {currentStory.excerpt && (
            <p className="text-gray-200 text-sm line-clamp-2">
              {currentStory.excerpt}
            </p>
          )}

          {slug ? (
            <Link
              href={`/article/${slug}`}
              className="text-sm text-blue-300 hover:underline"
            >
              Read story →
            </Link>
          ) : (
            <span className="text-gray-400">No link</span>
          )}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {stories.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
