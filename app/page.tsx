import { Metadata } from "next";
import { getHeroStories } from "@/app/lib/getHeroStories";
import { serverClient } from "@/app/lib/sanity.server";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import Hero from "./components/Hero";
import SectionWithLead from "./components/SectionWithLead";
import { RawSanityArticle, Story } from "./components/types";
import { categoriesWithStoriesQuery } from "./lib/getCategoryStories";

export const revalidate = 60;

// ✅ Homepage metadata
export const metadata: Metadata = {
  title: "Kurunzi News | Independent Kenyan News",
  description:
    "Get the latest news, politics, sports, and culture stories from Kenya and beyond.",
  openGraph: {
    title: "Kurunzi News | Independent Kenyan News",
    description:
      "Bringing you breaking news, politics, sports, and culture stories from Kenya.",
    url: "https://kurunzinews.com/",
    type: "website",
    images: [
      {
        url: "https://kurunzinews.com/og-image.png", // 🔑 ideally generate or upload one
        width: 1200,
        height: 630,
        alt: "Kurunzi News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurunzi News",
    description: "Independent Kenyan news, politics, sports and more",
    images: ["https://kurunzinews.com/og-image.png"], // fallback to same OG image
  },
  alternates: {
    canonical: "https://kurunzinews.com/",
  },
};

interface CategoryWithStories {
  _id: string;
  title: string;
  slug: string;
  stories: RawSanityArticle[];
}

export default async function Home() {
  // 1. Hero stories
  const heroStories: Story[] = await getHeroStories();

  // 2. Categories + stories
  const categories = await serverClient.fetch(categoriesWithStoriesQuery);

  return (
    <div className="flex flex-col">
      {heroStories.length > 0 && <Hero stories={heroStories} />}

      {categories.map((cat: CategoryWithStories) => {
        const catStories: Story[] = (cat.stories || []).map(
          transformSanityArticleToStory
        );
        if (catStories.length === 0) return null;

        return (
          <SectionWithLead
            key={cat._id}
            sectionTitle={cat.title}
            stories={catStories}
            sectionSlug={cat.slug}
          />
        );
      })}
    </div>
  );
}
