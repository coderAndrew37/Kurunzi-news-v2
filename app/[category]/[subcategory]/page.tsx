import { notFound } from "next/navigation";
import ArticleCard from "../_components/ArticleCard";
import EmptyState from "../_components/EmptyState";
import {
  getSubcategoryArticles,
  generateSubcategoryStaticParams,
} from "@/app/lib/categoryUtils";
import { getLatestBreakingNews } from "@/app/lib/getBreakingNews";
import CategoryLayout from "../_components/CategoryLayout";
import { Story } from "@/app/components/types";

// ISR: Generate static params at build time
export async function generateStaticParams() {
  return await generateSubcategoryStaticParams();
}

// ISR: Revalidate every hour
export const revalidate = 3600;

interface PageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = params;

  // Fetch data in parallel
  const [articles, trendingArticles, latestArticles] = await Promise.all([
    getSubcategoryArticles(subcategory),
    getLatestBreakingNews(),
    getLatestBreakingNews(),
  ]);

  if (!articles) notFound();

  return (
    <CategoryLayout
      title={subcategory}
      description={`Latest stories in ${subcategory} under ${category}`}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: `/category/${category}`, label: category },
        { href: `/${category}/${subcategory}`, label: subcategory },
      ]}
      articles={articles}
      trendingArticles={trendingArticles}
      latestArticles={latestArticles}
    >
      {/* Custom articles grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map((article: Story, index: number) => (
            <ArticleCard
              key={article.id}
              article={article}
              categoryLabel={subcategory}
              href={`/article/${article.slug}`}
              variant={index === 0 ? "featured" : "default"}
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
