import { groq } from "next-sanity";

export const frontPageArticlesQuery = groq`
*[_type == "article" && defined(publishedAt)] | order(publishedAt desc)[0...40]{
_id,
title,
subtitle,
"slug": slug.current,
"img": mainImage.asset->url,
"categories": categories[]->title,
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
"avatar": image.asset->url
}
}`;

export const singleArticleQuery = groq`
*[_type == "article" && slug.current == $slug][0]{
_id,
title,
subtitle,
"slug": slug.current,
"img": mainImage.asset->url,
"categories": categories[]->title,
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
"avatar": image.asset->url
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
