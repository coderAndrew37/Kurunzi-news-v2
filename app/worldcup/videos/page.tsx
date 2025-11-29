// app/worldcup/videos/page.tsx
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
  featured: boolean;
}

// Mock data for videos
const videos: Video[] = [
  {
    _id: "1",
    title: "Argentina vs Brazil Final - Extended Highlights",
    description:
      "Relive every moment of the epic final between these South American giants in this 15-minute extended highlight package.",
    thumbnail: "/argentina-brazil.jpg",
    videoUrl: "#",
    duration: "15:30",
    publishedAt: "2024-01-10T14:30:00Z",
    views: 2500000,
    category: "highlights",
    featured: true,
  },
  {
    _id: "2",
    title: "Top 10 Goals of the Tournament",
    description:
      "Breathtaking strikes, incredible volleys, and stunning free-kicks - watch the best goals from World Cup 2026.",
    thumbnail: "/top-goals.jpg",
    videoUrl: "#",
    duration: "8:45",
    publishedAt: "2024-01-12T09:15:00Z",
    views: 1800000,
    category: "goals",
    featured: true,
  },
  {
    _id: "3",
    title: "Lionel Messi: The Final Interview",
    description:
      "Exclusive sit-down with the legend as he reflects on his World Cup journey and future plans.",
    thumbnail: "/messi-interview.jpg",
    videoUrl: "#",
    duration: "12:20",
    publishedAt: "2024-01-08T16:45:00Z",
    views: 3200000,
    category: "interviews",
    featured: false,
  },
  {
    _id: "4",
    title: "Inside the England Camp: Road to Semi-Finals",
    description:
      "Never-before-seen footage from England training sessions, team meetings, and locker room celebrations.",
    thumbnail: "/england-camp.jpg",
    videoUrl: "#",
    duration: "18:15",
    publishedAt: "2024-01-05T11:20:00Z",
    views: 950000,
    category: "behind-scenes",
    featured: false,
  },
  {
    _id: "5",
    title: "France vs Portugal Quarter-Final Highlights",
    description:
      "Kylian Mbappé vs Cristiano Ronaldo in an epic showdown that went down to the wire.",
    thumbnail: "/france-portugal.jpg",
    videoUrl: "#",
    duration: "10:30",
    publishedAt: "2024-01-03T13:10:00Z",
    views: 2100000,
    category: "highlights",
    featured: false,
  },
  {
    _id: "6",
    title: "Incredible Free-Kick Masterclass",
    description:
      "Watch the best free-kick takers showcase their skills in training sessions.",
    thumbnail: "/free-kicks.jpg",
    videoUrl: "#",
    duration: "6:45",
    publishedAt: "2024-01-14T10:30:00Z",
    views: 1200000,
    category: "goals",
    featured: false,
  },
  {
    _id: "7",
    title: "Coach Press Conference: All 48 Teams",
    description:
      "Hear from every team manager as they discuss their strategies and expectations.",
    thumbnail: "/coach-conference.jpg",
    videoUrl: "#",
    duration: "25:40",
    publishedAt: "2024-01-02T15:20:00Z",
    views: 780000,
    category: "interviews",
    featured: false,
  },
  {
    _id: "8",
    title: "Stadium Tour: MetLife Stadium New York",
    description:
      "Go behind the scenes at one of the World Cup final venues and see the incredible preparations.",
    thumbnail: "/stadium-tour.jpg",
    videoUrl: "#",
    duration: "14:20",
    publishedAt: "2024-01-13T08:45:00Z",
    views: 1100000,
    category: "behind-scenes",
    featured: false,
  },
];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "featured">(
    "newest"
  );

  const categories = [
    { id: "all", name: "All Videos", count: videos.length },
    {
      id: "highlights",
      name: "Match Highlights",
      count: videos.filter((v) => v.category === "highlights").length,
    },
    {
      id: "goals",
      name: "Best Goals",
      count: videos.filter((v) => v.category === "goals").length,
    },
    {
      id: "interviews",
      name: "Interviews",
      count: videos.filter((v) => v.category === "interviews").length,
    },
    {
      id: "behind-scenes",
      name: "Behind Scenes",
      count: videos.filter((v) => v.category === "behind-scenes").length,
    },
  ];

  const filteredVideos = videos
    .filter(
      (video) =>
        selectedCategory === "all" || video.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "popular":
          return b.views - a.views;
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const featuredVideos = videos.filter((video) => video.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black mb-4">Video Highlights</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Watch the best moments, stunning goals, exclusive interviews, and
            behind-the-scenes content from World Cup 2026
          </p>
        </div>
      </div>

      {/* Featured Videos Carousel */}
      {featuredVideos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            Featured Videos
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredVideos.map((video) => (
              <div
                key={video._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      Video Thumbnail: {video.title}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-l-[16px] border-l-gray-900 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-sm font-semibold text-white">
                    {video.duration}
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Featured
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold uppercase">
                      {video.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {video.views.toLocaleString()} views
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filters and Sort */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">
                Sort by:
              </span>
              <select
                aria-label="Filter videos"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-100 border-0 rounded-lg px-4 py-2 font-semibold text-gray-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* All Videos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <div
              key={video._id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold text-center px-4">
                    {video.title}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-l-[10px] border-l-gray-900 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-0.5"></div>
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-semibold text-white">
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold uppercase">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>👁️ {video.views.toLocaleString()}</span>
                    <span>•</span>
                    <span>
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group/watch">
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

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            Load More Videos
          </button>
        </div>
      </section>
    </div>
  );
}
