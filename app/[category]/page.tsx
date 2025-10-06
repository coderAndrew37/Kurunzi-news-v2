import { notFound } from "next/navigation";

import {
  getCategoryData,
  getCategoryArticles,
  generateCategoryStaticParams,
} from "@/app/lib/categoryUtils";
import { getLatestBreakingNews } from "../lib/getBreakingNews";
import ArticleCard from "./_components/ArticleCard";
import CategoryLayout from "./_components/CategoryLayout";
import EmptyState from "./_components/EmptyState";
import SubcategoriesGrid from "./_components/SUbCategoriesGrid";
import { Story } from "../components/types";
import { transformSanityArticleToStory } from "../lib/sanity.utils";
import type { Metadata } from "next";

// ISR: Generate static params at build time
export async function generateStaticParams() {
  return await generateCategoryStaticParams();
}

// ISR: Revalidate every hour
export const revalidate = 3600;

interface PageProps {
  params: {
    category: string;
  };
}

/**
 * ✅ SEO metadata for category pages
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const currentCategory = await getCategoryData(category);

  if (!currentCategory) {
    return {
      title: "Category Not Found | MySite",
      description: "This category could not be found.",
    };
  }

  return {
    title: `${currentCategory.title} News | Kurunzi News`,
    description:
      currentCategory.description ??
      `Latest stories and updates in ${currentCategory.title}.`,
    openGraph: {
      title: `${currentCategory.title} News`,
      description:
        currentCategory.description ??
        `Stay updated with the latest stories in ${currentCategory.title}.`,
      url: `https://kurunzinews.com/${category}`,
      siteName: "Kurunzi News",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${currentCategory.title} News`,
      description:
        currentCategory.description ??
        `Stay updated with the latest stories in ${currentCategory.title}.`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;

  // Fetch data in parallel
  const [currentCategory, rawArticles, trendingArticles, latestArticles] =
    await Promise.all([
      getCategoryData(categorySlug),
      getCategoryArticles(categorySlug),
      getLatestBreakingNews(),
      getLatestBreakingNews(),
    ]);

  if (!currentCategory) notFound();

  const articles: Story[] = rawArticles.map(transformSanityArticleToStory);

  return (
    <CategoryLayout
      title={currentCategory.title}
      description={currentCategory.description}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: `/${categorySlug}`, label: currentCategory.title },
      ]}
      articles={articles}
      trendingArticles={trendingArticles}
      latestArticles={latestArticles}
      showSubcategories={<SubcategoriesGrid category={currentCategory} />}
    >
      {/* Custom articles grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map((article: Story, index: number) => (
            <ArticleCard
              key={article.id}
              article={article}
              categoryLabel={currentCategory.title}
              href={`/article/${article.slug}`}
              variant={index === 0 ? "featured" : "default"}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No articles yet"
          message={`We haven't published any articles in ${currentCategory.title} yet.`}
        />
      )}
    </CategoryLayout>
  );
}
