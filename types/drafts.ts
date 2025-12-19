import type { JSONContent } from "@tiptap/react";

export interface DraftArticle {
  id: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  body: JSONContent | null;
  tags: string[] | null;
  read_time: number | null;
  word_count: number | null;
  author_sanity_id: string;
  featured_image: SanityImageRef | null;
}

export interface SanityImageRef {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
}
