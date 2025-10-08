import { RelatedArticle, Story } from "../components/types";
import { urlFor } from "./sanity.image";
import { serverClient } from "./sanity.server";

export interface BreakingNewsItem {
  _id: string;
  headline: string;
  slug: string;
  href: string;
  category?: string;
  publishedAt?: string;
}

export async function getBreakingNews(): Promise<BreakingNewsItem[]> {
  try {
    const news = await serverClient.fetch(`
      *[_type == "article" && isBreaking == true && (breakingExpiresAt == null || breakingExpiresAt > now())]
      | order(publishedAt desc)[0...10] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        "category": categories[0]->title
      }
    `);

    return news.map((item: Story) => ({
      _id: item.id,
      headline: item.title,
      slug: item.slug,
      href: `/article/${item.slug}`,
      category: item.category,
      publishedAt: item.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching breaking news:", error);
    return [];
  }
}

interface SanityTrendingArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  views?: number | null;
  readTime?: number | null;
  category?: {
    title: string;
    slug: string;
  } | null;
  mainImage?: {
    asset?: { _ref: string };
    alt?: string | null;
  } | null;
}

export async function getTrendingArticles(
  limit = 6
): Promise<RelatedArticle[]> {
  const query = `
    *[_type == "article" && defined(publishedAt) && (isTrending == true || views > 100)]
    | order(isTrending desc, views desc, publishedAt desc)[0...$limit] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      views,
      readTime,
      "category": categories[0]->{
        title,
        "slug": slug.current
      },
      mainImage
    }
  `;

  const articles = await serverClient.fetch<SanityTrendingArticle[]>(query, {
    limit,
  });

  return articles.map(
    (a): RelatedArticle => ({
      id: a._id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? null,
      publishedAt: a.publishedAt ?? null,
      views: a.views ?? 0,
      readTime: a.readTime ?? 3,
      category: a.category ?? null,
      img: a.mainImage
        ? urlFor(a.mainImage).width(400).height(300).url()
        : null,
      featuredImage: a.mainImage
        ? {
            url: urlFor(a.mainImage).width(800).height(600).url(),
            alt: a.mainImage?.alt ?? null,
          }
        : null,
    })
  );
}
