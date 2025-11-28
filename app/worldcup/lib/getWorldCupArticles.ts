import { serverClient } from "@/app/lib/sanity.server";
import {
  allWorldCupArticlesQuery,
  featuredWorldCupArticlesQuery,
  worldCupArticleQuery,
  worldCupCategoriesQuery,
  worldCupArticlesByCategoryQuery,
  relatedWorldCupArticlesQuery,
} from "@/app/lib/worldcupQueries";

export function getAllWorldCupArticles() {
  return serverClient.fetch(allWorldCupArticlesQuery);
}

export function getFeaturedWorldCupArticles() {
  return serverClient.fetch(featuredWorldCupArticlesQuery);
}

export function getWorldCupArticle(slug: string) {
  return serverClient.fetch(worldCupArticleQuery, { slug });
}

export function getWorldCupCategories() {
  return serverClient.fetch(worldCupCategoriesQuery);
}

export function getWorldCupArticlesByCategory(categorySlug: string) {
  return serverClient.fetch(worldCupArticlesByCategoryQuery, {
    category: categorySlug,
  });
}

export async function getRelatedWorldCupArticles(id: string) {
  const result = await serverClient.fetch(relatedWorldCupArticlesQuery, { id });
  return result?.related ?? [];
}
