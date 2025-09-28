export default function ArticlePageLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Ad Banner Skeleton */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="h-20 md:h-24 bg-gray-300 animate-pulse"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>

            {/* Article Card Skeleton */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
              {/* Article Header */}
              <div className="border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-6 w-20 bg-gray-300 rounded"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="h-8 w-full bg-gray-300 rounded mb-4"></div>
                <div className="h-5 w-3/4 bg-gray-300 rounded mb-3"></div>
                <div className="flex flex-wrap items-center gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-gray-300 rounded"></div>
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Image */}
              <div className="px-6 py-6">
                <div className="relative aspect-video bg-gray-300 rounded-lg"></div>
              </div>

              {/* Article Content */}
              <div className="px-6 pb-6 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 w-full bg-gray-300 rounded"></div>
                ))}
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Newsletter Skeleton */}
            <div className="mt-8 animate-pulse">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center">
                <div className="h-6 w-48 bg-blue-400 rounded mx-auto mb-2"></div>
                <div className="h-4 w-64 bg-blue-400 rounded mx-auto mb-6"></div>
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                  <div className="flex-1 h-12 bg-blue-400 rounded-lg"></div>
                  <div className="w-32 h-12 bg-blue-400 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Related Articles Skeleton */}
            <div className="mt-8 animate-pulse">
              <div className="h-7 w-48 bg-gray-300 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div className="h-40 bg-gray-300 rounded mb-3"></div>
                    <div className="h-5 w-full bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 space-y-6 animate-pulse">
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
