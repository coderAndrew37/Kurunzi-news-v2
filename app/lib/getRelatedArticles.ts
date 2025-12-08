import { serverClient } from "./sanity.server";

/**
 * Fetch related articles from Sanity based on category.
 * Works for reference-based or string categories.
 */
export async function getRelatedArticles(
  currentSlug: string,
  category?: string,
  limit = 4
) {
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
    | order(publishedAt desc)[0...$limit]
    {
      _id,
      title,
      subtitle,
      excerpt,
      publishedAt,
      readTime,
      "slug": slug.current,
      mainImage,
      body,
      author->{name, image},
      categories[]->{title, "slug": slug.current},
      tags,
      isFeatured,
      isVideo,
      duration
    }
  `;

  return await serverClient.fetch(query, { currentSlug, category, limit });
}
