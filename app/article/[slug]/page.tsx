import { serverClient } from "@/app/lib/sanity.server"; // ⬅️ use the server-only client
import ArticlePageClient from "./ArticlePageClient";
import { getRelatedArticles } from "@/app/lib/getRelatedArticles";
import { Story } from "@/app/components/types";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import Link from "next/link";
import {
  articleQuery,
  latestArticlesQuery,
  trendingArticlesQuery,
} from "@/app/lib/getArticle";
import { Metadata } from "next";

export const revalidate = 300; // Revalidate every 5 minutes

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const rawArticle = await serverClient.fetch(articleQuery, { slug }); // ⬅️ server client
  if (!rawArticle) {
    return {
      title: "Article Not Found | Kurunzi News",
      description: "The article you're looking for doesn't exist.",
    };
  }

  const article: Story = transformSanityArticleToStory(rawArticle);

  return {
    title: `${article.title} | Kurunzi News`,
    description: article.excerpt ?? article.subtitle ?? "",
    openGraph: {
      title: article.title,
      description: article.excerpt ?? "",
      url: `https://kurunzinews.com/article/${article.slug}`,
      type: "article",
      images: article.img
        ? [
            {
              url: article.img,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt ?? "",
      images: article.img ? [article.img] : [],
    },
    alternates: {
      canonical: `https://kurunzinews.com/article/${article.slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // Fetch article by slug
  const rawArticle = await serverClient.fetch(articleQuery, { slug }); // ⬅️ server client

  if (!rawArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
          <p className="text-gray-600">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Transform into Story type
  const article: Story = transformSanityArticleToStory(rawArticle);

  // Fetch latest articles
  const rawLatestArticles = await serverClient.fetch(latestArticlesQuery, {
    currentSlug: slug,
  });
  const latestArticles: Story[] = rawLatestArticles.map(
    transformSanityArticleToStory
  );

  // Fetch trending articles
  const rawTrendingArticles = await serverClient.fetch(trendingArticlesQuery, {
    currentSlug: slug,
  });
  const trendingArticles: Story[] = rawTrendingArticles.map(
    transformSanityArticleToStory
  );

  // Fetch related articles based on category
  const relatedArticlesRaw = await getRelatedArticles(
    article.slug,
    article.category?.title ?? article.category?.slug ?? "",
    3
  );

  // transform RelatedArticle[] → Story[]
  const relatedArticles: Story[] = relatedArticlesRaw.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    subtitle: null,
    img: r.img ?? null,
    featuredImage: r.featuredImage
      ? {
          url: r.featuredImage.url,
          alt: r.featuredImage.alt ?? null,
          caption: null,
        }
      : null,
    category: r.category
      ? typeof r.category === "string"
        ? { title: r.category, slug: r.category }
        : { title: r.category.title, slug: r.category.slug }
      : null,
    subcategory: null,
    topic: null,
    publishedAt: r.publishedAt ?? null,
    createdAt: undefined,
    updatedAt: undefined,
    author: null,
    content: null,
    tags: [],
    readTime: r.readTime ?? null,
    excerpt: r.excerpt ?? null,
    isFeatured: false,
    isVideo: false,
    duration: null,
    relatedArticles: [],
    sources: [],
    location: null,
    views: r.views ?? null,
  }));

  // console.log("Related articles:", relatedArticles);

  return (
    <ArticlePageClient
      article={article}
      latestArticles={latestArticles}
      trendingArticles={trendingArticles}
      relatedArticles={relatedArticles}
    />
  );
}
