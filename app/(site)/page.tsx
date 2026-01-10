// app/page.tsx
import { getHeroStories } from "@/app/lib/getHeroStories";
import Hero from "../components/Hero";
import NewsSections from "../components/NewsSection";
import WeatherWidget from "../components/WeatherWidget";
import { AppCategory } from "../lib/api";
import { fetchAllCategories } from "../lib/getCategoryStories";
import BreakingNewsTicker from "../components/BreakingNewsTicker";

export const revalidate = 60;

// Priority order for sections (similar to People's Daily)
const SECTION_ORDER = [
  "news",
  "entertainment",
  "kurunzi-exclusive",
  "lifestyle-and-celeb-watch",
];

// Sort categories based on priority order
function sortCategories(categories: AppCategory[]): AppCategory[] {
  return [...categories].sort((a, b) => {
    const aIndex = SECTION_ORDER.indexOf(a.slug);
    const bIndex = SECTION_ORDER.indexOf(b.slug);

    // If both are in priority list, sort by priority order
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    // If only one is in priority list, prioritize it
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // Otherwise sort alphabetically
    return a.title.localeCompare(b.title);
  });
}

export default async function Home() {
  const heroStories = await getHeroStories();
  const allCategories = await fetchAllCategories(); // AppCategory[]

  const categoriesWithStories = allCategories.filter(
    (cat) => cat.stories && cat.stories.length > 0
  );

  // Sort categories
  const sortedCategories = sortCategories(categoriesWithStories);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Weather Widget */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-end">
            <WeatherWidget />
          </div>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* Hero Section - Similar to People's Daily */}
      {heroStories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Hero stories={heroStories} />
        </div>
      )}

      {/* Main News Sections */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <NewsSections categories={sortedCategories} />
      </div>
    </div>
  );
}
