export interface SanityBlock {
  _type: "block";
  _key: string;
  style: "normal" | "h1" | "h2" | "h3";
  children: SanitySpan[];
  markDefs: unknown[];
}

export interface SanitySpan {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
}
