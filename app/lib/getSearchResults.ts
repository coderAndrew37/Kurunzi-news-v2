// app/lib/getSearchResults.ts
import { groq } from "next-sanity";

// Paginated articles search with filters and sorting
export const searchArticlesPaginatedQuery = groq`
*[
  _type == "article" &&
  !(_id in path("drafts.**")) &&
  (
    title match $q ||
    subtitle match $q ||
    excerpt match $q ||
    body[].children[].text match $q ||
    count(tags[@ match $q]) > 0 ||
    author->name match $q ||
    categories[]->title match $q ||
    subcategory->title match $q ||
    topic->title match $q
  ) &&
  (
    $startDate == null || publishedAt >= $startDate
  )
]
| order(
  select(
    $sortBy == "popular" => views,
    publishedAt
  ) desc,
  select(
    $sortBy == "oldest" => publishedAt,
    null
  ) asc,
  score desc
)

[$skip...$limit]
{
  _id,
  title,
  subtitle,
  "slug": slug.current,
  "img": mainImage.asset->url,
  publishedAt,
  excerpt,
  readTime,
  tags,
  views,
  author->{
    name,
    image,
    "slug": slug.current
  },
  categories[]->{
    title,
    "slug": slug.current
  },
  "category": categories[0]->{
    title,
    "slug": slug.current
  }
}
`;

// Total count for pagination
export const searchArticlesCountQuery = groq`
  count(*[_type == "article" && !(_id in path("drafts.**")) && (
    title match $q || 
    subtitle match $q || 
    excerpt match $q || 
    body[].children[].text match $q ||
    count((tags[@ match $q])) > 0 ||
    author->name match $q ||
    categories[]->title match $q ||
    subcategory->title match $q ||
    topic->title match $q
  )])
`;

// Authors with limits and relevance
export const searchAuthorsQuery = groq`
  *[_type == "author" && name match $q] | order(name) [0...$limit] {
    _id,
    name,
    image,
    bio,
    "slug": slug.current,
    "articleCount": count(*[_type == "article" && references(^._id)])
  }
`;

// Categories with relevance
export const searchCategoriesQuery = groq`
  *[_type == "category" && (title match $q || description match $q)] | order(title) [0...$limit] {
    _id,
    title,
    description,
    "slug": slug.current,
    "articleCount": count(*[_type == "article" && references(^._id)])
  }
`;

// Subcategories with relevance
export const searchSubcategoriesQuery = groq`
  *[_type == "subcategory" && (title match $q || description match $q)] | order(title) [0...$limit] {
    _id,
    title,
    description,
    "slug": slug.current,
    "articleCount": count(*[_type == "article" && references(^._id)])
  }
`;

// Popular tags from search results
export const searchTagsQuery = groq`
  *[_type == "article" && !(_id in path("drafts.**")) && defined(tags) && (
    title match $q || 
    subtitle match $q || 
    excerpt match $q ||
    tags[] match $q
  )] {
    tags
  }
`;
