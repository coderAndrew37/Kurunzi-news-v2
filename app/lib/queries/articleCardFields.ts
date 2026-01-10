export const articleCardFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage {
    asset->{
      url
    },
    alt
  },
  categories[0]->{
    title,
    "slug": slug.current
  },
  subcategory->{
    title,
    "slug": slug.current,
    category->{
      title,
      "slug": slug.current
    }
  }
`;
