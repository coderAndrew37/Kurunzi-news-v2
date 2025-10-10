import { notFound } from "next/navigation";
import {
  getCategoryData,
  getCategoryArticles,
  generateCategoryStaticParams,
} from "@/app/lib/categoryUtils";
import ArticleCard from "./_components/ArticleCard";
import CategoryLayout from "./_components/CategoryLayout";
import EmptyState from "./_components/EmptyState";
import SubcategoriesGrid from "./_components/SUbCategoriesGrid";
import { Story, RelatedArticle } from "@/app/components/types";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { getLatestArticlesByCategory } from "@/app/lib/getLatestArticlesByCategory";
import { getTrendingArticles } from "@/app/lib/getTrendingArticles";
import type { Metadata } from "next";

// ISR: Generate static params at build time
export async function generateStaticParams() {
  return await generateCategoryStaticParams();
}

// ISR: Revalidate every hour
export const revalidate = 3600;

interface PageProps {
  params: {
    category: string;
  };
}

/**
 * ✅ SEO metadata for category pages
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
    openGraph: {
      title: `${currentCategory.title} News`,
      description:
        currentCategory.description ??
        `Stay updated with the latest stories in ${currentCategory.title}.`,
      url: `https://kurunzinews.com/${category}`,
      siteName: "Kurunzi News",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${currentCategory.title} News`,
      description:
        currentCategory.description ??
        `Stay updated with the latest stories in ${currentCategory.title}.`,
    },
  };
}

/**
 * ✅ Category Page with Trending + Latest integration
 */
export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;

  // Fetch everything in parallel for performance
  const [currentCategory, rawArticles, latestArticles, trendingArticles] =
    await Promise.all([
      getCategoryData(categorySlug),
      getCategoryArticles(categorySlug),
      getLatestArticlesByCategory(categorySlug, 6),
      getTrendingArticles(6),
    ]);

  if (!currentCategory) notFound();

  // Normalize articles to your Story model
  const articles: Story[] = rawArticles.map(transformSanityArticleToStory);

  // Map trending & latest to Story shape (if needed)
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
      title={currentCategory.title}
      description={currentCategory.description}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: `/${categorySlug}`, label: currentCategory.title },
      ]}
      articles={articles}
      trendingArticles={trendingStories}
      latestArticles={latestStories}
      showSubcategories={<SubcategoriesGrid category={currentCategory} />}
    >
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map((article: Story, index: number) => (
            <ArticleCard
              key={article.id}
              article={article}
              categoryLabel={currentCategory.title}
              href={`/article/${article.slug}`}
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
