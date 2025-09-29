import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { serverClient } from "./sanity.server";

const builder = imageUrlBuilder(serverClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
