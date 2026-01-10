import { RawSanityArticle, Story } from "@/app/components/types";
import type {
  ArbitraryTypedObject,
  PortableTextBlock,
  PortableTextMarkDefinition,
  PortableTextSpan,
} from "@portabletext/types";
import { urlFor } from "./getHeroStories";

// Convert Portable Text blocks → plain string
export function blockContentToPlainText(
  blocks:
    | PortableTextBlock<
        PortableTextMarkDefinition,
        ArbitraryTypedObject | PortableTextSpan,
        string,
        string
      >[]
    | undefined
): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        return block.children
          .map((child) =>
            "text" in child ? (child as PortableTextSpan).text : ""
          )
          .join("");
      }
      return "";
    })
    .join("\n\n");
}

// Estimate read time from blocks
export function estimateReadTimeFromBlocks(
  blocks:
    | PortableTextBlock<
        PortableTextMarkDefinition,
        ArbitraryTypedObject | PortableTextSpan,
        string,
        string
      >[]
    | undefined,
  wpm = 200
): number {
  const text = blockContentToPlainText(blocks);
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

function extractSlug(slug: string | { current: string } | undefined): string {
  if (!slug) return "";
  if (typeof slug === "string") return slug;
  return slug.current;
}

function extractCurrentSlug(slug?: { current: string } | string): string {
  if (!slug) return "";
  return typeof slug === "string" ? slug : slug.current;
}

// Transform raw Sanity article → our Story type
export function transformSanityArticleToStory(
  raw: RawSanityArticle | (RawSanityArticle & { slug: string })
): Story {
  const imageUrl = raw.mainImage
    ? urlFor(raw.mainImage)
    : "/placeholder-hero.jpeg";

  return {
    id: raw._id,
    slug: extractSlug(raw.slug), // ✅ FIX
    title: raw.title,
    subtitle: raw.subtitle ?? null,
    img: imageUrl,

    featuredImage: raw.mainImage
      ? {
          url: imageUrl,
          alt: "alt" in raw.mainImage ? (raw.mainImage.alt ?? null) : null,
          caption:
            "caption" in raw.mainImage ? (raw.mainImage.caption ?? null) : null,
        }
      : null,

    category: raw.categories?.length
      ? {
          title: raw.categories[0]?.title ?? "General",
          slug: extractCurrentSlug(raw.categories[0]?.slug) || "general",
        }
      : null,

    publishedAt: raw.publishedAt ?? null,
    author: raw.author ?? null,
    content: raw.body ?? null,
    tags: raw.tags ?? [],
    readTime: raw.readTime ?? null,
    excerpt: raw.excerpt ?? null,
    isFeatured: !!raw.isFeatured,
    isVideo: !!raw.isVideo,
    duration: raw.duration ?? null,
  };
}

export function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
}
