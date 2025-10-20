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
  "author": author->{
  name,
  "slug": slug.current,
  image
},

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
  mainImage,   // ✅ FIXED
  body
}`;

// GROQ query for latest articles
export const latestArticlesQuery = `*[_type == "article" && defined(slug.current) && slug.current != $currentSlug]
  | order(publishedAt desc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    readTime,
    excerpt,
    "category": categories[0]->{
      title,
      "slug": slug.current
    },
    "mainImage": mainImage
  }`;

// GROQ query for trending articles
export const trendingArticlesQuery = `*[_type == "article" && defined(slug.current) && slug.current != $currentSlug && isFeatured == true]
  | order(publishedAt desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "category": categories[0]->{
      title,
      "slug": slug.current
    },
    "img": mainImage.asset->url
  }`;
