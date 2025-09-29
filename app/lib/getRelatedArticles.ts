import { RelatedArticle } from "../components/types";
import { SanityArticle } from "../types/sanityArticle";
import { urlFor } from "./sanity.image";
import { serverClient } from "./sanity.server";

export async function getRelatedArticles(
  currentSlug: string,
  category?: string,
  limit = 3
): Promise<RelatedArticle[]> {
  const query = category
    ? `*[_type == "breakingNews" && slug.current != $currentSlug && category == $category && isActive == true] 
       | order(publishedAt desc)[0...$limit]`
    : `*[_type == "breakingNews" && slug.current != $currentSlug && isActive == true] 
       | order(publishedAt desc)[0...$limit]`;

  const articles = await serverClient.fetch<SanityArticle[]>(query, {
    currentSlug,
    category,
    limit,
  });

  return articles.map((article) => ({
    id: String(article._id), // ensure string, since your type has `id: string`
    slug: article.slug?.current ?? "",
    title: article.fullTitle || article.headline,
    img: article.featuredImage ? urlFor(article.featuredImage).url() : "",
    category: article.category ?? "",
    date: article.publishedAt ?? "",
    readTime: 3, // fallback
    publishedAt: article.publishedAt ?? "",
    fullTitle: article.fullTitle ?? "",
  }));
}
