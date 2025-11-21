// app/(news)/[category]/page.tsx
import { notFound } from "next/navigation";
import {
  getCategoryData,
  getCategoryArticles,
  generateCategoryStaticParams,
} from "@/app/lib/categoryUtils";
import { fetchCategoryContent } from "@/app/lib/fetchCategoryContent";
import CategoryLayout from "./_components/CategoryLayout";
import ArticleCard from "./_components/ArticleCard";
import EmptyState from "./_components/EmptyState";
import type { Metadata } from "next";
import SubcategoriesGrid from "./_components/SUbCategoriesGrid";

export async function generateStaticParams() {
  return await generateCategoryStaticParams();
}

export const revalidate = 3600;

interface PageProps {
  params: { category: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
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
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
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
      showSubcategories={<SubcategoriesGrid category={currentCategory} />}
    >
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <ArticleCard
              key={a.id}
              article={a}
              categoryLabel={currentCategory.title}
              href={`/article/${a.slug}`}
              variant={i === 0 ? "featured" : "default"}
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
