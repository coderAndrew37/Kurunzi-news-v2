import { notFound } from "next/navigation";
import {
  getSubcategoryArticles,
  generateSubcategoryStaticParams,
} from "@/app/lib/categoryUtils";
import { fetchCategoryContent } from "@/app/lib/fetchCategoryContent";
import CategoryLayout from "../_components/CategoryLayout";
import ArticleCard from "../_components/ArticleCard";
import EmptyState from "../_components/EmptyState";
import type { Metadata } from "next";

export const revalidate = 3600;

type SubcategoryParams = Promise<{
  category: string;
  subcategory: string;
}>;

export async function generateStaticParams() {
  return await generateSubcategoryStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: SubcategoryParams;
}): Promise<Metadata> {
  const { category, subcategory } = await params;

  return {
    title: `${subcategory} News | ${category} - Kurunzi News`,
    description: `Latest stories and updates in ${subcategory} under ${category}.`,
  };
}

export default async function SubcategoryPage({
  params,
}: {
  params: SubcategoryParams;
}) {
  const { category, subcategory } = await params;

  const { articles, trendingStories, latestStories } =
    await fetchCategoryContent({
      identifier: subcategory,
      category,
      fetchFn: getSubcategoryArticles,
    });

  if (!articles.length) notFound();

  return (
    <CategoryLayout
      title={subcategory}
      description={`Latest stories in ${subcategory} under ${category}`}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: `/category/${category}`, label: category },
        { href: `/category/${category}/${subcategory}`, label: subcategory },
      ]}
      articles={articles}
      trendingArticles={trendingStories}
      latestArticles={latestStories}
    >
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <ArticleCard
              key={a.id}
              article={a}
              categoryLabel={subcategory}
              href={`/article/${a.slug}`}
              variant={i === 0 ? "featured" : "default"}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No articles yet"
          message={`We haven't published any articles in ${subcategory} yet.`}
        />
      )}
    </CategoryLayout>
  );
}
