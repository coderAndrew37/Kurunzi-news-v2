import { serverClient } from "./sanity.server";
import { urlFor } from "./sanity.image";
import { Story } from "../components/types";

export async function getLatestArticles(limit = 6): Promise<Story[]> {
  const query = `
    *[_type == "article" && defined(publishedAt)]
      | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      mainImage,
      "category": categories[0]->{
        title,
        "slug": slug.current
      }
    }
  `;

  const articles = await serverClient.fetch(query, { limit });

  return articles.map((a: Story) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    img: a.featuredImage ? urlFor(a.featuredImage).url() : null,
    category: a.category,
    publishedAt: a.publishedAt,
    readTime: a.readTime ?? 3,
    views: null,
  }));
}
