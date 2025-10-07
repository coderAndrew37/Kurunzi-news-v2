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
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import type { Metadata } from "next";

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

/**
 * ✅ SEO metadata for topic pages
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, subcategory, topic } = await params;

  return {
    title: `${topic} News | ${subcategory} | ${category} - Kurunzi News`,
    description: `Latest stories and updates in ${topic}, under ${subcategory} / ${category}.`,
    openGraph: {
      title: `${topic} News | ${subcategory}`,
      description: `Stay updated with the latest stories in ${topic} under ${subcategory} / ${category}.`,
      url: `https://kurunzinews.com/${category}/${subcategory}/${topic}`,
      siteName: "Kurunzi News",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic} News`,
      description: `Latest stories and updates in ${topic}.`,
    },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { category, subcategory, topic } = params;

  // Fetch data in parallel
  const [rawArticles, trendingArticles, latestArticles] = await Promise.all([
    getTopicArticles(topic),
    getLatestBreakingNews(),
    getLatestBreakingNews(),
  ]);

  if (!rawArticles) notFound();

  const articles: Story[] = rawArticles.map(transformSanityArticleToStory);

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
