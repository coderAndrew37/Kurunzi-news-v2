// app/news/_components/Sidebar.tsx
import LatestArticlesSidebar from "@/app/(site)/article/_components/LatestArticlesSidebar";
import TrendingNews from "@/app/components/TrendingNews";
import { Story } from "@/app/components/types";
import Image from "next/image";

interface CategorySidebarProps {
  trendingArticles: Story[];
  latestArticles: Story[];
}

export default function CategorySidebar({
  latestArticles,
}: CategorySidebarProps) {
  return (
    <div className="space-y-6">
      {/* keep the existing Trending component (wire later if needed) */}
      <TrendingNews />

      {/* New: Latest articles for this category */}
      <LatestArticlesSidebar latestArticles={latestArticles} title="Latest" />

      {/* Ad Banner */}
      <Image
        src="https://via.placeholder.com/300x250"
        alt="Ad Banner"
        width={300}
        height={250}
        className="w-full rounded-lg"
      />
    </div>
  );
}
