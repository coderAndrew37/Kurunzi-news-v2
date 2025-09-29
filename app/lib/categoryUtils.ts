import { groq } from "next-sanity";
import {
  categoryStoriesQuery,
  categoryWithSubcategoriesQuery,
  subcategoryStoriesQuery,
  topicStoriesQuery,
} from "./getCategoryStories";
import { serverClient } from "./sanity.server";
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

// ✅ ISR: Generate static params
// Category
// ✅ Category
export async function generateCategoryStaticParams() {
  const query = groq`*[_type == "category"]{ "slug": slug.current }`;
  const categories: { slug?: string }[] = await serverClient.fetch(query);

  return categories
    .filter((c) => c.slug) // skip null/undefined
    .map((c) => ({
      category: String(c.slug),
    }));
}

// ✅ Subcategory
export async function generateSubcategoryStaticParams() {
  const query = groq`*[_type == "subcategory"]{ 
    "category": category->slug.current, 
    "subcategory": slug.current 
  }`;
  const subcategories: { category?: string; subcategory?: string }[] =
    await serverClient.fetch(query);

  return subcategories
    .filter((s) => s.category && s.subcategory) // skip invalid ones
    .map((s) => ({
      category: String(s.category),
      subcategory: String(s.subcategory),
    }));
}

// ✅ Topic
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
    .filter((t) => t.category && t.subcategory && t.topic) // only valid
    .map((t) => ({
      category: String(t.category),
      subcategory: String(t.subcategory),
      topic: String(t.topic),
    }));
}
