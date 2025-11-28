import { groq } from "next-sanity";

// Get all world cup articles for listing
export const allWorldCupArticlesQuery = groq`
  *[_type == "worldCupArticle"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    updatedAt,
    "author": author->{
      name,
      role,
      image
    },
    "categories": categories[]->{
      title,
      slug,
      color,
      icon
    },
    tags,
    readTime,
    featured,
    matchDetails
  }
`;

export const featuredWorldCupArticlesQuery = groq`
  *[_type == "worldCupArticle" && featured == true] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      title,
      slug,
      color
    },
    tags,
    readTime,
    matchDetails
  }
`;

export const worldCupArticleQuery = groq`
  *[_type == "worldCupArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
    publishedAt,
    updatedAt,
    "author": author->{
      name,
      image,
      bio,
      socialLinks
    },
    "categories": categories[]->{
      title,
      slug,
      color,
      icon
    },
    tags,
    readTime,
    gallery,
    matchDetails,
    featured,
    "relatedArticles": relatedArticles[]->{
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      "author": author->{
        name,
        image
      },
      "categories": categories[]->{
        title,
        slug,
        color
      },
      readTime
    }
  }
`;

export const worldCupArticlesByCategoryQuery = groq`
  *[_type == "worldCupArticle" && $category in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      title,
      slug,
      color
    },
    tags,
    readTime,
    matchDetails
  }
`;

export const worldCupCategoriesQuery = groq`
  *[_type == "worldCupCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    icon
  }
`;

export const latestWorldCupArticlesQuery = groq`
  *[_type == "worldCupArticle"] | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      title,
      slug,
      color
    },
    readTime
  }
`;

export const relatedWorldCupArticlesQuery = `
{
  "original": *[_type == "worldCupArticle" && _id == $id][0]{
    _id,
    categories[]->{ _id },
    tags,
    matchDetails { teams },
    relatedArticles[]->{ _id }
  },

  "related": *[_type == "worldCupArticle" && _id != $id]{
    ...,
    categories[]->{ _id },

    // --- SCORING MODEL ---
    "score": (
      // 1. Manual relatedArticles boost
      select(
        _id in ^.original.relatedArticles[]._id => 10,
        0
      )
      +

      // 2. Category overlap (4 pts each)
      (
        count(categories[@._id in ^.original.categories[]._id]) * 4
      )
      +

      // 3. Tag overlap (3 pts each)
      (
        count(tags[@ in ^.original.tags]) * 3
      )
      +

      // 4. Team overlap (5 pts each)
      (
        count(matchDetails.teams[@ in ^.original.matchDetails.teams]) * 5
      )
      +

      // 5. Recency boost
      dateTime(publishedAt)
    )
  } | order(score desc)[0...4]
}
`;
