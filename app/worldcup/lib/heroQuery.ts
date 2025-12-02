export const heroQuery = `
  *[_type == "worldcupheroSection"][0]{
    articles[]->{
      _id,
      title,
      slug,
      excerpt,
      image,
      publishedAt,
      category,
      author->{name, slug},
      readTime
    },
    autoPlayInterval
  }
`;
