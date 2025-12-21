"use client";

import Image from "next/image";
import { useState } from "react";
import type { SanityMainImage } from "@/app/components/types";
import { sanityClient } from "@/app/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanityClient);

const urlFor = (src: SanityImageSource) => builder.image(src);

/** 🔒 Safely resolve image URL from ANY SanityMainImage */
function getImageUrl(
  image: SanityMainImage,
  width: number,
  height: number
): string {
  if (!image) return "";

  // ✅ Legacy image with direct URL
  if ("url" in image && typeof image.url === "string") {
    return image.url;
  }

  // ✅ Real Sanity image
  if ("asset" in image && image.asset?._ref) {
    return urlFor(image)
      .width(width)
      .height(height)
      .fit("max")
      .auto("format")
      .url();
  }

  return "";
}

interface NewsGalleryProps {
  images: SanityMainImage[];
}

export default function NewsGallery({ images }: NewsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) return null;

  const selected = images[selectedImage];

  const mainImageUrl = getImageUrl(selected, 800, 600);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Gallery</h3>

      {/* Main Image */}
      <div className="mb-4">
        <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden relative">
          {mainImageUrl && (
            <Image
              src={mainImageUrl}
              alt={selected?.alt ?? "Gallery image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          )}
        </div>

        {selected?.caption && (
          <div className="text-sm text-gray-600 mt-2 text-center italic">
            {selected.caption}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => {
            const thumbUrl = getImageUrl(image, 200, 200);

            return (
              <button
                key={index}
                aria-label={`Select image ${index + 1}`}
                onClick={() => setSelectedImage(index)}
                className={`h-20 bg-gray-200 rounded overflow-hidden relative transition-all ${
                  selectedImage === index
                    ? "ring-2 ring-blue-600 ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {thumbUrl && (
                  <Image
                    src={thumbUrl}
                    alt={image?.alt ?? `Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
