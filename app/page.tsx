import { getHeroStories } from "@/app/lib/getHeroStories";
import { sanityClient as client } from "@/app/lib/sanity.client";
import { frontPageArticlesQuery as articlesQuery } from "@/app/lib/sanity.queries";
import {
  RawSanityArticle,
  transformSanityArticleToStory,
} from "@/app/lib/sanity.utils";
import Hero from "./components/Hero";
import SectionWithLead from "./components/SectionWithLead";
import { Story } from "./components/types";
import { categoriesWithStoriesQuery } from "./lib/getCategoryStories";

export const revalidate = 60;

interface CategoryWithStories {
  _id: string;
  title: string;
  slug: string;
  stories: RawSanityArticle[];
}

export default async function Home() {
  // 1. Hero stories
  const heroStories: Story[] = await getHeroStories();

  // 2. Sidebar trending (all articles)
  const data: RawSanityArticle[] = await client.fetch(articlesQuery);
  const stories: Story[] = data.map(transformSanityArticleToStory);

  // 3. Categories + stories
  const categories = await client.fetch(categoriesWithStoriesQuery);

  return (
    <div className="flex flex-col">
      {heroStories.length > 0 && <Hero stories={heroStories} />}

      {/* Render each category dynamically */}
      {categories.map((cat: CategoryWithStories) => {
        const catStories: Story[] = (cat.stories || []).map(
          transformSanityArticleToStory
        );
        if (catStories.length === 0) return null; // skip empty categories

        return (
          <SectionWithLead
            key={cat._id}
            sectionTitle={cat.title}
            stories={catStories}
          />
        );
      })}

      {/* Sidebar + main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Sections */}
        </div>

        <aside className="flex flex-col gap-6">
          <div className="bg-gray-50 border rounded-lg p-4">
            <h2 className="text-lg font-bold mb-3 border-b pb-2">Trending</h2>
            <ul className="space-y-2">
              {stories.slice(0, 5).map((story) => (
                <li
                  key={story.id}
                  className="text-sm hover:underline cursor-pointer"
                >
                  {story.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            Sidebar Ad (300x600)
          </div>
          <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            Sidebar Ad (300x600)
          </div>
        </aside>
      </div>
    </div>
  );
}
