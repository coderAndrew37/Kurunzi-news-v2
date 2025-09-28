import { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Story } from "../components/types";
import { sanityClient } from "./sanity.client";
import imageUrlBuilder from "@sanity/image-url";

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
  image?: SanityImageSource; // keep for safety
  mainImage?: SanityImageSource; // ✅ add this for aliased field
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

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (src: SanityImageSource) =>
  builder.image(src).width(1200).height(800).url();

export async function getHeroStories(): Promise<Story[]> {
  const data = await sanityClient.fetch<HeroQueryResponse>(`
  *[_type == "hero"][0]{
    items[] | order(article->publishedAt desc)[0..3] {  // ✅ limit + sort at the item level
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
        author->{
          name,
          image
        },
        "mainImage": image,   // ✅ alias article image
        content
      },
      overrideTitle,
      customImage              // ✅ hero-level custom image stays here
    }
  }
`);

  return (
    data?.items?.map((item) => ({
      id: item.article._id,
      slug: item.article.slug,
      title: item.overrideTitle ?? item.article.title,
      subtitle: item.article.subtitle ?? null,
      img: item.customImage
        ? urlFor(item.customImage)
        : item.article.mainImage
          ? urlFor(item.article.mainImage)
          : null,

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
    })) ?? []
  );
}
