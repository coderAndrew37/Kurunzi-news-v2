"use client";

import { urlFor } from "@/app/lib/sanity.image";
import { useState } from "react";

interface NewsGalleryProps {
  images: any[];
}

export default function NewsGallery({ images }: NewsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Gallery</h3>

      {/* Main Image */}
      <div className="mb-4">
        <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden relative">
          <img
            src={urlFor(images[selectedImage]).width(800).height(600).url()}
            alt={images[selectedImage].alt || "Gallery image"}
            className="w-full h-full object-cover"
          />
        </div>
        {images[selectedImage].caption && (
          <div className="text-sm text-gray-600 mt-2 text-center italic">
            {images[selectedImage].caption}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-20 bg-gray-200 rounded overflow-hidden relative transition-all ${
                selectedImage === index
                  ? "ring-2 ring-blue-600 ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={urlFor(image).width(200).height(200).url()}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
