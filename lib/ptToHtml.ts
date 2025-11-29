import type { PortableTextBlock } from "@portabletext/types";
import { PortableTextHtmlComponents, toHTML } from "@portabletext/to-html";

// Accepts typed PortableText
export function ptToHtml(content: PortableTextBlock[] | undefined): string {
  if (!content) return "";

  try {
    const components: PortableTextHtmlComponents = {
      block: ({ value, children }) => {
        const style = value.style || "normal";

        if (style === "h2" || style === "h3") {
          const tag = style;

          const rawText = String(children)
            .replace(/<[^>]*>/g, "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

          return `<${tag} id="${rawText}">${children}</${tag}>`;
        }

        return `<p>${children}</p>`;
      },

      // No custom types yet
      types: {},

      marks: {},

      list: ({ children }) => `<ul>${children}</ul>`,

      listItem: ({ children }) => `<li>${children}</li>`,

      hardBreak: () => "<br />",

      // Unknown fallbacks
      unknownType: () => "",
      unknownMark: () => "",
      unknownBlockStyle: () => "",
      unknownList: () => "",
      unknownListItem: () => "",

      // Safe HTML escaping
      escapeHTML: (input: string) =>
        input.replace(/[&<>"']/g, (char) => {
          const escapes: Record<string, string> = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          };
          return escapes[char];
        }),
    };

    return toHTML(content, { components });
  } catch (error) {
    console.error("PortableText → HTML failed:", error);
    return "";
  }
}
