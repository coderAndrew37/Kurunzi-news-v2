import { getHeroStories } from "@/app/lib/getHeroStories";
import { serverClient } from "@/app/lib/sanity.server";
import { categoriesWithStoriesPaginatedQuery } from "@/app/lib/getCategoryStories";
import Hero from "./components/Hero";
import WeatherWidget from "./components/WeatherWidget";
import InfiniteCategories from "./components/InfiniteCategories";
import { SanityCategory } from "./lib/api";

export const revalidate = 60;

export default async function Home() {
  const heroStories = await getHeroStories();

  // Fetch the first page of categories
  const initialCategories = await serverClient.fetch(
    categoriesWithStoriesPaginatedQuery,
    { start: 0, end: 3 }
  );

  // ✅ Fetch priority categories explicitly to ensure they’re always present
  const priorityCategories = await serverClient.fetch(
    `*[_type == "category" && slug.current in ["kurunzi-exclusive", "health", "business"]]{
      _id,
      title,
      "slug": slug.current,
      description,
      "stories": *[_type == "article" && references(^._id)] 
        | order(publishedAt desc)[0...20] {
          "_id": _id,
          title,
          subtitle,
          "slug": slug.current,
          mainImage,
          category->{_id, title, "slug": slug.current},
          author->{name, image},
          publishedAt,
          excerpt,
          readTime,
          isVideo,
          duration
        }
    }`
  );

  // ✅ Merge and de-duplicate by ID
  const mergedCategories: SanityCategory[] = [
    ...priorityCategories,
    ...initialCategories.filter(
      (c: SanityCategory) =>
        !priorityCategories.some((p: SanityCategory) => p._id === c._id)
    ),
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-end px-4">
        <WeatherWidget />
      </div>

      {heroStories.length > 0 && <Hero stories={heroStories} />}

      <InfiniteCategories initialCategories={mergedCategories} />
    </div>
  );
}
