import type { JSONContent } from "@tiptap/react";

/* ------------------------------
 Sanity Portable Text Types
-------------------------------*/

export type SanityBlock = SanityTextBlock | SanityImageBlock;

export interface SanityTextBlock {
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  children: SanitySpan[];
  markDefs?: SanityMarkDef[];
  listItem?: "bullet" | "number";
  level?: number;
}

export interface SanitySpan {
  _type: "span";
  text: string;
  marks: string[];
}

export interface SanityMarkDef {
  _key: string;
  _type: "link";
  href: string;
  target?: "_blank";
  nofollow?: boolean;
}

export interface SanityImageBlock {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
  alt?: string;
  caption?: string;
  credit?: string;
  alignment?: "left" | "center" | "right" | "full";
}

/* ------------------------------
 TipTap Helpers
-------------------------------*/

export type TipTapContent = JSONContent;
