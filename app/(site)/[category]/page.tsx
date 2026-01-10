import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getCategoryData,
  getCategoryArticles,
  generateCategoryStaticParams,
} from "@/app/lib/categoryUtils";
import { fetchCategoryContent } from "@/app/lib/fetchCategoryContent";
import ArticleCard from "./_components/ArticleCard";
import CategoryLayout from "./_components/CategoryLayout";
import EmptyState from "./_components/EmptyState";
import SubcategoriesGrid from "./_components/SUbCategoriesGrid";

export const revalidate = 3600;

/* ----------------------------------------
   TYPES
----------------------------------------- */
type CategoryParams = {
  category: string;
};

/* ----------------------------------------
   STATIC PARAMS
----------------------------------------- */
export async function generateStaticParams() {
  return await generateCategoryStaticParams();
}

/* ----------------------------------------
   METADATA
----------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const { category } = params;

  const currentCategory = await getCategoryData(category);

  if (!currentCategory) {
    return {
      title: "Category Not Found | Kurunzi News",
      description: "This category could not be found.",
    };
  }

  return {
    title: `${currentCategory.title} News | Kurunzi News`,
    description:
      currentCategory.description ??
      `Latest stories and updates in ${currentCategory.title}.`,
    alternates: {
      canonical: `https://kurunzinews.com/${category}`,
    },
  };
}

/* ----------------------------------------
   PAGE
----------------------------------------- */
export default async function CategoryPage({
  params,
}: {
  params: CategoryParams;
}) {
  const { category } = params;

  const currentCategory = await getCategoryData(category);
  if (!currentCategory) notFound();

  const { articles, trendingStories, latestStories } =
    await fetchCategoryContent({
      identifier: category,
      category,
      fetchFn: getCategoryArticles,
    });

  return (
    <CategoryLayout
      title={currentCategory.title}
      description={currentCategory.description}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: `/${category}`, label: currentCategory.title },
      ]}
      articles={articles}
      trendingArticles={trendingStories}
      latestArticles={latestStories}
      showSubcategories={
        currentCategory.subcategories?.length ? (
          <SubcategoriesGrid category={currentCategory} />
        ) : null
      }
    >
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              categoryLabel={currentCategory.title}
              href={`/${category}/${article.slug}`}
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
