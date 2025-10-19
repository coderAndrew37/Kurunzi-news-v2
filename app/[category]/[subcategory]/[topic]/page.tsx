import { notFound } from "next/navigation";
import {
  getTopicArticles,
  generateTopicStaticParams,
} from "@/app/lib/categoryUtils";
import { fetchCategoryContent } from "@/app/lib/fetchCategoryContent";
import CategoryLayout from "../../_components/CategoryLayout";
import ArticleCard from "../../_components/ArticleCard";
import EmptyState from "../../_components/EmptyState";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return await generateTopicStaticParams();
}

export const revalidate = 3600;

interface PageProps {
  params: { category: string; subcategory: string; topic: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, subcategory, topic } = params;
  return {
    title: `${topic} News | ${subcategory} | ${category} - Kurunzi News`,
    description: `Latest stories and updates in ${topic}, under ${subcategory} / ${category}.`,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { category, subcategory, topic } = params;

  const { articles, trendingStories, latestStories } =
    await fetchCategoryContent({
      identifier: topic,
      category,
      fetchFn: getTopicArticles,
    });

  if (!articles.length) notFound();

  return (
    <CategoryLayout
      title={topic}
      description={`Latest stories in ${topic} under ${subcategory} / ${category}`}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: `/${category}`, label: category },
        { href: `/${category}/${subcategory}`, label: subcategory },
        { href: `/${category}/${subcategory}/${topic}`, label: topic },
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
              categoryLabel={topic}
              href={`/article/${a.slug}`}
              variant={i === 0 ? "featured" : "default"}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No articles yet"
          message={`We haven't published any articles in ${topic} yet.`}
        />
      )}
    </CategoryLayout>
  );
}
