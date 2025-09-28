import { sanityClient } from "@/app/lib/sanity.client";
import ArticlePageClient from "./ArticlePageClient";
import { Story } from "@/app/components/types";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import Link from "next/link";

// GROQ query for single article by slug
const articleQuery = `*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  publishedAt,
  _updatedAt,
  readTime,
  isVideo,
  duration,
  isFeatured,
  tags,
  author->{
    name,
    image
  },
  // categories is an array, so we deref and return the first one (or all if needed)
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  },
  subcategory->{
    _id,
    title,
    "slug": slug.current
  },
  topic->{
    _id,
    title,
    "slug": slug.current
  },
  "img": mainImage, 
  body
}`;

// GROQ query for latest articles
const latestArticlesQuery = `*[_type == "article" && slug.current != $currentSlug] 
  | order(publishedAt desc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    readTime,
    "categories": categories[]->{
      title
    },
   "img": mainImage
}`;

// GROQ query for trending articles (using isFeatured as proxy for trending)
const trendingArticlesQuery = `*[_type == "article" && slug.current != $currentSlug && isFeatured == true] 
  | order(publishedAt desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "categories": categories[]->{
      title
    },
    "img": mainImage
}`;

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
