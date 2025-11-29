"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  publishedAt: string;
  views: number;
  category: "goals" | "highlights" | "interviews" | "behind-scenes";
}

interface VideoHighlightsProps {
  videos: Video[];
  title?: string;
}

export default function VideoHighlights({
  videos,
  title = "Video Highlights",
}: VideoHighlightsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Videos" },
    { id: "highlights", name: "Match Highlights" },
    { id: "goals", name: "Best Goals" },
    { id: "interviews", name: "Interviews" },
    { id: "behind-scenes", name: "Behind Scenes" },
  ];

  const filteredVideos =
    selectedCategory === "all"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">{title}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Relive the best moments, stunning goals, and exclusive interviews
            from the World Cup
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-4"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-yellow-500 text-gray-900 shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <div
              key={video._id}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-l-[12px] border-l-gray-900 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>

                {/* Video Duration */}
                <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-sm font-semibold">
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                  {video.title}
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>👁️ {video.views.toLocaleString()} views</span>
                  </div>

                  <button className="text-yellow-500 hover:text-yellow-400 font-semibold flex items-center gap-1 group/watch">
                    Watch
                    <span className="group-hover/watch:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Videos CTA */}
        <div className="text-center mt-12">
          <Link
            href="/worldcup/videos"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
          >
            📺 Watch All Videos
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
