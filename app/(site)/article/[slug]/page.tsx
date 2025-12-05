import { Story } from "@/app/components/types";
import { articleQuery, latestArticlesQuery } from "@/app/lib/getArticle";
import { getLatestArticles } from "@/app/lib/getLatestArticles";
import { getRelatedArticles } from "@/app/lib/getRelatedArticles";
import { serverClient } from "@/app/lib/sanity.server";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { Metadata } from "next";
import Link from "next/link";
import ArticlePageClient from "./ArticlePageClient";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const rawArticle = await serverClient.fetch(articleQuery, { slug });
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
  const rawArticle = await serverClient.fetch(articleQuery, { slug });

  if (!rawArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
          <p className="text-gray-600">
            The article you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="text-red-600 hover:underline mt-4 inline-block font-medium"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Transform into Story type
  const article: Story = transformSanityArticleToStory(rawArticle);

  // Fetch latest articles for sidebar
  const rawLatestArticles = await serverClient.fetch(latestArticlesQuery, {
    currentSlug: slug,
    limit: 10, // Fetch more for various sidebar sections
  });

  const latestArticles: Story[] = rawLatestArticles.map(
    transformSanityArticleToStory
  );

  // Fetch trending articles (most viewed)
  const trendingArticles = await getLatestArticles(5);

  // Fetch related articles based on category/tags
  const relatedArticles = await getRelatedArticles(
    article.slug,
    article.category?.title ?? "",
    6
  ).then((articles) => articles.map(transformSanityArticleToStory));

  // Fetch more from the same category
  const moreFromCategory = await serverClient
    .fetch(
      `*[
  _type == "article" &&
  category->slug.current == $categorySlug &&
  slug.current != $currentSlug
]
{
  _id,
  title,
  subtitle,
  excerpt,
  publishedAt,
  readTime,
  "slug": slug.current,   // ✅ FIX HERE
  mainImage,
  img,
  author->{name, image},
  "category": category->{title, "slug": slug.current},
  categories[]->{title, "slug": slug.current},
  tags,
  isFeatured,
  isVideo,
  duration
}
| order(publishedAt desc)[0...6]
`,
      {
        categorySlug: article.category?.slug,
        currentSlug: slug,
      }
    )
    .then((articles) => articles.map(transformSanityArticleToStory));

  return (
    <ArticlePageClient
      article={article}
      latestArticles={latestArticles}
      trendingArticles={trendingArticles}
      relatedArticles={relatedArticles}
      moreFromCategory={moreFromCategory}
    />
  );
}
