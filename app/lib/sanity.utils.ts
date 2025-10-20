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

// Transform raw Sanity article → our Story type
export function transformSanityArticleToStory(raw: RawSanityArticle): Story {
  const imageUrl = raw.mainImage
    ? urlFor(raw.mainImage)
    : "/placeholder-hero.jpeg";

  return {
    id: raw._id,
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle ?? null,
    img: imageUrl, // still used by existing components
    featuredImage: raw.mainImage
      ? {
          url: imageUrl,
          alt: raw.mainImage.alt ?? null,
          caption: raw.mainImage.caption ?? null,
        }
      : null,
    category:
      raw.categories && raw.categories.length
        ? {
            title: raw.categories[0]?.title ?? "General",
            slug:
              typeof raw.categories[0]?.slug === "string"
                ? raw.categories[0]?.slug
                : (raw.categories[0]?.slug?.current ?? "general"),
          }
        : null,

    publishedAt: raw.publishedAt ?? null,
    author: raw.author ?? null,
    content: raw.body ?? null,
    tags: raw.tags ?? [],
    readTime: raw.readTime ?? estimateReadTimeFromBlocks(raw.body),
    excerpt: raw.excerpt ?? null,
    isFeatured: !!raw.isFeatured,
    isVideo: !!raw.isVideo,
    duration: raw.duration ?? null,
  };
}
