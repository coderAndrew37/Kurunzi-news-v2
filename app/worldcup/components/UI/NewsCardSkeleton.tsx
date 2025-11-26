export default function NewsCardSkeleton({
  variant = "default",
}: {
  variant?: "default" | "featured" | "compact";
}) {
  const cardClasses = {
    default: "bg-white rounded-lg shadow-md overflow-hidden",
    featured: "bg-white rounded-lg shadow-lg overflow-hidden",
    compact: "bg-white rounded-lg shadow-sm overflow-hidden",
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
    <div className={`${cardClasses[variant]} animate-pulse`}>
      {/* Image Skeleton */}
      <div className={`${imageHeight[variant]} bg-gray-300`}></div>

      {/* Content Skeleton */}
      <div className={contentPadding[variant]}>
        {/* Category Skeleton */}
        <div className="w-20 h-6 bg-gray-300 rounded-full mb-4"></div>

        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-between items-center">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
