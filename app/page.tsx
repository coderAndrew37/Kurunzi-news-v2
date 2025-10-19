import { getHeroStories } from "@/app/lib/getHeroStories";
import { serverClient } from "@/app/lib/sanity.server";
import { categoriesWithStoriesPaginatedQuery } from "@/app/lib/getCategoryStories";
import Hero from "./components/Hero";
import WeatherWidget from "./components/WeatherWidget";
import InfiniteCategories from "./components/InfiniteCategories";

export const revalidate = 60;

export default async function Home() {
  const heroStories = await getHeroStories();
  const initialCategories = await serverClient.fetch(
    categoriesWithStoriesPaginatedQuery,
    {
      start: 0,
      end: 3, // initial load
    }
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-end px-4">
        <WeatherWidget />
      </div>

      {heroStories.length > 0 && <Hero stories={heroStories} />}

      <InfiniteCategories initialCategories={initialCategories} />
    </div>
  );
}
