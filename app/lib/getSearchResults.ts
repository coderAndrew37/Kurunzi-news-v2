import { groq } from "next-sanity";

// Articles
export const searchArticlesQuery = groq`
  *[_type == "article" && (
    title match $q || 
    subtitle match $q || 
    excerpt match $q || 
    tags[] match $q || 
    author->name match $q
  )] | order(publishedAt desc)[0...20] {
    "id": _id,
    title,
    subtitle,
    "slug": slug.current,
    "mainImage": mainImage,
    excerpt,
    publishedAt,
    readTime,
    tags,
    author->{
      name,
      image
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
