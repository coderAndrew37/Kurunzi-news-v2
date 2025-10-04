import type { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  img: string | null; // ✅ always resolved URL string via urlFor
  category?: {
    title: string;
    slug: string;
  } | null;
  subcategory?: {
    title: string;
    slug: string;
  } | null;
  topic?: {
    title: string;
    slug: string;
  } | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  author?: Author | null;
  content?: PortableTextBlock[] | null;
  tags?: string[];
  readTime?: number | null;
  excerpt?: string | null;
  isFeatured?: boolean;
  isVideo?: boolean;
  duration?: string | null;
  relatedArticles?: RelatedArticle[];
}

export interface RawSanityArticle {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  mainImage?: SanityImageSource | null; // ✅ full Sanity image object
  categories?: {
    title?: string;
    slug?: { current: string };
  }[];
  publishedAt?: string | null;
  author?: Author | null;
  body?: PortableTextBlock[];
  tags?: string[];
  readTime?: number;
  excerpt?: string | null;
  isFeatured?: boolean;
  isVideo?: boolean;
  duration?: string | null;
}

export interface Subcategory {
  _id: string;
  title: string;
  description?: string;
  slug: string;
}

export interface Category {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  subcategories?: Subcategory[];
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  articleCount: number;
  trendDirection: "up" | "down" | "neutral";
  trendPercentage: number;
}

export interface NavTopic {
  _id: string;
  title: string;
  slug: string;
}

export interface NavSubcategory {
  _id: string;
  title: string;
  slug: string;
  topics?: NavTopic[];
}

export interface NavCategory {
  _id: string;
  title: string;
  slug: string;
  subcategories?: NavSubcategory[];
}

export interface Author {
  id?: string;
  name: string;
  role?: string;
  slug?: string;
  image?: SanityImageSource; // ✅ full image object
  bio?: string;
  social?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface HeroItem {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
  readTime?: number;
  isVideo?: boolean;
  duration?: string;
  isFeatured?: boolean;
  tags?: string[];
  author?: Author;
  image?: SanityImageSource;
  content?: PortableTextBlock[];
}

export interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  img?: string | null;
  category?: string;
  date?: string;
  readTime?: number;
  views?: number;
  publishedAt: string;
  fullTitle: string;
  featuredImage?: {
    url: string;
    alt?: string;
  } | null;
}
