import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { getTrendingArticles } from "@/app/lib/getTrendingArticles";
import { getLatestArticlesByCategory } from "@/app/lib/getLatestArticlesByCategory";
import {
  RelatedArticle,
  Story,
  RawSanityArticle,
} from "@/app/components/types";

/**
 * Fetches and normalizes articles, trending, and latest content.
 */
export async function fetchCategoryContent({
  identifier,
  category,
  latestCount = 6,
  trendingCount = 6,
  fetchFn,
}: {
  identifier: string;
  category?: string;
  latestCount?: number;
  trendingCount?: number;
  fetchFn: (slug: string) => Promise<RawSanityArticle[]>;
}): Promise<{
  articles: Story[];
  trendingStories: Story[];
  latestStories: Story[];
}> {
  const [rawArticles, trendingArticles, latestArticles] = await Promise.all([
    fetchFn(identifier),
    getTrendingArticles(trendingCount),
    category ? getLatestArticlesByCategory(category, latestCount) : [],
  ]);

  const mapToStory = (a: RelatedArticle): Story => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? null,
    img: a.img ?? null,
    category: a.category ?? null,
    publishedAt: a.publishedAt ?? null,
    views: a.views ?? 0,
    readTime: a.readTime ?? 3,
  });

  return {
    articles: rawArticles.map(transformSanityArticleToStory),
    trendingStories: trendingArticles.map(mapToStory),
    latestStories: latestArticles.map(mapToStory),
  };
}
