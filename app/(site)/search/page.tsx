import { Story } from "@/app/components/types";
import {
  searchArticlesCountQuery,
  searchArticlesPaginatedQuery,
  searchAuthorsQuery,
  searchCategoriesQuery,
  searchSubcategoriesQuery,
  searchTagsQuery,
} from "@/app/lib/getSearchResults";
import { sanityClient } from "@/app/lib/sanity.client";
import { urlFor } from "@/app/lib/sanity.image";
import {
  formatDate,
  transformSanityArticleToStory,
} from "@/app/lib/sanity.utils";
import { Clock, Search } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PaginationControls from "./_components/PaginationControls";
import SearchFilters from "./_components/SearchFilters";
import SearchSidebar from "./_components/SearchSidebar";

const ARTICLES_PER_PAGE = 12;

type SearchParams = Record<string, string | string[] | undefined>;

function toStringParam(
  value: string | string[] | undefined
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const query = toStringParam(params.q);

  const canonical = query
    ? `https://kurunzinews.com/search?q=${encodeURIComponent(query)}`
    : "https://kurunzinews.com/search";

  return {
    title: query
      ? `"${query}" - Search Results | Kurunzi News`
      : "Search | Kurunzi News",
    description: query
      ? `Search results for "${query}" on Kurunzi News.`
      : "Search Kurunzi News.",
    alternates: {
      canonical,
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};

  const query = (toStringParam(params.q) || "").trim();
  const pageParam = toStringParam(params.page);
  const typeFilter = toStringParam(params.type) || "all";
  const dateFilter = toStringParam(params.date) || "all";
  const sortBy = toStringParam(params.sort) || "relevance";

  let currentPage = 1;
  if (pageParam) {
    const n = parseInt(pageParam, 10);
    if (!Number.isNaN(n) && n > 0) currentPage = n;
  }

  const skip = (currentPage - 1) * ARTICLES_PER_PAGE;

  // If no query, show empty search state
  if (!query) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Search Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Search Kurunzi News
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Find articles, authors, categories, and more
            </p>

            {/* Search Input */}
            <div className="max-w-2xl mx-auto">
              <form method="GET" action="/search" className="relative">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Enter your search terms..."
                    className="w-full pl-16 pr-32 py-5 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-red-500/30 shadow-2xl"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="h-16 w-16 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What are you looking for?
            </h2>
            <p className="text-gray-600 text-lg mb-12">
              Enter keywords in the search bar above to find articles, authors,
              or categories.
            </p>

            {/* Search Tips */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 text-left shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Search className="h-5 w-5 mr-3 text-red-600" />
                Search Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Use specific keywords
                      </h4>
                      <p className="text-sm text-gray-600">
                        Try &apos;climate change policy&apos; instead of
                        &apos;weather&apos;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Search by author
                      </h4>
                      <p className="text-sm text-gray-600">
                        Find articles written by specific journalists
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Use quotes
                      </h4>
                      <p className="text-sm text-gray-600">
                        &apos;exact phrase&apos; for precise matches
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Filter results
                      </h4>
                      <p className="text-sm text-gray-600">
                        Use filters to narrow down by date or type
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Politics",
                  "Business",
                  "Technology",
                  "Sports",
                  "Health",
                  "Education",
                  "Entertainment",
                  "Travel",
                ].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-5 py-2.5 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function resolveStartDate(filter: string | undefined): string | undefined {
    if (!filter || filter === "all") return undefined;

    const now = new Date();

    switch (filter) {
      case "today":
        return now.toISOString().split("T")[0];
      case "week":
        now.setDate(now.getDate() - 7);
        return now.toISOString();
      case "month":
        now.setMonth(now.getMonth() - 1);
        return now.toISOString();
      case "year":
        now.setFullYear(now.getFullYear() - 1);
        return now.toISOString();
      default:
        return undefined;
    }
  }

  const startDate = resolveStartDate(dateFilter) ?? null;

  // Fetch data in parallel for better performance
  const fetchPromises = [
    sanityClient.fetch(searchArticlesPaginatedQuery, {
      q: query,
      skip,
      limit: ARTICLES_PER_PAGE,
      sortBy,
      startDate,
      typeFilter: typeFilter === "all" ? undefined : typeFilter,
      dateFilter: dateFilter === "all" ? undefined : dateFilter,
    }),
    sanityClient.fetch(searchArticlesCountQuery, { q: query }),
    sanityClient.fetch(searchAuthorsQuery, { q: query, limit: 5 }),
    sanityClient.fetch(searchCategoriesQuery, { q: query, limit: 5 }),
    sanityClient.fetch(searchSubcategoriesQuery, { q: query, limit: 5 }),
    sanityClient.fetch(searchTagsQuery, { q: query, limit: 10 }),
  ];

  const [
    rawArticles,
    totalArticlesCount,
    authors,
    categories,
    subcategories,
    tags,
  ] = await Promise.all(fetchPromises);

  const articles: Story[] = Array.isArray(rawArticles)
    ? rawArticles.map(transformSanityArticleToStory)
    : [];

  const totalArticles = totalArticlesCount || 0;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  // Redirect if page is out of bounds
  if (currentPage > totalPages && totalPages > 0 && currentPage > 1) {
    // In a real app, you might want to redirect here
    // For now, we'll just adjust the page
    currentPage = totalPages;
  }

  const canonical = `https://kurunzinews.com/search?q=${encodeURIComponent(query)}${currentPage > 1 ? `&page=${currentPage}` : ""}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: `Search results for &apos;${query}&apos;`,
    url: canonical,
    description: `Search results for &apos;${query}&apos; on Kurunzi News`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalArticles,
      itemListOrder: "Descending",
      itemListElement: articles.slice(0, 10).map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          url: `https://kurunzinews.com/${article.category?.slug}/${article.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Search Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Search Results for &apos;{query}&apos;
                </h1>
                <p className="text-white/90 text-lg">
                  Found {totalArticles.toLocaleString()} result
                  {totalArticles !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Search Input */}
              <div className="w-full md:w-96">
                <form method="GET" action="/search" className="relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="q"
                      placeholder="Search again..."
                      defaultValue={query}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg"
                    />
                    <input type="hidden" name="page" value="1" />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Go
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center text-sm">
              <Link href="/" className="text-gray-600 hover:text-red-600">
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-red-600 font-semibold">Search</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-700 truncate max-w-xs">
                &apos;{query}&apos;
              </span>
              {currentPage > 1 && (
                <>
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-700">Page {currentPage}</span>
                </>
              )}
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Search Filters */}
              <SearchFilters
                query={query}
                currentPage={currentPage}
                typeFilter={typeFilter}
                dateFilter={dateFilter}
                sortBy={sortBy}
                totalResults={totalArticles}
              />

              {/* Results */}
              {articles.length > 0 ? (
                <>
                  {/* Articles Grid */}
                  <div className="mb-12">
                    <div className="space-y-6">
                      {articles.map((article, index) => (
                        <article
                          key={article.id}
                          className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200"
                        >
                          <Link
                            href={`/${article.category?.slug || "news"}/${article.slug}`}
                            className="block"
                          >
                            <div className="flex flex-col md:flex-row">
                              {/* Image */}
                              <div className="md:w-1/3 relative h-48 md:h-auto">
                                <Image
                                  src={article.img || "/placeholder.jpg"}
                                  alt={article.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  sizes="(max-width: 768px) 100vw, 400px"
                                  priority={index < 3}
                                />
                                <div className="absolute top-3 left-3">
                                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wide rounded">
                                    {article.category?.title || "News"}
                                  </span>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="md:w-2/3 p-6">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 mb-3 line-clamp-2">
                                  {article.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                  {article.excerpt || article.subtitle}
                                </p>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    {article.author?.image && (
                                      <div className="flex items-center">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                                          <Image
                                            src={urlFor(
                                              article.author.image
                                            ).url()}
                                            alt={article.author.name}
                                            fill
                                            className="object-cover"
                                            sizes="32px"
                                          />
                                        </div>
                                        <span className="text-sm text-gray-700 font-medium">
                                          {article.author.name}
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex items-center text-gray-500 text-sm">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>
                                        {article.readTime || 5} min read
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-gray-500 text-sm">
                                    {formatDate(article.publishedAt)}
                                  </div>
                                </div>

                                {/* Tags */}
                                {article.tags && article.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                                    {article.tags.slice(0, 3).map((tag) => (
                                      <Link
                                        key={tag}
                                        href={`/search?q=${encodeURIComponent(tag)}`}
                                        className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors"
                                      >
                                        #{tag}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 border-t border-gray-200 pt-8">
                      <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalResults={totalArticles}
                        query={query}
                        typeFilter={typeFilter}
                        dateFilter={dateFilter}
                        sortBy={sortBy}
                      />
                    </div>
                  )}

                  {/* Search Stats */}
                  <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">
                          {totalArticles.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-700">
                          Total Results
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">
                          {currentPage}
                        </div>
                        <div className="text-sm text-blue-700">
                          Current Page
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">
                          {totalPages}
                        </div>
                        <div className="text-sm text-blue-700">Total Pages</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">
                          {totalPages > 0
                            ? ((currentPage / totalPages) * 100).toFixed(0)
                            : 0}
                          %
                        </div>
                        <div className="text-sm text-blue-700">Progress</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // No Results
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="h-12 w-12 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      No results found
                    </h2>
                    <p className="text-gray-600 mb-8">
                      We couldn&rdquo;t find any articles matching &apos;{query}
                      &apos; . Try different keywords or check your spelling.
                    </p>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-xl text-left">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Try these suggestions:
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                            Check for typos or spelling errors
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                            Try more general keywords
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                            Use different search terms
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                            Browse categories instead
                          </li>
                        </ul>
                      </div>

                      <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        Return to Homepage
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <SearchSidebar
                query={query}
                authors={authors || []}
                categories={categories || []}
                subcategories={subcategories || []}
                tags={tags || []}
                totalArticles={totalArticles}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
