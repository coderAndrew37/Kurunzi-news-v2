// GROQ query for single article by slug
export const articleQuery = `*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  publishedAt,
  _updatedAt,
  readTime,
  isVideo,
  duration,
  isFeatured,
  tags,
  author->{
    name,
    image
  },
  // categories is an array, so we deref and return the first one (or all if needed)
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  },
  subcategory->{
    _id,
    title,
    "slug": slug.current
  },
  topic->{
    _id,
    title,
    "slug": slug.current
  },
  "img": mainImage, 
  body
}`;

// GROQ query for latest articles
export const latestArticlesQuery = `*[_type == "article" && slug.current != $currentSlug] 
  | order(publishedAt desc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    readTime,
    "categories": categories[]->{
      title
    },
   "img": mainImage
}`;

// GROQ query for trending articles (using isFeatured as proxy for trending)
export const trendingArticlesQuery = `*[_type == "article" && slug.current != $currentSlug && isFeatured == true] 
  | order(publishedAt desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "categories": categories[]->{
      title
    },
    "img": mainImage
}`;
