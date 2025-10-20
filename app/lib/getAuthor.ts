import { groq } from "next-sanity";
import { serverClient } from "./sanity.server";

/**
 * Fetch single author details
 */
export const getAuthorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0]{
    _id,
    name,
    role,
    bio,
    "slug": slug.current,
    image,
    social
  }
`;

/**
 * Fetch all articles written by a specific author (for use with transformSanityArticleToStory)
 */
export const getAuthorArticlesQuery = groq`
  *[_type == "article" && author->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    mainImage{
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    excerpt,
    publishedAt,
    readTime,
    isFeatured,
    isVideo,
    duration,
    author->{
      name,
      "slug": slug.current,
      image
    },
    categories[]->{
      title,
      "slug": slug.current
    },
    tags,
    body
  }
`;

/**
 * Fetch author details
 */
export async function getAuthor(slug: string) {
  return serverClient.fetch(getAuthorBySlugQuery, { slug });
}

/**
 * Fetch all articles for an author
 */
export async function getAuthorArticles(slug: string) {
  const rawArticles = await serverClient.fetch(getAuthorArticlesQuery, {
    slug,
  });

  // ✅ Apply your transform here before returning
  const { transformSanityArticleToStory } = await import("./sanity.utils");

  return rawArticles.map(transformSanityArticleToStory);
}

/**
 * Fetch all author slugs for static generation
 */
export async function getAllAuthorSlugs(): Promise<string[]> {
  return await serverClient.fetch(
    groq`*[_type == "author" && defined(slug.current)][].slug.current`
  );
}
