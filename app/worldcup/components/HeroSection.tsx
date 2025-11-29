import Image from "next/image";
import Link from "next/link";
import { WorldCupArticle } from "./types";
import { urlFor } from "@/app/lib/sanity.image";

interface HeroSectionProps {
  featuredArticle?: WorldCupArticle;
}

export default function HeroSection({ featuredArticle }: HeroSectionProps) {
  if (!featuredArticle) {
    return (
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-red-600 rounded-xl overflow-hidden mb-8 min-h-[500px] flex items-center">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-white">
          <div className="max-w-2xl">
            <span className="bg-gradient-to-r from-blue-500 to-red-500 px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block tracking-wide uppercase">
              World Cup 2026
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              The Road to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                Glory
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light leading-relaxed">
              48 teams, 16 cities, 1 dream. Follow every moment of the beautiful
              game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/worldcup/fixtures"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-center"
              >
                View Fixtures
              </Link>
              <Link
                href="/worldcup/teams"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                Explore Teams
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 right-8 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-8 left-1/4 w-16 h-16 bg-red-400 rounded-full opacity-30 blur-lg"></div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden mb-8 group">
      {/* Background Image with Overlay */}
      <div className="relative h-[600px] md:h-[700px]">
        {featuredArticle.featuredImage && (
          <Image
            src={urlFor(featuredArticle.featuredImage)
              .width(1920)
              .height(1080)
              .url()}
            alt={featuredArticle.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        )}

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase">
                Featured Story
              </span>
              <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase">
                {featuredArticle.categories?.join(", ") ?? "Uncategorized"}
              </span>

              {featuredArticle.isBreaking && (
                <span className="bg-yellow-500 px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase animate-pulse">
                  ⚡ Breaking News
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              {featuredArticle.title}
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light leading-relaxed max-w-3xl">
              {featuredArticle.excerpt}
            </p>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>
                    {new Date(featuredArticle.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{featuredArticle.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👤</span>
                  <span className="font-medium">
                    {featuredArticle.author.name}
                  </span>
                </div>
              </div>

              <Link
                href={`/worldcup/news/${featuredArticle.slug}`}
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl inline-flex items-center gap-2 group/button"
              >
                Read Full Story
                <span className="group-hover/button:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
