import { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Story } from "../components/types";
import imageUrlBuilder from "@sanity/image-url";
import { serverClient } from "./sanity.server";

interface HeroQueryArticle {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category?: { title: string; slug: string };
  publishedAt?: string;
  _createdAt: string;
  _updatedAt: string;
  excerpt?: string;
  readTime?: number;
  isVideo?: boolean;
  duration?: string;
  isFeatured?: boolean;
  tags?: string[];
  author?: {
    name: string;
    image?: SanityImageSource;
  };
  mainImage?: SanityImageSource; // ✅ proper schema field
  content?: PortableTextBlock[];
}

interface HeroQueryItem {
  article: HeroQueryArticle;
  overrideTitle?: string;
  customImage?: SanityImageSource;
}

interface HeroQueryResponse {
  items: HeroQueryItem[];
}

const builder = imageUrlBuilder(serverClient);

export const urlFor = (src: SanityImageSource | string | null | undefined) => {
  if (!src) return "/placeholder-hero.jpeg";

  // ✅ If already a URL, return as-is
  if (typeof src === "string") {
    return src;
  }

  // ✅ If Sanity image object
  if ("asset" in src) {
    return builder.image(src).width(1200).height(800).url();
  }

  return "/placeholder-hero.jpeg";
};

export async function getHeroStories(): Promise<Story[]> {
  const data = await serverClient.fetch<HeroQueryResponse>(`
    *[_type == "hero"][0]{
      items[] | order(article->publishedAt desc)[0..3] {
        article->{
          _id,
          title,
          subtitle,
          "slug": slug.current,
          category->{title, "slug": slug.current},
          publishedAt,
          _createdAt,
          _updatedAt,
          excerpt,
          readTime,
          isVideo,
          duration,
          isFeatured,
          tags,
          author->{name, image},
          mainImage,
          content
        },
        overrideTitle,
        customImage
      }
    }
  `);

  // ✅ Filter out any null or missing articles
  const validItems = data?.items?.filter((item) => item?.article) ?? [];

  return validItems.map((item) => ({
    id: item.article._id,
    slug: item.article.slug,
    title: item.overrideTitle ?? item.article.title,
    subtitle: item.article.subtitle ?? null,
    img: item.customImage
      ? urlFor(item.customImage)
      : item.article.mainImage
        ? urlFor(item.article.mainImage)
        : "/placeholder-hero.jpeg",

    category: item.article.category ?? null,
    publishedAt: item.article.publishedAt ?? null,
    createdAt: item.article._createdAt,
    updatedAt: item.article._updatedAt,
    author: item.article.author ?? null,
    content: item.article.content ?? null,
    tags: item.article.tags ?? [],
    readTime: item.article.readTime ?? null,
    excerpt: item.article.excerpt ?? null,
    isFeatured: item.article.isFeatured ?? false,
    isVideo: item.article.isVideo ?? false,
    duration: item.article.duration ?? null,
  }));
}
