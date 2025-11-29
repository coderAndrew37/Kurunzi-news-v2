"use client";

import { urlFor } from "@/app/lib/sanity.image";
import Image from "next/image";
import { useState } from "react";
import type { SanityMainImage } from "@/app/components/types";

interface NewsGalleryProps {
  images: SanityMainImage[];
}

export default function NewsGallery({ images }: NewsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) return null;

  const selected = images[selectedImage];

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Gallery</h3>

      {/* Main Image */}
      <div className="mb-4">
        <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden relative">
          <Image
            src={urlFor(selected).width(800).height(600).url()}
            alt={selected.alt ?? "Gallery image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        {selected.caption && (
          <div className="text-sm text-gray-600 mt-2 text-center italic">
            {selected.caption}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              aria-label="select Button"
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-20 bg-gray-200 rounded overflow-hidden relative transition-all ${
                selectedImage === index
                  ? "ring-2 ring-blue-600 ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={urlFor(image).width(200).height(200).url()}
                alt={image.alt ?? `Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
