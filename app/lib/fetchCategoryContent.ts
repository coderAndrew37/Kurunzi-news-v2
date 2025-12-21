import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { getTrendingArticles } from "@/app/lib/getTrendingArticles";
import { getLatestArticlesByCategory } from "@/app/lib/getLatestArticlesByCategory";
import {
  RelatedArticle,
  Story,
  RawSanityArticle,
} from "@/app/components/types";

/**
 * Normalizes RelatedArticle | Story into Story
 */
function normalizeToStory(item: RelatedArticle | Story): Story {
  if ("_id" in item) {
    // RelatedArticle → Story
    return {
      id: item._id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt ?? null,
      img: item.img ?? null,
      category: item.category ?? null,
      publishedAt: item.publishedAt ?? null,
      views: item.views ?? 0,
      readTime: item.readTime ?? 3,
    };
  }

  // Already a Story
  return item;
}

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
    category
      ? getLatestArticlesByCategory(category, latestCount)
      : Promise.resolve<RelatedArticle[]>([]),
  ]);

  return {
    articles: rawArticles.map(transformSanityArticleToStory),
    trendingStories: trendingArticles.map(normalizeToStory),
    latestStories: latestArticles.map(normalizeToStory),
  };
}
