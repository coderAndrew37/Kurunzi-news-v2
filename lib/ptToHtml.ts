import { toHTML, PortableTextHtmlComponents } from "@portabletext/to-html";

export function ptToHtml(content: any) {
  try {
    const components: PortableTextHtmlComponents = {
      block: ({ value, children }) => {
        if (value.style === "h2" || value.style === "h3") {
          const tag = value.style;
          const rawText = (children ?? "")
            .replace(/<[^>]*>/g, "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

          return `<${tag} id="${rawText}">${children}</${tag}>`;
        }
        return `<p>${children}</p>`;
      },
      types: {},
      marks: {},
      list: () => "",
      listItem: () => "",
      hardBreak: () => "<br />",
      unknownType: () => "",
      unknownMark: () => "",
      unknownBlockStyle: () => "",
      unknownList: () => "",
      unknownListItem: () => "",
      escapeHTML: (input: string) => input, // Add this line to satisfy the required property
    };

    return toHTML(content, { components });
  } catch (e) {
    console.error("PortableText → HTML failed:", e);
    return "";
  }
}
