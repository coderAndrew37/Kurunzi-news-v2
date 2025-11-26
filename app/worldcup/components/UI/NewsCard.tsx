import Link from "next/link";

export interface NewsCardProps {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  readTime?: number;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export default function NewsCard({
  id,
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
  const cardClasses = {
    default:
      "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300",
    featured:
      "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300",
    compact:
      "bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300",
  };

  const imageHeight = {
    default: "h-48",
    featured: "h-64",
    compact: "h-32",
  };

  const contentPadding = {
    default: "p-6",
    featured: "p-8",
    compact: "p-4",
  };

  return (
    <article className={`${cardClasses[variant]} ${className} group`}>
      <Link href={`worldcup/news/${slug}`} className="block">
        {/* Image Container */}
        <div
          className={`${imageHeight[variant]} bg-gray-200 relative overflow-hidden`}
        >
          {/* Placeholder for image - you can replace this with Next/Image later */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 opacity-80 group-hover:opacity-90 transition-opacity duration-300">
            {/* You can add an actual image here later */}
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-20">
              <svg
                className="w-16 h-16"
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

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          </div>

          {/* Read Time (if provided) */}
          {readTime && (
            <div className="absolute top-4 right-4">
              <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {readTime} min read
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={contentPadding[variant]}>
          {/* Title */}
          <h3
            className={`font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 ${
              variant === "featured"
                ? "text-2xl"
                : variant === "compact"
                  ? "text-lg"
                  : "text-xl"
            }`}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p
            className={`text-gray-600 mb-4 ${
              variant === "compact" ? "text-sm line-clamp-2" : "line-clamp-3"
            }`}
          >
            {excerpt}
          </p>

          {/* Footer */}
          <div
            className={`flex justify-between items-center ${
              variant === "compact" ? "text-xs" : "text-sm"
            } text-gray-500`}
          >
            <span>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform duration-300">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
