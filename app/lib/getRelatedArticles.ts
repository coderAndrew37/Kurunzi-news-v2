import { RelatedArticle, RawSanityArticle } from "../components/types";
import { urlFor } from "./sanity.image";
import { serverClient } from "./sanity.server";

/**
 * Fetch related articles from Sanity based on category.
 * Works for reference-based or string categories.
 */
export async function getRelatedArticles(
  currentSlug: string,
  category?: string,
  limit = 3
): Promise<RelatedArticle[]> {
  const query = `
    *[
      _type == "article" &&
      slug.current != $currentSlug &&
      (
        !defined($category) ||
        $category in categories[]->title ||
        $category in categories[]->slug.current
      )
    ]
    | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      "category": categories[0]->title,
      mainImage
    }
  `;

  // 👇 Must be an ARRAY type (note the [] at the end)
  const articles = await serverClient.fetch<
    (RawSanityArticle & { category?: string })[]
  >(query, {
    currentSlug,
    category,
    limit,
  });

  if (!articles?.length) return [];

  return articles.map((article) => ({
    id: String(article._id),
    slug: article.slug ?? "", // now `slug` is a string (thanks to GROQ alias)
    title: article.title ?? "Untitled",
    excerpt: article.excerpt ?? "",
    img: article.mainImage ? urlFor(article.mainImage).url() : null,
    category: article.category ?? "General",
    date: article.publishedAt ?? "",
    readTime: article.readTime ?? 3,
    publishedAt: article.publishedAt ?? "",
    fullTitle: article.title ?? "Untitled",
  }));
}
