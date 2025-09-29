import { groq } from "next-sanity";
import { serverClient } from "./sanity.server";
export async function getSearchSuggestions(query: string) {
  if (!query) return [];

  const searchQuery = groq`
    {
      "articles": *[
        _type == "article" &&
        (
          title match $q ||
          subtitle match $q ||
          excerpt match $q ||
          $q in tags[] ||
          author->name match $q
        )
      ][0...5]{
        "id": _id,
        _type,
        title,
        "slug": slug.current
      },
      "authors": *[
        _type == "author" && name match $q
      ][0...5]{
        "id": _id,
        _type,
        name,
        "slug": slug.current,
        image
      },
      "categories": *[
        _type == "category" && (title match $q || description match $q)
      ][0...5]{
        "id": _id,
        _type,
        title,
        "slug": slug.current
      }
    }
  `;

  return await serverClient.fetch(searchQuery, { q: `${query}*` });
}
