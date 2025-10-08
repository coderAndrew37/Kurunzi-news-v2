import { notFound } from "next/navigation";
import ArticleCard from "../_components/ArticleCard";
import EmptyState from "../_components/EmptyState";
import {
  getSubcategoryArticles,
  generateSubcategoryStaticParams,
} from "@/app/lib/categoryUtils";
import { getLatestBreakingNews } from "@/app/lib/getTrendingArticles";
import CategoryLayout from "../_components/CategoryLayout";
import { Story } from "@/app/components/types";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import type { Metadata } from "next";

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

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = params;

  // Fetch data in parallel
  const [articles, trendingArticles, latestArticles] = await Promise.all([
    getSubcategoryArticles(subcategory),
    getLatestBreakingNews(),
    getLatestBreakingNews(),
  ]);

  if (!articles) notFound();

  const stories: Story[] = articles.map(transformSanityArticleToStory);

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
      trendingArticles={trendingArticles}
      latestArticles={latestArticles}
    >
      {/* Custom articles grid */}
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
