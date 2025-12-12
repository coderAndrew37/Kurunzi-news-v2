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

export function isSanityImage(value: unknown): value is SanityImageSource {
  if (
    typeof value !== "object" ||
    value === null ||
    !("_type" in value) ||
    !("asset" in value)
  ) {
    return false;
  }

  const obj = value as Record<string, unknown>;
  if (obj._type !== "image") return false;

  const asset = obj.asset;
  if (typeof asset !== "object" || asset === null) return false;

  const assetObj = asset as Record<string, unknown>;
  return typeof assetObj._ref === "string";
}
