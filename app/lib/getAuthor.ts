import { groq } from "next-sanity";
import { sanityClient } from "./sanity.client";

export const getAuthorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0]{
    _id,
    name,
    role,
    bio,
    "slug": slug.current,
    "image": image,
    social
  }
`;

export const getAuthorArticlesQuery = groq`
  *[_type == "article" && author->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    categories[]->{
      title,
      "slug": slug.current
    }
  }
`;

export async function getAuthor(slug: string) {
  return sanityClient.fetch(getAuthorBySlugQuery, { slug });
}

export async function getAuthorArticles(slug: string) {
  return sanityClient.fetch(getAuthorArticlesQuery, { slug });
}

export async function getAllAuthorSlugs(): Promise<string[]> {
  return await sanityClient.fetch(
    groq`*[_type == "author" && defined(slug.current)][].slug.current`
  );
}
