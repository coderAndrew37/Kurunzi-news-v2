import { getBreakingNews } from "../lib/getBreakingNews";

export default async function BreakingNewsTicker() {
  const newsItems = await getBreakingNews();

  if (!newsItems.length) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 overflow-hidden relative shadow-md">
      <div className="container mx-auto px-4 flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 bg-white text-red-700 font-bold text-xs uppercase tracking-wider py-1 px-3 rounded mr-4 flex items-center">
          <span className="h-2 w-2 bg-red-700 rounded-full mr-2 animate-pulse"></span>
          Breaking
        </div>

        {/* Ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...newsItems, ...newsItems].map((item, index) => (
              <div key={index} className="inline-flex items-center mr-8">
                <a
                  href={item.href}
                  className="text-sm font-medium hover:underline"
                >
                  {item.headline}
                </a>
                {index < newsItems.length * 2 - 1 && (
                  <span className="mx-4 text-white/40">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-red-600 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-red-600 to-transparent pointer-events-none"></div>
    </div>
  );
}
