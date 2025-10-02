import { groq } from "next-sanity";

// Fetch all stories for a category
export const categoryStoriesQuery = groq`
  *[
    _type == "article" &&
    $category in categories[]->slug.current
  ] | order(publishedAt desc)[0...20] {
    "id": _id,
    title,
    subtitle,
    "slug": slug.current,
    "mainImage": mainImage, 
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
    },
    publishedAt,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt,
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
    body
  }
`;

// Fetch all categories with their stories
export const categoriesWithStoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    description,
    "stories": *[_type == "article" && references(^._id)] 
      | order(publishedAt desc)[0...20] {
        "_id": _id,
        "id": _id,
        title,
        subtitle,
        "slug": slug.current,
        "mainImage": mainImage, 
        category->{
          _id,
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
        },
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
        content
    }
  }
`;

export const categoryWithSubcategoriesQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    "subcategories": subcategories[]->{
      _id,
      title,
      description,
      "slug": slug.current
    }
  }
`;

// Fetch latest stories by category + subcategory
export const subcategoryStoriesQuery = groq`
  *[
  _type == "article" &&
  subcategory->slug.current == $subcategory
] | order(publishedAt desc)[0...20] {
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
  "category": categories[]->{
    _id,
    title,
    "slug": slug.current
  },
  "subcategory": subcategory->{
    _id,
    title,
    "slug": slug.current
  },
  "topic": topic->{
    _id,
    title,
    "slug": slug.current
  },
  body
}

`;

// Fetch latest stories by category + subcategory + topic
export const topicStoriesQuery = groq`
  *[
    _type == "article" &&
    $topic == topic->slug.current
  ] | order(publishedAt desc)[0...20] {
    "id": _id,
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
    "category": category->{
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
    },
    body
  }
`;
