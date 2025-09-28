import { sanityClient } from "@/app/lib/sanity.client";
import ArticlePageClient from "./ArticlePageClient";
import { Story } from "@/app/components/types";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import Link from "next/link";
import {
  articleQuery,
  latestArticlesQuery,
  trendingArticlesQuery,
} from "@/app/lib/getArticle";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // Fetch article by slug
  const rawArticle = await sanityClient.fetch(articleQuery, { slug });

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
  const rawLatestArticles = await sanityClient.fetch(latestArticlesQuery, {
    currentSlug: slug,
  });
  const latestArticles: Story[] = rawLatestArticles.map(
    transformSanityArticleToStory
  );

  // Fetch trending articles
  const rawTrendingArticles = await sanityClient.fetch(trendingArticlesQuery, {
    currentSlug: slug,
  });
  const trendingArticles: Story[] = rawTrendingArticles.map(
    transformSanityArticleToStory
  );

  return (
    <ArticlePageClient
      article={article}
      latestArticles={latestArticles}
      trendingArticles={trendingArticles}
    />
  );
}
