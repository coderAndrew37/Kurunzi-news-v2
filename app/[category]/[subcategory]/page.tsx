import { RelatedArticle, Story } from "@/app/components/types";
import {
  generateSubcategoryStaticParams,
  getSubcategoryArticles,
} from "@/app/lib/categoryUtils";
import { getLatestArticlesByCategory } from "@/app/lib/getLatestArticlesByCategory";
import { getTrendingArticles } from "@/app/lib/getTrendingArticles";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "../_components/ArticleCard";
import CategoryLayout from "../_components/CategoryLayout";
import EmptyState from "../_components/EmptyState";

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

/**
 * ✅ SEO metadata for subcategory pages
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, subcategory } = params;

  return {
    title: `${subcategory} News | ${category} - Kurunzi News`,
    description: `Latest stories and updates in ${subcategory} under ${category}. Stay informed with trending and recent news.`,
    openGraph: {
      title: `${subcategory} News | ${category}`,
      description: `Latest stories and updates in ${subcategory} under ${category}.`,
      url: `https://kurunzinews.com/${category}/${subcategory}`,
      siteName: "Kurunzi News",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${subcategory} News | ${category}`,
      description: `Latest stories and updates in ${subcategory}.`,
    },
  };
}

/**
 * ✅ Subcategory Page with Trending + Latest integration
 */
export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = params;

  // Fetch data in parallel
  const [rawArticles, trendingArticles, latestArticles] = await Promise.all([
    getSubcategoryArticles(subcategory),
    getTrendingArticles(6),
    getLatestArticlesByCategory(category, 6),
  ]);

  if (!rawArticles) notFound();

  // Normalize main articles
  const stories: Story[] = rawArticles.map(transformSanityArticleToStory);

  // Convert trending & latest to Story shape
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
      title={subcategory}
      description={`Latest stories in ${subcategory} under ${category}`}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: `/${category}`, label: category },
        { href: `/${category}/${subcategory}`, label: subcategory },
      ]}
      articles={stories}
      trendingArticles={trendingStories}
      latestArticles={latestStories}
    >
      {stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stories.map((article: Story, index: number) => (
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
