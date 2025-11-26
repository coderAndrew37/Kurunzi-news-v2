"use client";

import { useState } from "react";

interface NewsGalleryProps {
  images: string[];
}

export default function NewsGallery({ images }: NewsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Gallery</h3>

      {/* Main Image */}
      <div className="mb-4">
        <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            Image {selectedImage + 1}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-20 bg-gradient-to-br from-blue-400 to-green-400 rounded overflow-hidden relative ${
                selectedImage === index ? "ring-2 ring-blue-600" : ""
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                {index + 1}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
