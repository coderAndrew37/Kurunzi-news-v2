import { isSanityImage, urlFor } from "@/app/lib/sanity.image";
import { SanityMainImage } from "../types";

export function getImageUrl(image: SanityMainImage, width = 800, height = 600) {
  if (!image) return null;

  if (isSanityImage(image)) {
    return urlFor(image).width(width).height(height).url();
  }

  return null;
}
