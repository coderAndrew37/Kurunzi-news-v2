import { Author, Category, Subcategory } from "@/app/components/types";
import { User, Folder, Tag, TrendingUp, Hash, Bookmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity.image";

interface SearchSidebarProps {
  query: string;
  authors: Author[];
  categories: Category[];
  subcategories: Subcategory[];
  tags: string[];
  totalArticles: number;
}

export default function SearchSidebar({
  query,
  authors,
  categories,
  tags,
  totalArticles,
}: SearchSidebarProps) {
  // Extract unique tags from search results
  const uniqueTags = Array.from(
    new Set(tags.flatMap((t) => (Array.isArray(t) ? t : [t])))
  ).slice(0, 15);

  return (
    <div className="space-y-8">
      {/* Search Stats */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-red-600" />
          Search Stats
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-red-100">
            <span className="text-gray-700">Total Results</span>
            <span className="font-bold text-red-700">
              {totalArticles.toLocaleString()}
            </span>
          </div>
          {authors.length > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-red-100">
              <span className="text-gray-700">Related Authors</span>
              <span className="font-bold text-red-700">{authors.length}</span>
            </div>
          )}
          {categories.length > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-red-100">
              <span className="text-gray-700">Related Categories</span>
              <span className="font-bold text-red-700">
                {categories.length}
              </span>
            </div>
          )}
          {uniqueTags.length > 0 && (
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">Related Tags</span>
              <span className="font-bold text-red-700">
                {uniqueTags.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Related Authors */}
      {authors.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Related Authors</h3>
          </div>
          <div className="space-y-4">
            {authors.slice(0, 5).map((author) => (
              <Link
                key={author.id}
                href={`/author/${author.slug}`}
                className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  {author.image ? (
                    <Image
                      src={urlFor(author.image).width(48).height(48).url()}
                      alt={author.name}
                      fill
                      className="object-cover rounded-full group-hover:scale-110 transition-transform"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-red-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 group-hover:text-red-600 line-clamp-1">
                    {author.name}
                  </div>
                  {author.bio && (
                    <div className="text-xs text-gray-500 line-clamp-1 mt-1">
                      {author.bio}
                    </div>
                  )}
                </div>
              </Link>
            ))}
            {authors.length > 5 && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}&type=authors`}
                className="block text-center text-sm text-red-600 hover:text-red-800 font-medium pt-2"
              >
                View all authors →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Related Categories */}
      {categories.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <Folder className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">
              Related Categories
            </h3>
          </div>
          <div className="space-y-3">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="group flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all"
              >
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-red-600">
                    {category.title}
                  </div>
                  {category.description && (
                    <div className="text-xs text-gray-500 line-clamp-1 mt-1">
                      {category.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
            {categories.length > 6 && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}&type=categories`}
                className="block text-center text-sm text-red-600 hover:text-red-800 font-medium pt-2"
              >
                View all categories →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Popular Tags */}
      {uniqueTags.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <Tag className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Related Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag, index) => (
              <Link
                key={index}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 hover:scale-105 transition-all"
              >
                <Hash className="h-3 w-3" />
                {tag}
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Click any tag to search for more articles with that tag
            </p>
          </div>
        </div>
      )}

      {/* Save Search */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <Bookmark className="h-5 w-5 mr-2 text-blue-600" />
          Save This Search
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          Get notified when new articles match your search for "{query}"
        </p>
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity">
          Save Search
        </button>
      </div>
    </div>
  );
}
