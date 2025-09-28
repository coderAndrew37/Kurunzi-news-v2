import { getHeroStories } from "@/app/lib/getHeroStories";
import { sanityClient as client } from "@/app/lib/sanity.client";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import Hero from "./components/Hero";
import SectionWithLead from "./components/SectionWithLead";
import { RawSanityArticle, Story } from "./components/types";
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
    </div>
  );
}
