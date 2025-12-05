import type { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  img: string | null; // still used for backward compatibility
  featuredImage?: {
    url: string;
    alt?: string | null;
    caption?: string | null;
  } | null;
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
  sources?: { title: string; url: string }[];
  location?: string | null;
  views?: number | null;
}

export interface RelatedArticle {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  img?: string | null;
  category?: {
    title: string;
    slug: string;
  } | null;
  publishedAt?: string | null;
  readTime?: number | null;
  views?: number | null;
  featuredImage?: {
    url: string;
    alt?: string | null;
  } | null;
}

/** Custom Sanity image type with metadata fields */
export interface SanityImageAssetRef {
  _ref: string;
  _type: "reference";
}

export interface SanityImage {
  _type: "image";
  asset: SanityImageAssetRef;

  // Optional metadata
  alt?: string | null;
  caption?: string | null;
  credit?: string | null;
  source?: string | null;
  alignment?: "left" | "center" | "right" | "full" | null;

  // Sanity built-in fields
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export type SanityMainImage =
  | SanityImage // new CMS images
  | { url: string; alt?: string | null; caption?: string | null } // legacy images
  | null;

export interface RawSanityArticle {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  mainImage?: SanityMainImage | null;
  img?: string; // legacy field
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

/** ✅ Represents a single comment fetched from Sanity (with nested replies) */
export interface ArticleComment {
  _id: string;
  name: string;
  displayName: string;
  email?: string | null;
  avatar: string;
  text: string;
  likes: number;
  createdAt: string;
  approved: boolean;
  replies: ArticleComment[]; // recursive structure
}

/** ✅ Represents the payload when submitting a new comment */
export interface CommentRequest {
  articleId: string;
  parentId?: string;
  name?: string;
  email?: string;
  text: string;
  avatar?: string;
}

/** ✅ Represents the API response after posting or fetching comments */
export type CommentResponse = ArticleComment | ArticleComment[];

/** ✅ Helper type for component props */
export interface CommentProps {
  comments: ArticleComment[];
  articleId: string;
  onReply?: (parentId: string, text: string) => void;
}
