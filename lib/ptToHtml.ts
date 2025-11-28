import { toHTML } from "@portabletext/to-html";

export function ptToHtml(content: any) {
  try {
    return toHTML(content);
  } catch (e) {
    console.error("PortableText → HTML failed", e);
    return "";
  }
}
