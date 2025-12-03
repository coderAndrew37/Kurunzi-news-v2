import { Author, SanityMainImage } from "@/app/components/types";
import { PortableTextBlock } from "next-sanity";

export interface Team {
  _id: string;
  name: string;
  code: string;
  flag?: string;
  played?: number;
  won?: number;
  drawn?: number;
  lost?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  points?: number;
  group?: string;
  confederation?: string;
  currentRank?: number;
  worldCupWins?: number;
}

export interface Match {
  _id: string;
  matchDate: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  group: string;
  homeScore?: number;
  awayScore?: number;
  status: "scheduled" | "live" | "finished";
  matchType: "group" | "round16" | "quarter" | "semi" | "final";
}

export interface WorldCupArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;

  featuredImage?: SanityMainImage | null;

  content: PortableTextBlock[];

  publishedAt: string;
  updatedAt?: string;

  author: Author;

  categories: WorldCupCategory[];

  tags: string[];
  readTime: number;

  gallery?: SanityMainImage[];

  matchDetails?: WorldCupMatchDetails;

  relatedArticles?: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string | null;
    featuredImage?: SanityMainImage | null;
    publishedAt?: string;
    readTime?: number;
  }[];

  featured?: boolean;
  isBreaking?: boolean;
}

export interface WorldCupHeroArticle {
  _id: string;
  title: string;
  slug: string; // MUST be string
  excerpt: string;
  featuredImage?: any;
  publishedAt: string;
  readTime: number;
  isBreaking?: boolean;
  category?: {
    title: string;
    slug: string;
    color?: string;
  };
  author: {
    name: string;
    slug: string;
  };
}

export interface WorldCupUIArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  category: string;
  author: { name: string; slug: string };
  image?: string;
  isFeatured: boolean;
  isBreaking: boolean;
}

export interface WorldCupCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string;
  icon?: string;
}

export interface WorldCupMatchDetails {
  teams: string[];
  date: string;
  venue: string;
  competition: string;
  stage?: string;
}

export interface PTImage {
  _type: "image";
  asset: { _ref: string };
  alt?: string;
  caption?: string;
  alignment?: "left" | "right" | "center";
}

export interface PTCodeBlock {
  _type: "code";
  language: string;
  code: string;
}

export interface PTYouTube {
  _type: "youtube";
  url: string;
  caption?: string;
}

export type WorldCupPortableText =
  | PortableTextBlock
  | PTImage
  | PTCodeBlock
  | PTYouTube;
