"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BreakingNews {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
}

interface BreakingNewsTickerProps {
  news: BreakingNews[];
}

export default function BreakingNewsTicker({ news }: BreakingNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (news.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  if (!news.length) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 py-3 px-4 text-white">
      <div className="max-w-7xl mx-auto flex items-center gap-6">
        {/* Breaking News Label */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-bold text-sm uppercase tracking-wider">
            Breaking News
          </span>
        </div>

        {/* News Ticker */}
        <div className="flex-1 overflow-hidden">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            {news.map((item, index) => (
              <div key={item._id} className="h-6 flex items-center">
                <Link
                  href={`/worldcup/news/${item.slug}`}
                  className="hover:text-yellow-200 transition-colors font-medium text-sm truncate"
                >
                  {item.title}
                </Link>
                <span className="mx-4 text-white/50">•</span>
                <span className="text-xs text-white/70">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        {news.length > 1 && (
          <div className="flex gap-1 shrink-0">
            {news.map((_, index) => (
              <button
                aria-label="Navigate to news item"
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
