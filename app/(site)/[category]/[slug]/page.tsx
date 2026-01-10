import { ArticleCard, Story } from "@/app/components/types";
import { articleQuery, latestArticlesQuery } from "@/app/lib/getArticle";
import { getLatestArticles } from "@/app/lib/getLatestArticles";
import { getRelatedArticles } from "@/app/lib/getRelatedArticles";
import { serverClient } from "@/app/lib/sanity.server";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePageClient from "../../article/[slug]/ArticlePageClient";
import { storyToArticleCard } from "@/app/lib/mappers/storyToArticleCard";

export const revalidate = 300;

type ArticleParams = {
  category: string;
  slug: string;
};

/* ----------------------------------------
   METADATA
----------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<ArticleParams>;
}): Promise<Metadata> {
  const { slug, category } = await params;

  const rawArticle = await serverClient.fetch(articleQuery, { slug });

  if (!rawArticle) {
    return {
      title: "Article Not Found | Kurunzi News",
      description: "The article you're looking for doesn't exist.",
    };
  }

  const article: Story = transformSanityArticleToStory(rawArticle);

  // ✅ Validate category
  if (article.category?.slug !== category) {
    return {
      title: "Article Not Found | Kurunzi News",
    };
  }

  const canonicalUrl = `https://kurunzinews.com/${category}/${article.slug}`;

  return {
    title: `${article.title} | Kurunzi News`,
    description: article.excerpt ?? article.subtitle ?? "",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt ?? "",
      url: canonicalUrl,
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
  };
}

/* ----------------------------------------
   PAGE
----------------------------------------- */
export default async function ArticlePage({
  params,
}: {
  params: Promise<ArticleParams>;
}) {
  const { slug, category } = await params;

  const rawArticle = await serverClient.fetch(articleQuery, { slug });

  if (!rawArticle) {
    notFound();
  }

  const article: Story = transformSanityArticleToStory(rawArticle);

  // ✅ HARD validation — very important
  if (article.category?.slug !== category) {
    notFound();
  }

  /* -------- Latest Articles -------- */
  const rawLatestArticles = await serverClient.fetch(latestArticlesQuery, {
    currentSlug: slug,
    limit: 10,
  });

  const latestArticles: ArticleCard[] = rawLatestArticles
    .map(transformSanityArticleToStory)
    .map(storyToArticleCard);

  const trendingArticles = await getLatestArticles(5);

  /* -------- Related Articles -------- */
  const relatedArticles: Story[] = await getRelatedArticles(
    article.slug,
    article.category?.title ?? "",
    6
  ).then((articles) => articles.map(transformSanityArticleToStory));

  /* -------- More from same category -------- */
  const moreFromCategory = await serverClient
    .fetch(
      `*[
        _type == "article" &&
        category->slug.current == $categorySlug &&
        slug.current != $currentSlug
      ] | order(publishedAt desc)[0...6]`,
      {
        categorySlug: article.category.slug,
        currentSlug: slug,
      }
    )
    .then((articles) => articles.map(transformSanityArticleToStory));

  /* -------- Tag-based articles -------- */
  const tagArticles =
    Array.isArray(article.tags) && article.tags.length > 0
      ? await serverClient
          .fetch(
            `*[
              _type == "article" &&
              slug.current != $currentSlug &&
              count((tags[@ in $tags])) > 0
            ] | order(publishedAt desc)[0...6]`,
            {
              currentSlug: slug,
              tags: article.tags,
            }
          )
          .then((articles) => articles.map(transformSanityArticleToStory))
      : [];

  return (
    <ArticlePageClient
      article={article}
      latestArticles={latestArticles}
      trendingArticles={trendingArticles}
      relatedArticles={relatedArticles}
      moreFromCategory={moreFromCategory}
      tagArticles={tagArticles}
    />
  );
}
