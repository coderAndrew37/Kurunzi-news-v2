import { RelatedArticle, Story } from "@/app/components/types";
import {
  generateTopicStaticParams,
  getTopicArticles,
} from "@/app/lib/categoryUtils";
import { getLatestArticlesByCategory } from "@/app/lib/getLatestArticlesByCategory";
import { getTrendingArticles } from "@/app/lib/getTrendingArticles";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "../../_components/ArticleCard";
import CategoryLayout from "../../_components/CategoryLayout";
import EmptyState from "../../_components/EmptyState";

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
  const { category, subcategory, topic } = params;

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

/**
 * ✅ Topic Page
 */
export default async function TopicPage({ params }: PageProps) {
  const { category, subcategory, topic } = params;

  // Fetch everything in parallel
  const [rawArticles, trendingArticles, latestArticles] = await Promise.all([
    getTopicArticles(topic),
    getTrendingArticles(6),
    getLatestArticlesByCategory(category, 6),
  ]);

  if (!rawArticles) notFound();

  // Normalize main article list
  const articles: Story[] = rawArticles.map(transformSanityArticleToStory);

  // Normalize trending articles
  const trendingStories: Story[] = trendingArticles.map(
    (a: RelatedArticle) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? null,
      img: a.img ?? null,
      category: a.category ?? null,
      publishedAt: a.publishedAt ?? null,
      views: a.views ?? 0,
      readTime: a.readTime ?? 3,
    })
  );

  // Normalize latest articles
  const latestStories: Story[] = latestArticles.map((a: RelatedArticle) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? null,
    img: a.img ?? null,
    category: a.category ?? null,
    publishedAt: a.publishedAt ?? null,
    views: a.views ?? 0,
    readTime: a.readTime ?? 3,
  }));

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
