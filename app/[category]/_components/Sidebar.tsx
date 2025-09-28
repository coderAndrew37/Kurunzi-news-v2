import LatestBreakingNews from "@/app/components/LatestBreakingNews";
import TrendingNews from "@/app/components/TrendingNews";
import { Story } from "@/app/components/types";
import Image from "next/image";
interface CategorySidebarProps {
  trendingArticles: Story[];
  latestArticles: Story[];
}

export default function CategorySidebar({}: CategorySidebarProps) {
  return (
    <div className="space-y-6">
      <TrendingNews />
      <LatestBreakingNews />

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
