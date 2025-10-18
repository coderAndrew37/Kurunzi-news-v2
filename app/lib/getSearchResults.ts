import { groq } from "next-sanity";

// --- getSearchResults.ts ---
export const searchArticlesQuery = groq`
  *[_type == "article" && (
    title match $q || 
    subtitle match $q || 
    excerpt match $q || 
    tags[] match $q || 
    author->name match $q
  )] | order(publishedAt desc)[0...20] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    "mainImage": mainImage, 
    publishedAt,
    excerpt,
    readTime,
    isVideo,
    duration,
    isFeatured,
    tags,
    author->{
      name,
      image
    },
    "categories": categories[]->{
      title,
      "slug": slug.current
    },
    "subcategory": subcategory->{
      title,
      "slug": slug.current
    },
    "topic": topic->{
      title,
      "slug": slug.current
    }
  }
`;

// Authors
export const searchAuthorsQuery = groq`
  *[_type == "author" && (name match $q)] {
    _id,
    name,
    image,
    bio
  }
`;

// Categories
export const searchCategoriesQuery = groq`
  *[_type == "category" && (title match $q || description match $q)] {
    "id": _id,
    title,
    description,
    "slug": slug.current
  }
`;

// Subcategories
export const searchSubcategoriesQuery = groq`
  *[_type == "subcategory" && (title match $q || description match $q)] {
    _id,
    title,
    description,
    "slug": slug.current
  }
`;

// Tags (extract unique)
export const searchTagsQuery = groq`
  array::unique(*[_type == "article" && tags[] match $q].tags[])
`;
