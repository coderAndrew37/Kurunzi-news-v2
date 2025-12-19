import type { JSONContent } from "@tiptap/react";
import type { SanityBlock, SanitySpan } from "@/types/sanity";
import { randomUUID } from "crypto";

export function convertTipTapToSanity(
  content: JSONContent | null
): SanityBlock[] {
  if (!content?.content) return [];

  return content.content
    .map((node): SanityBlock | null => {
      if (!node.content) return null;

      const style =
        node.type === "heading"
          ? (`h${node.attrs?.level ?? 2}` as SanityBlock["style"])
          : "normal";

      const children: SanitySpan[] = node.content.map((child) => ({
        _type: "span",
        _key: randomUUID(),
        text: child.text ?? "",
        marks: child.marks?.map((m) => m.type) ?? [],
      }));

      return {
        _type: "block",
        _key: randomUUID(),
        style,
        children,
        markDefs: [],
      };
    })
    .filter(Boolean) as SanityBlock[];
}
