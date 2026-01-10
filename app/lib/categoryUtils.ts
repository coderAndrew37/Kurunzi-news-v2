// app/lib/categoryUtils.ts - UPDATED
import { groq } from "next-sanity";
import {
  categoryStoriesQuery,
  categoryWithSubcategoriesQuery,
  subcategoryStoriesQuery,
  topicStoriesQuery,
} from "./getCategoryStories";
import { serverClient } from "./sanity.server";
import { transformSanityArticleToStory } from "./sanity.utils";

// Common data fetching
export async function getCategoryData(slug: string) {
  return await serverClient.fetch(categoryWithSubcategoriesQuery, { slug });
}

export async function getCategoryArticles(category: string) {
  return await serverClient.fetch(categoryStoriesQuery, { category });
}

export async function getSubcategoryArticles(subcategory: string) {
  return await serverClient.fetch(subcategoryStoriesQuery, { subcategory });
}

export async function getTopicArticles(topic: string) {
  return await serverClient.fetch(topicStoriesQuery, { topic });
}

// Pagination functions
export async function getPaginatedCategoryArticles(
  category: string,
  skip: number = 0,
  limit: number = 12,
  sortBy: string = "publishedAt_desc"
) {
  const [field, order] = sortBy.split("_");

  const query = groq`
    *[
      _type == "article" &&
      $category in categories[]->slug.current &&
      !(_id in path("drafts.**"))
    ] | order(${field} ${order})[$skip...$end] {
      "id": _id,
      title,
      subtitle,
      "slug": slug.current,
      "mainImage": mainImage, 
      "categories": categories[]->{
        title,
        "slug": slug.current
      },
      "subcategory": subcategory->{
        title,
        "slug": slug.current
      },
      "topic": topic->{
        title,
        "slug": slug.current
      },
      publishedAt,
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      excerpt,
      readTime,
      isVideo,
      duration,
      isFeatured,
      tags,
      author->{
        name,
        image
      },
      body,
      views
    }
  `;

  const articles = await serverClient.fetch(query, {
    category,
    skip,
    end: skip + limit,
  });

  return articles.map(transformSanityArticleToStory);
}

export async function getTotalCategoryArticles(
  category: string
): Promise<number> {
  const query = groq`
    count(*[
      _type == "article" &&
      $category in categories[]->slug.current &&
      !(_id in path("drafts.**"))
    ])
  `;

  return await serverClient.fetch(query, { category });
}

export async function getCategoryArticlesWithFilters(
  category: string,
  filters: {
    skip?: number;
    limit?: number;
    sortBy?: string;
    featured?: boolean;
    subcategory?: string;
    topic?: string;
    tags?: string[];
    year?: number;
  } = {}
) {
  const {
    skip = 0,
    limit = 12,
    sortBy = "publishedAt_desc",
    featured,
    subcategory,
    topic,
    tags = [],
    year,
  } = filters;

  const [field, order] = sortBy.split("_");

  let filterConditions = [
    '_type == "article"',
    `$category in categories[]->slug.current`,
    '!(_id in path("drafts.**"))',
  ];

  if (featured) {
    filterConditions.push("isFeatured == true");
  }

  if (subcategory) {
    filterConditions.push(`subcategory->slug.current == $subcategory`);
  }

  if (topic) {
    filterConditions.push(`topic->slug.current == $topic`);
  }

  if (tags.length > 0) {
    filterConditions.push(`count((tags[@ in $tags])) > 0`);
  }

  if (year) {
    filterConditions.push(`publishedAt match "${year}-*"`);
  }

  const query = groq`
    *[${filterConditions.join(" && ")}] | order(${field} ${order})[$skip...$end] {
      "id": _id,
      title,
      subtitle,
      "slug": slug.current,
      "mainImage": mainImage, 
      "categories": categories[]->{
        title,
        "slug": slug.current
      },
      "subcategory": subcategory->{
        title,
        "slug": slug.current
      },
      "topic": topic->{
        title,
        "slug": slug.current
      },
      publishedAt,
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      excerpt,
      readTime,
      isVideo,
      duration,
      isFeatured,
      tags,
      author->{
        name,
        image
      },
      body,
      views
    }
  `;

  const articles = await serverClient.fetch(query, {
    category,
    subcategory,
    topic,
    tags,
    skip,
    end: skip + limit,
  });

  return articles.map(transformSanityArticleToStory);
}

export async function getCategoryStats(category: string) {
  const query = groq`
    {
      "totalArticles": count(*[
        _type == "article" &&
        $category in categories[]->slug.current &&
        !(_id in path("drafts.**"))
      ]),
      "totalFeatured": count(*[
        _type == "article" &&
        $category in categories[]->slug.current &&
        isFeatured == true &&
        !(_id in path("drafts.**"))
      ]),
      "latestArticle": *[
        _type == "article" &&
        $category in categories[]->slug.current &&
        !(_id in path("drafts.**"))
      ] | order(publishedAt desc)[0] {
        publishedAt,
        title,
        "slug": slug.current
      },
      "monthlyCounts": *[
        _type == "article" &&
        $category in categories[]->slug.current &&
        !(_id in path("drafts.**"))
      ] {
        "month": publishedAt
      }
    }
  `;

  return await serverClient.fetch(query, { category });
}

export async function getCategoryPopularTags(
  category: string,
  limit: number = 10
) {
  const query = groq`
    *[
      _type == "article" &&
      $category in categories[]->slug.current &&
      !(_id in path("drafts.**")) &&
      defined(tags)
    ] {
      tags
    }
  `;

  const articles = await serverClient.fetch(query, { category });
  const tagCounts: Record<string, number> = {};

  articles.forEach((article: { tags: string[] }) => {
    article.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}

// ✅ ISR: Generate static params
export async function generateCategoryStaticParams() {
  const query = groq`*[_type == "category"]{ "slug": slug.current }`;
  const categories: { slug?: string }[] = await serverClient.fetch(query);

  return categories
    .filter((c) => c.slug)
    .map((c) => ({
      category: String(c.slug),
    }));
}

export async function generateSubcategoryStaticParams() {
  const query = groq`*[_type == "subcategory"]{ 
    "category": category->slug.current, 
    "subcategory": slug.current 
  }`;
  const subcategories: { category?: string; subcategory?: string }[] =
    await serverClient.fetch(query);

  return subcategories
    .filter((s) => s.category && s.subcategory)
    .map((s) => ({
      category: String(s.category),
      subcategory: String(s.subcategory),
    }));
}

export async function generateTopicStaticParams() {
  const query = groq`*[_type == "topic"]{ 
    "category": category->slug.current, 
    "subcategory": subcategory->slug.current,
    "topic": slug.current
  }`;
  const topics: {
    category?: string;
    subcategory?: string;
    topic?: string;
  }[] = await serverClient.fetch(query);

  return topics
    .filter((t) => t.category && t.subcategory && t.topic)
    .map((t) => ({
      category: String(t.category),
      subcategory: String(t.subcategory),
      topic: String(t.topic),
    }));
}

// Helper for getting filter options
export async function getCategoryFilterOptions(category: string) {
  const query = groq`
    {
      "subcategories": *[_type == "subcategory" && category->slug.current == $category] | order(title) {
        _id,
        title,
        "slug": slug.current,
        "articleCount": count(*[_type == "article" && subcategory->._ref == ^._id])
      },
      "years": array::unique(*[
        _type == "article" &&
        $category in categories[]->slug.current &&
        defined(publishedAt)
      ].publishedAt)[0...5]
    }
  `;

  return await serverClient.fetch(query, { category });
}
