import { groq } from "next-sanity";

export const frontPageArticlesQuery = groq`
*[_type == "article" && defined(publishedAt)] | order(publishedAt desc)[0...40]{
  _id,
  title,
  subtitle,
  "slug": slug.current,
  mainImage, // ✅ full object
  categories[]->{ title, "slug": slug.current }, // ✅ keep title + slug
  tags,
  excerpt,
  publishedAt,
  body,
  isFeatured,
  isVideo,
  duration,
  readTime,
  author->{
    name,
    role,
    image // ✅ full object, resolve with urlFor later
  }
}`;

export const singleArticleQuery = groq`
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  subtitle,
  "slug": slug.current,
  mainImage, // ✅ full object
  categories[]->{ title, "slug": slug.current },
  tags,
  excerpt,
  publishedAt,
  body,
  isFeatured,
  isVideo,
  duration,
  readTime,
  author->{
    name,
    role,
    image
  }
}`;

export const navQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "subcategories": coalesce(
      subcategories[]->{
        _id,
        title,
        "slug": slug.current,
        "topics": coalesce(
          topics[]->{
            _id,
            title,
            "slug": slug.current
          },
          []
        )
      },
      []
    )
  }
`;
