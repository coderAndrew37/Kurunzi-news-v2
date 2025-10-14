export default function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center space-x-2 text-sm mb-4">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-blue-400 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-blue-400 rounded animate-pulse"></div>
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-blue-400 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-blue-400 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Title & Description Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="h-8 w-3/4 bg-blue-400 rounded animate-pulse mb-3"></div>
              <div className="h-5 w-1/2 bg-blue-400 rounded animate-pulse mb-4"></div>

              {/* Count Skeleton */}
              <div className="flex items-center">
                <div className="h-px bg-blue-400 flex-1 max-w-[100px]"></div>
                <div className="h-4 w-24 bg-blue-400 rounded animate-pulse mx-4"></div>
                <div className="h-px bg-blue-400 flex-1 max-w-[100px]"></div>
              </div>
            </div>

            {/* YouTube CTA Skeleton */}
            <div className="mt-4 md:mt-0">
              <div className="h-10 w-40 bg-red-400 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area Skeleton */}
          <div className="lg:col-span-3">
            {/* Articles Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ArticleCardSkeleton
                  key={index}
                  variant={index === 0 ? "featured" : "default"}
                />
              ))}
            </div>

            {/* Newsletter Skeleton */}
            <div className="mt-12">
              <NewsletterSkeleton />
            </div>

            {/* Subcategories Skeleton */}
            <div className="mt-12">
              <SubcategoriesSkeleton />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <SidebarSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Skeleton Components
function ArticleCardSkeleton({
  variant = "default",
}: {
  variant?: "default" | "featured";
}) {
  if (variant === "featured") {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
        <div className="relative aspect-[16/9] bg-gray-300"></div>
        <div className="p-4">
          <div className="h-4 w-20 bg-gray-300 rounded mb-3"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded mb-3"></div>
          <div className="flex justify-between">
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
            <div className="h-3 w-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="relative aspect-video bg-gray-300"></div>
      <div className="p-5">
        <div className="h-5 w-full bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded"></div>
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
          </div>
          <div className="h-3 w-12 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      {/* Trending Articles Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
                <div className="h-3 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Articles Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-start space-x-3 p-3">
              <div className="h-2 w-2 bg-gray-300 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
                <div className="h-3 w-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Skeleton */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6 animate-pulse">
        <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-4"></div>
        <div className="flex space-x-2">
          <div className="flex-1 h-8 bg-gray-300 rounded"></div>
          <div className="w-20 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Ad Banner Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
        <div className="h-64 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}

function NewsletterSkeleton() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center animate-pulse">
      <div className="h-8 w-48 bg-blue-400 rounded mx-auto mb-2"></div>
      <div className="h-5 w-64 bg-blue-400 rounded mx-auto mb-6"></div>
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
        <div className="flex-1 h-12 bg-blue-400 rounded-lg"></div>
        <div className="w-32 h-12 bg-blue-400 rounded-lg"></div>
      </div>
    </div>
  );
}

function SubcategoriesSkeleton() {
  return (
    <section className="animate-pulse">
      <div className="h-7 w-48 bg-gray-300 rounded mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
