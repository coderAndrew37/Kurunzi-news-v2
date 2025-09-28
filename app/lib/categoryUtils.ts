import { groq } from "next-sanity";
import {
  categoryStoriesQuery,
  categoryWithSubcategoriesQuery,
  subcategoryStoriesQuery,
  topicStoriesQuery,
} from "./getCategoryStories";
import { sanityClient } from "./sanity.client";

// Common data fetching
export async function getCategoryData(slug: string) {
  return await sanityClient.fetch(categoryWithSubcategoriesQuery, { slug });
}

export async function getCategoryArticles(category: string) {
  return await sanityClient.fetch(categoryStoriesQuery, { category });
}

export async function getSubcategoryArticles(subcategory: string) {
  return await sanityClient.fetch(subcategoryStoriesQuery, { subcategory });
}

export async function getTopicArticles(topic: string) {
  return await sanityClient.fetch(topicStoriesQuery, { topic });
}

// ✅ ISR: Generate static params
// Category
export async function generateCategoryStaticParams() {
  const query = groq`*[_type == "category"]{ "slug": slug.current }`;
  const categories: { slug: string }[] = await sanityClient.fetch(query);

  return categories.map((c) => ({
    category: c.slug,
  }));
}

// Subcategory
export async function generateSubcategoryStaticParams() {
  const query = groq`*[_type == "subcategory"]{ 
    "category": category->slug.current, 
    "subcategory": slug.current 
  }`;
  const subcategories: { category: string; subcategory: string }[] =
    await sanityClient.fetch(query);

  return subcategories.map((s) => ({
    category: s.category,
    subcategory: s.subcategory,
  }));
}

// Topic
export async function generateTopicStaticParams() {
  const query = groq`*[_type == "topic"]{ 
    "category": category->slug.current, 
    "subcategory": subcategory->slug.current,
    "topic": slug.current
  }`;
  const topics: { category: string; subcategory: string; topic: string }[] =
    await sanityClient.fetch(query);

  return topics.map((t) => ({
    category: t.category,
    subcategory: t.subcategory,
    topic: t.topic,
  }));
}
