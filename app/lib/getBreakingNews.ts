import { serverClient } from "./sanity.server";
export interface News {
  _id: string;
  headline: string;
  slug: string;
  publishedAt: string;
  category: string;
  isActive: boolean;
  expiresAt: string;
}

export interface BreakingNewsItem {
  headline: string;
  slug: string;
  href: string;
  category?: string;
  publishedAt?: string;
  _id?: string;
}

export async function getBreakingNews(): Promise<BreakingNewsItem[]> {
  try {
    const news = await serverClient.fetch(`
      *[_type == "breakingNews" && isActive == true && (expiresAt == null || expiresAt > now())] | order(priority desc, publishedAt desc) {
        headline,
        "slug": slug.current,
        category,
        publishedAt
      }[0...10]
    `);

    return news.map((item: News) => ({
      headline: item.headline,
      slug: item.slug,
      href: `/news/${item.slug}`,
      category: item.category,
      publishedAt: item.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching breaking news:", error);
    return [];
  }
}

// Add this new function to get single news by slug
export async function getBreakingNewsBySlug(slug: string) {
  const query = `
    *[_type == "breakingNews" && slug.current == $slug][0] {
      _id,
      headline,
      fullTitle,
      excerpt,
      "slug": slug.current,
      content,
      featuredImage,
      publishedAt,
      updatedAt,
      category,
      location,
      author->{
        name,
        "image": image.asset->url,
        bio
      },
      sources,
      isActive,
      priority,
      expiresAt,
      tags
    }
  `;

  const news = await serverClient.fetch(query, { slug });
  return news;
}

export async function getLatestBreakingNews() {
  const query = `
    *[_type == "breakingNews" && isActive == true] | order(publishedAt desc)[0...6] {
      _id,
      headline,
      "slug": slug.current,
      publishedAt,
      category
    }
  `;

  const news = await serverClient.fetch(query);
  return news;
}
