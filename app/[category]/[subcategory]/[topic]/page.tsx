import { notFound } from "next/navigation";
import ArticleCard from "../../_components/ArticleCard";
import EmptyState from "../../_components/EmptyState";
import {
  getTopicArticles,
  generateTopicStaticParams,
} from "@/app/lib/categoryUtils";
import { Story } from "@/app/components/types";
import { getLatestBreakingNews } from "@/app/lib/getBreakingNews";
import CategoryLayout from "../../_components/CategoryLayout";

// ISR: Generate static params at build time
export async function generateStaticParams() {
  return await generateTopicStaticParams();
}

// ISR: Revalidate every hour
export const revalidate = 3600;

interface PageProps {
  params: {
    category: string;
    subcategory: string;
    topic: string;
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { category, subcategory, topic } = params;

  // Fetch data in parallel
  const [articles, trendingArticles, latestArticles] = await Promise.all([
    getTopicArticles(topic),
    getLatestBreakingNews(),
    getLatestBreakingNews(),
  ]);

  if (!articles) notFound();

  return (
    <CategoryLayout
      title={topic}
      description={`Latest stories in ${topic} under ${subcategory} / ${category}`}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: `/category/${category}`, label: category },
        { href: `/${category}/${subcategory}`, label: subcategory },
        { href: `/${category}/${subcategory}/${topic}`, label: topic },
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
              categoryLabel={topic}
              href={`/article/${article.slug}`}
              variant={index === 0 ? "featured" : "default"}
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
