export const heroQuery = `
  *[_type == "worldcupheroSection"][0]{
    articles[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      featuredImage,
      publishedAt,
      "category": categories[0]->{
        title,
        "slug": slug.current,
        color
      },
      author->{ 
        name, 
        "slug": slug.current 
      },
      readTime,
      isBreaking
    },
    autoPlayInterval
  }
`;
