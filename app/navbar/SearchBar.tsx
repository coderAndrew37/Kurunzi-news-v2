"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
// @ts-ignore: Missing type declarations for side-effect CSS import
import "react-loading-skeleton/dist/skeleton.css";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../lib/sanity.image";

interface SearchBarProps {
  isSearchOpen: boolean;
  popularTags: string[];
}

interface Suggestion {
  id: string;
  _type: "article" | "author" | "category";
  title?: string;
  slug?: string;
  name?: string;
  image?: SanityImageSource;
}

export default function SearchBar({
  isSearchOpen,
  popularTags,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{
    articles: Suggestion[];
    authors: Suggestion[];
    categories: Suggestion[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setSuggestions(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search-suggestions?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="mt-4 pb-3 relative">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news, topics, or authors..."
          className="pl-10 pr-4 py-2 w-full rounded-full"
        />
      </form>

      {/* Suggestions dropdown */}
      {query && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-3 space-y-2">
              <Skeleton height={20} count={3} />
            </div>
          ) : suggestions ? (
            <div className="p-2 space-y-4">
              {/* Articles */}
              {suggestions.articles?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 px-2 mb-1">
                    Articles
                  </h4>
                  {suggestions.articles.map((s) => (
                    <Link
                      key={s.id}
                      href={`/article/${s.slug}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* Authors */}
              {suggestions.authors?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 px-2 mb-1">
                    Authors
                  </h4>
                  {suggestions.authors.map((s) => (
                    <Link
                      key={s.id}
                      href={`/author/${s.slug}`}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      {s.image && (
                        <Image
                          src={urlFor(s.image).width(40).height(40).url()}
                          alt={s.name || "Author"}
                          width={28}
                          height={28}
                          className="rounded-full mr-2 object-cover"
                        />
                      )}
                      <span>{s.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Categories */}
              {suggestions.categories?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 px-2 mb-1">
                    Categories
                  </h4>
                  {suggestions.categories.map((s) => (
                    <Link
                      key={s.id}
                      href={`/category/${s.slug}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* No results */}
              {suggestions.articles.length === 0 &&
                suggestions.authors.length === 0 &&
                suggestions.categories.length === 0 && (
                  <p className="p-3 text-sm text-gray-500">No results found</p>
                )}
            </div>
          ) : null}
        </div>
      )}

      {/* Popular tags */}
      {!query && (
        <div className="flex flex-wrap gap-2 mt-2">
          {popularTags.map((tag, index) => (
            <Link
              key={index}
              href={`/search?q=${encodeURIComponent(tag)}`}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
