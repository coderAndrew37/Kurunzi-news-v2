export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <div className="bg-white border-b border-gray-200 animate-pulse">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Story Skeleton */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] bg-gray-300 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-8 w-full bg-gray-300 rounded"></div>
                <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-gray-300 rounded"></div>
                      <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Stories Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="h-6 w-6 bg-gray-300 rounded-full mt-1"></div>
                      <div className="flex-1">
                        <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Articles Grid Skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse"
                >
                  <div className="relative aspect-video bg-gray-300"></div>
                  <div className="p-5">
                    <div className="h-5 w-full bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 w-full bg-gray-300 rounded mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-16 bg-gray-300 rounded"></div>
                      <div className="h-3 w-12 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-6 animate-pulse">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                      <div className="h-4 w-full bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
