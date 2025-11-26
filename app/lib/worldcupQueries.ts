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
