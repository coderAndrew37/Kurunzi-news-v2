export interface ContentBlock {
  _type: string;
  _key: string;
  style?: string;
  children?: any[];
  [key: string]: any;
}

export function parseArticleContent(content: any): ContentBlock[] {
  if (!content) return [];
  return Array.isArray(content) ? content : [];
}

export function countParagraphs(blocks: ContentBlock[]): number {
  return blocks.filter(
    (block) => block._type === "block" && block.style === "normal"
  ).length;
}

export function findNaturalBreakpoints(
  blocks: ContentBlock[],
  minParagraphs = 3
): number[] {
  const breakpoints: number[] = [];
  let paragraphCount = 0;

  blocks.forEach((block, index) => {
    if (block._type === "block" && block.style === "normal") {
      paragraphCount++;

      // Consider breakpoints after headings or after every few paragraphs
      if (paragraphCount >= minParagraphs) {
        // Check if next block is also a paragraph or if we're at a natural break
        const nextBlock = blocks[index + 1];
        if (
          !nextBlock ||
          nextBlock._type !== "block" ||
          nextBlock.style !== "normal"
        ) {
          breakpoints.push(index + 1);
          paragraphCount = 0;
        }
      }
    } else if (
      block._type === "block" &&
      ["h2", "h3"].includes(block.style || "")
    ) {
      // Natural break after headings
      if (paragraphCount > 0) {
        breakpoints.push(index);
        paragraphCount = 0;
      }
    }
  });

  return breakpoints;
}

export function extractFirstImage(blocks: ContentBlock[]): string | null {
  for (const block of blocks) {
    if (block._type === "image" && block.asset?._ref) {
      // Return the image URL or reference
      return block.asset._ref;
    }
  }
  return null;
}

export function estimateReadingTime(
  blocks: ContentBlock[],
  wordsPerMinute = 200
): number {
  let wordCount = 0;

  blocks.forEach((block) => {
    if (block._type === "block" && block.children) {
      block.children.forEach((child) => {
        if (child.text) {
          wordCount += child.text.split(/\s+/).length;
        }
      });
    }
  });

  return Math.ceil(wordCount / wordsPerMinute);
}
