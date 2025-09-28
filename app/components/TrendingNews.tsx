import React from "react";
import {
  BreakingNewsItem,
  getLatestBreakingNews,
} from "../lib/getBreakingNews";

const TrendingNews = async () => {
  const latestNews = await getLatestBreakingNews();
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
        Trending Now
      </h2>
      <div className="space-y-4">
        {latestNews.slice(0, 4).map((item: BreakingNewsItem, index: number) => (
          <a
            key={item._id}
            href={`/news/${item.slug}`}
            className="flex items-center space-x-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 text-sm leading-snug">
              {item.headline}
            </h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
