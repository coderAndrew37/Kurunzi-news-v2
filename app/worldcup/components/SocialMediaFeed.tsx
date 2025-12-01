// components/SocialMediaFeed.tsx
"use client";

import { useState } from "react";

interface SocialPost {
  _id: string;
  platform: "twitter" | "instagram" | "tiktok";
  username: string;
  content: string;
  mediaUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  verified: boolean;
}

export default function SocialMediaFeed() {
  const [activePlatform, setActivePlatform] = useState<
    "all" | "twitter" | "instagram" | "tiktok"
  >("all");

  const posts: SocialPost[] = [
    {
      _id: "1",
      platform: "twitter",
      username: "FIFAWorldCup",
      content:
        "The moment Argentina lifted the trophy! 🏆 History made at MetLife Stadium. #WorldCup2026",
      likes: 125000,
      comments: 12000,
      shares: 45000,
      timestamp: "2 hours ago",
      verified: true,
    },
    {
      _id: "2",
      platform: "instagram",
      username: "mbappe",
      content:
        "Incredible atmosphere tonight! Thank you to all the fans for the amazing support. The journey continues...",
      mediaUrl: "/social/mbappe-post.jpg",
      likes: 3200000,
      comments: 85000,
      shares: 120000,
      timestamp: "5 hours ago",
      verified: true,
    },
    {
      _id: "3",
      platform: "tiktok",
      username: "WorldCupFans",
      content:
        "The best fan moments from today's match! Who had the best celebration? 👀",
      likes: 450000,
      comments: 18000,
      shares: 75000,
      timestamp: "1 day ago",
      verified: false,
    },
  ];

  const filteredPosts =
    activePlatform === "all"
      ? posts
      : posts.filter((post) => post.platform === activePlatform);

  const platformColors = {
    twitter: "bg-blue-500",
    instagram: "bg-gradient-to-r from-purple-600 to-pink-600",
    tiktok: "bg-black",
  };

  const platformIcons = {
    twitter: "𝕏",
    instagram: "📸",
    tiktok: "🎵",
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Social Buzz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the conversation and see what the world is saying about
            #WorldCup2026
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mt-4"></div>
        </div>

        {/* Platform Filters */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActivePlatform("all")}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activePlatform === "all"
                ? "bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Platforms
          </button>
          {(["twitter", "instagram", "tiktok"] as const).map((platform) => (
            <button
              key={platform}
              onClick={() => setActivePlatform(platform)}
              className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 flex items-center gap-2 ${
                activePlatform === platform
                  ? "shadow-2xl scale-105"
                  : "opacity-90 hover:opacity-100"
              } ${platformColors[platform]}`}
            >
              <span>{platformIcons[platform]}</span>
              <span className="capitalize">{platform}</span>
            </button>
          ))}
        </div>

        {/* Social Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden"
            >
              {/* Post Header */}
              <div
                className={`p-4 text-white ${platformColors[post.platform]}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">
                      {platformIcons[post.platform]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">@{post.username}</span>
                        {post.verified && (
                          <span className="text-xs bg-white text-blue-600 px-2 py-0.5 rounded-full">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <div className="text-sm opacity-90">{post.timestamp}</div>
                    </div>
                  </div>
                  <div className="text-sm">···</div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <p className="text-gray-800 mb-4 leading-relaxed">
                  {post.content}
                </p>

                {/* Media Placeholder */}
                {post.mediaUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center">
                    <span className="text-4xl">📱</span>
                  </div>
                )}

                {/* Post Stats */}
                <div className="flex justify-between text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span>❤️</span>
                      <span className="font-semibold">
                        {post.likes.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💬</span>
                      <span className="font-semibold">
                        {post.comments.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🔄</span>
                      <span className="font-semibold">
                        {post.shares.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                      <span>❤️</span>
                      <span className="font-semibold">Like</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <span>💬</span>
                      <span className="font-semibold">Comment</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                      <span>🔄</span>
                      <span className="font-semibold">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow Us CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Join the Conversation</h3>
          <p className="text-blue-100 mb-6">
            Follow us on social media for exclusive content, behind-the-scenes
            access, and live updates
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold transition-colors duration-300 flex items-center gap-2">
              <span>𝕏</span>
              Follow on X
            </button>
            <button className="bg-white text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-xl font-bold transition-colors duration-300 flex items-center gap-2">
              <span>📸</span>
              Follow on Instagram
            </button>
            <button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-bold transition-colors duration-300 flex items-center gap-2">
              <span>🎵</span>
              Follow on TikTok
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
