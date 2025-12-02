// wherever your UI type lives

import { WorldCupArticle, WorldCupUIArticle } from "../components/types";

export function normalizeWorldCupArticles(
  raw: WorldCupArticle[]
): WorldCupUIArticle[] {
  return raw.map(
    (a): WorldCupUIArticle => ({
      _id: a._id,
      title: a.title,
      slug: a.slug.current,
      excerpt: a.excerpt,
      publishedAt: a.publishedAt,
      readTime: a.readTime,

      // ✔ Category: take first category slug or default
      category: a.categories?.[0]?.slug.current ?? "uncategorized",

      // ✔ Author
      author: {
        name: a.author?.name ?? "Unknown",
        slug: a.author?.slug ?? "",
      },

      // ✔ Convert Sanity image to ref string (your UI expects this)
      image:
        a.featuredImage && "asset" in a.featuredImage
          ? a.featuredImage.asset?._ref
          : a.featuredImage?.url,

      // ✔ Boolean fields
      isFeatured: a.featured ?? false,
      isBreaking: a.isBreaking ?? false,
    })
  );
}
