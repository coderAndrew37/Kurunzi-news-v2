import Link from "next/link";
import Image from "next/image";
import { SanityMainImage } from "@/app/components/types";

import { sanityClient } from "@/app/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanityClient);

const urlFor = (src: SanityImageSource) => builder.image(src);

export interface NewsCardProps {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;

  image?:
    | SanityMainImage
    | {
        url: string;
        alt?: string | null;
        caption?: string | null;
      };

  readTime?: number;
  variant?: "default" | "featured" | "compact" | "headline";
  className?: string;
}

export default function NewsCard({
  slug,
  title,
  excerpt,
  category,
  date,
  image,
  readTime,
  variant = "default",
  className = "",
}: NewsCardProps) {
  // Chelsea FC inspired design system
  const cardConfig = {
    default: {
      container:
        "bg-white rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100",
      image: "h-56",
      content: "p-5",
      title:
        "text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors",
      excerpt: "text-sm text-gray-600 mt-2 line-clamp-2",
      category: "bg-blue-600 text-white",
    },
    featured: {
      container:
        "bg-white rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-200",
      image: "h-72",
      content: "p-6",
      title:
        "text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors",
      excerpt: "text-base text-gray-600 mt-3 line-clamp-3",
      category: "bg-red-600 text-white", // Chelsea's red accent
    },
    compact: {
      container:
        "bg-white rounded-md overflow-hidden group hover:shadow-md transition-all duration-300 border border-gray-100",
      image: "h-40",
      content: "p-4",
      title:
        "text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors",
      excerpt: "text-sm text-gray-500 mt-1 line-clamp-2",
      category: "bg-gray-700 text-white",
    },
    headline: {
      container:
        "bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-300",
      image: "h-80",
      content: "p-6",
      title: "text-2xl font-bold text-white",
      excerpt: "text-blue-100 mt-3 line-clamp-3",
      category: "bg-yellow-500 text-gray-900 font-bold",
    },
  };

  const config = cardConfig[variant];

  const sanityImage = hasSanityAsset(image) ? image : null;

  const imageUrl = sanityImage
    ? urlFor(sanityImage)
        .width(800)
        .height(variant === "featured" ? 450 : 300)
        .url()
    : null;

  return (
    <article className={`${config.container} ${className}`}>
      <Link href={`/worldcup/news/${slug}`} className="block h-full">
        {/* Image Container */}
        <div
          className={`${config.image} w-full relative overflow-hidden bg-gray-200`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              priority={variant === "featured" || variant === "headline"}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <div className="text-gray-600 opacity-30">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Chelsea-style gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              variant === "headline"
                ? "from-black/70 via-black/30 to-transparent"
                : "from-black/40 to-transparent"
            }`}
          />

          {/* Category Badge - Chelsea style */}
          <div className="absolute top-3 left-3">
            <span
              className={`${config.category} px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-sm`}
            >
              {category}
            </span>
          </div>

          {/* Read Time Badge */}
          {readTime && (
            <div className="absolute bottom-3 right-3">
              <span
                className={`${
                  variant === "headline"
                    ? "bg-white/20 text-white backdrop-blur-sm"
                    : "bg-black/60 text-white"
                } px-2 py-1 text-xs rounded`}
              >
                {readTime} min
              </span>
            </div>
          )}

          {/* Date Stamp - Chelsea style */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center">
              {variant === "headline" ? (
                <>
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-bold">
                      {new Date(date).getDate()}
                    </span>
                  </div>
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-wider">
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </div>
                    <div className="text-xs opacity-75">
                      {new Date(date).getFullYear()}
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-white text-sm font-medium">
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className={config.content}>
          <h3 className={config.title}>{title}</h3>

          {excerpt && <p className={config.excerpt}>{excerpt}</p>}

          {/* Footer - Chelsea style */}
          <div
            className={`mt-4 flex items-center justify-between ${
              variant === "headline" ? "border-t border-white/20 pt-4" : "pt-2"
            }`}
          >
            <div className="flex items-center">
              {/* Author/League indicator - simplified */}
              <div
                className={`flex items-center ${
                  variant === "headline" ? "text-blue-100" : "text-gray-500"
                } text-xs`}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>FIFA World Cup</span>
              </div>
            </div>

            {/* Read More Arrow - Chelsea style */}
            <span
              className={`inline-flex items-center ${
                variant === "headline"
                  ? "text-yellow-400 hover:text-yellow-300"
                  : "text-blue-600 hover:text-blue-700"
              } text-sm font-medium transition-colors group-hover:translate-x-1`}
            >
              Read
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function hasSanityAsset(image: unknown): image is SanityMainImage {
  if (typeof image === "object" && image !== null && "asset" in image) {
    const asset = (image as Record<string, unknown>).asset;

    return (
      typeof asset === "object" &&
      asset !== null &&
      "_ref" in asset &&
      typeof (asset as Record<string, unknown>)["_ref"] === "string"
    );
  }

  return false;
}
