import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { serverClient } from "./sanity.server";

const builder = imageUrlBuilder(serverClient);

/**
 * Overloads to allow both 1-arg and 2-arg usage.
 * The second argument is kept only for backward compatibility.
 */
export function urlFor(
  source: SanityImageSource
): ReturnType<typeof builder.image>;
export function urlFor(
  source: SanityImageSource,
  _legacyMainImage: unknown
): ReturnType<typeof builder.image>;
export function urlFor(source: SanityImageSource) {
  // _legacyMainImage ignored intentionally (legacy support)
  return builder.image(source);
}
