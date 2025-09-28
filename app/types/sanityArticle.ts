import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "next-sanity";

export interface SanityArticle {
  _id: string;
  headline: string;
  fullTitle?: string;
  excerpt?: string;
  slug?: { current: string };
  featuredImage?: SanityImageSource & { alt?: string };
  publishedAt: string;
  category?: string;
  content?: PortableTextBlock[];
}
