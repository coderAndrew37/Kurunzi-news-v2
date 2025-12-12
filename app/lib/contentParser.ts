// app/writer/_lib/articleHelpers.ts

/** Represents an inline span inside a block, usually text */
export interface ContentChild {
  _type: "span";
  text: string;
  marks?: string[];
}

/** Represents a single block or image in the article */
export interface ContentBlock {
  _type: "block" | "image" | string; // block types, image, or other custom types
  _key: string;
  style?: string; // e.g., "normal", "h2", "h3"
  children?: ContentChild[]; // only for block
  asset?: { _ref: string }; // only for images
  [key: string]: unknown;
}

/**
 * Ensures content is always returned as an array of blocks
 */
export function parseArticleContent(
  content: ContentBlock[] | null | undefined
): ContentBlock[] {
  if (!content) return [];
  return Array.isArray(content) ? content : [];
}

/**
 * Counts normal paragraphs in blocks
 */
export function countParagraphs(blocks: ContentBlock[]): number {
  return blocks.filter(
    (block) => block._type === "block" && block.style === "normal"
  ).length;
}

/**
 * Finds natural breakpoints for splitting content
 */
export function findNaturalBreakpoints(
  blocks: ContentBlock[],
  minParagraphs = 3
): number[] {
  const breakpoints: number[] = [];
  let paragraphCount = 0;

  blocks.forEach((block, index) => {
    if (block._type === "block" && block.style === "normal") {
      paragraphCount++;

      const nextBlock = blocks[index + 1];
      if (
        paragraphCount >= minParagraphs &&
        (!nextBlock ||
          nextBlock._type !== "block" ||
          nextBlock.style !== "normal")
      ) {
        breakpoints.push(index + 1);
        paragraphCount = 0;
      }
    } else if (
      block._type === "block" &&
      ["h2", "h3"].includes(block.style || "")
    ) {
      if (paragraphCount > 0) {
        breakpoints.push(index);
        paragraphCount = 0;
      }
    }
  });

  return breakpoints;
}

/**
 * Extracts the first image URL from the blocks
 */
export function extractFirstImage(blocks: ContentBlock[]): string | null {
  for (const block of blocks) {
    if (block._type === "image" && block.asset?._ref) {
      return block.asset._ref;
    }
  }
  return null;
}

/**
 * Estimates reading time in minutes
 */
export function estimateReadingTime(
  blocks: ContentBlock[],
  wordsPerMinute = 200
): number {
  let wordCount = 0;

  blocks.forEach((block) => {
    if (block._type === "block" && block.children) {
      block.children.forEach((child) => {
        wordCount += child.text.trim().split(/\s+/).length;
      });
    }
  });

  return Math.ceil(wordCount / wordsPerMinute);
}
