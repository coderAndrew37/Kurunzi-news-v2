import LatestArticlesSidebar from "@/app/components/LatestArticles";
import TrendingNews from "@/app/components/TrendingNews";
import type { ArticleCard } from "@/app/components/types";
import Image from "next/image";

interface CategorySidebarProps {
  latestArticles: ArticleCard[];
}

export default function CategorySidebar({
  latestArticles,
}: CategorySidebarProps) {
  return (
    <div className="space-y-6">
      <TrendingNews />
      <LatestArticlesSidebar latestArticles={latestArticles} title="Latest" />

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
