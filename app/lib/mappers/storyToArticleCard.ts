import type { Story, ArticleCard } from "@/app/components/types";

export function storyToArticleCard(story: Story): ArticleCard {
  return {
    _id: story.id, // ← normalize ID HERE
    title: story.title,
    slug: story.slug,
    mainImage: story.featuredImage,
    category: story.category,
    publishedAt: story.publishedAt,
  };
}
