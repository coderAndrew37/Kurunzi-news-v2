// app/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryData, getCategoryArticles } from "@/app/lib/categoryUtils";
import SectionWithLead from "@/app/components/SectionWithLead";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { serverClient } from "@/app/lib/sanity.server";
import { groq } from "next-sanity";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const query = groq`*[_type == "category"]{ "slug": slug.current }`;
  const categories: { slug?: string }[] = await serverClient.fetch(query);

  return categories
    .filter((c) => c.slug)
    .map((c) => ({
      category: String(c.slug),
    }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const currentCategory = await getCategoryData(category);

  if (!currentCategory) {
    return {
      title: "Category Not Found | Kurunzi News",
      description: "This category could not be found.",
    };
  }

  return {
    title: `${currentCategory.title} | Kurunzi News`,
    description:
      currentCategory.description ??
      `Latest ${currentCategory.title} news and updates.`,
    alternates: {
      canonical: `https://kurunzinews.com/${category}`,
    },
  };
}

export default async function SimpleCategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;
  const currentCategory = await getCategoryData(category);
  if (!currentCategory) notFound();

  // Get articles for this category (similar to homepage)
  const articles = await getCategoryArticles(category);
  const stories = articles.map(transformSanityArticleToStory);

  if (stories.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {currentCategory.title}
          </h1>
          <p className="text-gray-600">
            No articles found in this category yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentCategory.title}
          </h1>
          {currentCategory.description && (
            <p className="text-gray-600 mt-2">{currentCategory.description}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <SectionWithLead
          sectionTitle={currentCategory.title}
          stories={stories}
          sectionSlug={category}
          layoutType="featured"
        />

        {/* Link to full archive */}
        <div className="mt-12 text-center border-t pt-8">
          <a
            href={`/category/${category}`}
            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
          >
            View Full Archive
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <p className="text-gray-500 text-sm mt-2">
            Browse all articles in {currentCategory.title} with advanced
            filtering
          </p>
        </div>
      </div>
    </div>
  );
}
