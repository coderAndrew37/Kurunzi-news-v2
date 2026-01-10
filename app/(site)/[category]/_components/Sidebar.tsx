import LatestArticlesSidebar from "@/app/components/LatestArticles";
import TrendingNews from "@/app/components/TrendingNews";
import type { ArticleCard } from "@/app/components/types";
import Image from "next/image";

interface CategorySidebarProps {
  latestArticles: ArticleCard[];
  trendingArticles: ArticleCard[];
  categoryTitle: string;
  showTags?: boolean;
}

export default function CategorySidebar({
  latestArticles,
  trendingArticles,
  categoryTitle,
  showTags = false,
}: CategorySidebarProps) {
  return (
    <div className="space-y-6">
      <TrendingNews trendingArticles={trendingArticles} title="Trending" />

      <LatestArticlesSidebar latestArticles={latestArticles} title="Latest" />

      {showTags && (
        <div className="bg-white rounded-xl border p-4">
          <h4 className="font-semibold text-gray-900 mb-3">
            {categoryTitle} Tags
          </h4>
          {/* tags component here */}
        </div>
      )}

      <Image
        src="https://via.placeholder.com/300x250"
        alt="Advertisement"
        width={300}
        height={250}
        className="w-full rounded-lg"
      />
    </div>
  );
}
