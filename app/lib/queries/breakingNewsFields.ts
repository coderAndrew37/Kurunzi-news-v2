export const breakingNewsFields = `
  _id,
  title,
  "slug": slug.current,
  category->{
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
