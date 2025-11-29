import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/app/lib/sanity.client";
import {
  searchArticlesQuery,
  searchAuthorsQuery,
  searchCategoriesQuery,
  searchSubcategoriesQuery,
  searchTagsQuery,
} from "@/app/lib/getSearchResults";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { Author, Category, Story, Subcategory } from "@/app/components/types";
import { urlFor } from "@/app/lib/sanity.image";
import ArticleCard from "../category/[category]/_components/ArticleCard";

interface SearchPageProps {
  // Next's searchParams may be a promise-like dynamic API — treat as unknown and await
  searchParams:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
}

const PAGE_SIZE = 10;

/* ------------------ 🔹 Helpers ------------------ */
function toStringParam(p: string | string[] | undefined): string {
  if (!p) return "";
  return Array.isArray(p) ? p[0] : p;
}

function buildSearchHref(query: string, page: number) {
  const q = encodeURIComponent(query);
  return `/search?q=${q}${page > 1 ? `&page=${page}` : ""}`;
}

/* ------------------ 🔹 Dynamic Metadata ------------------ */
export async function generateMetadata(
  props: SearchPageProps
): Promise<Metadata> {
  // Await because searchParams may be an async/dynamic API
  const params = await props.searchParams;
  const query = toStringParam(params.q) || "";

  const title = query
    ? `Search results for "${query}" | Kurunzi News`
    : "Search | Kurunzi News";
  const description = query
    ? `Explore articles, authors, and topics related to "${query}" on Kurunzi News.`
    : "Search our articles, authors, and topics on Kurunzi News.";
  const canonical = query
    ? `https://kurunzinews.com/search?q=${encodeURIComponent(query)}`
    : "https://kurunzinews.com/search";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Kurunzi News",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ------------------ 🔹 Page Component ------------------ */
export default async function SearchPage(props: SearchPageProps) {
  const params = await props.searchParams;
  const query = toStringParam(params.q).trim();

  // parse page param safely
  const pageParam = toStringParam(params.page);
  let pageNum = 1;
  if (pageParam) {
    const n = parseInt(pageParam, 10);
    if (!Number.isNaN(n) && n > 0) pageNum = n;
  }

  if (!query) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-lg text-slate-600">
          Please enter a search query above.
        </p>
      </div>
    );
  }

  const offset = (pageNum - 1) * PAGE_SIZE;

  // run fetches in parallel
  const [rawArticles, authors, categories, subcategories, tags] =
    await Promise.all([
      // article query supports pagination params: { q, limit, offset }
      sanityClient.fetch(searchArticlesQuery, {
        q: query,
        limit: PAGE_SIZE,
        offset,
      }),
      sanityClient.fetch(searchAuthorsQuery, { q: query }),
      sanityClient.fetch(searchCategoriesQuery, { q: query }),
      sanityClient.fetch(searchSubcategoriesQuery, { q: query }),
      sanityClient.fetch(searchTagsQuery, { q: query }),
    ]);

  // Map/transform articles into Story objects (safe fallback to empty array)
  const articles: Story[] = Array.isArray(rawArticles)
    ? rawArticles.map(transformSanityArticleToStory)
    : [];

  const canonical = `https://kurunzinews.com/search?q=${encodeURIComponent(query)}${pageNum > 1 ? `&page=${pageNum}` : ""}`;

  /* ------------------ 🔹 JSON-LD Structured Data ------------------ */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: `Search results for "${query}"`,
    description: `Browse articles, authors, and categories matching "${query}" on Kurunzi News.`,
    url: canonical,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://kurunzinews.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    mainEntity: articles.map((article: Story) => ({
      "@type": "Article",
      headline: article.title,
      description: article.excerpt || "",
      url: `https://kurunzinews.com/article/${article.slug}`,
      author: article.author
        ? { "@type": "Person", name: article.author.name }
        : undefined,
      datePublished: article.publishedAt || undefined,
      image: article.featuredImage?.url || undefined,
      publisher: {
        "@type": "Organization",
        name: "Kurunzi News",
        logo: {
          "@type": "ImageObject",
          url: "https://kurunzinews.com/logo.png",
        },
      },
    })),
  };

  const hasResults =
    (Array.isArray(articles) && articles.length > 0) ||
    (Array.isArray(authors) && authors.length > 0) ||
    (Array.isArray(categories) && categories.length > 0) ||
    (Array.isArray(subcategories) && subcategories.length > 0) ||
    (Array.isArray(tags) && tags.length > 0);

  if (!hasResults) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
        <p className="text-lg text-slate-600">
          No results found for <span className="font-semibold">{query}</span>
        </p>
      </div>
    );
  }

  const hasMore = Array.isArray(articles) && articles.length === PAGE_SIZE;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Search results for:{" "}
          <span className="text-blue-600">&quot;{query}&quot;</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-3 space-y-12">
            {Array.isArray(authors) && authors.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Authors</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {authors.map((author: Author) => (
                    <Link
                      key={author.id}
                      href={`/author/${author.slug}`}
                      className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      {author.image && (
                        <Image
                          src={urlFor(author.image).width(80).height(80).url()}
                          alt={author.name || "Author"}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
                      <span className="font-medium text-slate-900">
                        {author.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {Array.isArray(categories) && categories.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {categories.map((cat: Category) => (
                    <Link
                      key={cat._id}
                      href={`/${cat.slug}`}
                      className="p-4 bg-gradient-to-br from-white to-neutral-50 border rounded-xl hover:border-blue-500 hover:shadow transition"
                    >
                      <h3 className="font-semibold text-slate-900">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {cat.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {Array.isArray(subcategories) && subcategories.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Subcategories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {subcategories.map((sub: Subcategory) => (
                    <Link
                      key={sub._id}
                      href={`/subcategory/${sub.slug}`}
                      className="p-4 bg-gradient-to-br from-white to-neutral-50 border rounded-xl hover:border-blue-500 hover:shadow transition"
                    >
                      <h3 className="font-semibold text-slate-900">
                        {sub.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {sub.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {Array.isArray(tags) && tags.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <Link
                      key={index}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {Array.isArray(articles) && articles.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {articles.map((article: Story) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      href={`/article/${article.slug}`}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    {pageNum > 1 ? (
                      <Link
                        href={buildSearchHref(query, pageNum - 1)}
                        className="inline-flex items-center px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50"
                      >
                        ← Prev
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center px-4 py-2 bg-gray-100 border rounded-md text-gray-400"
                        aria-disabled
                      >
                        ← Prev
                      </button>
                    )}
                  </div>

                  <div className="text-sm text-neutral-600">Page {pageNum}</div>

                  <div>
                    {hasMore ? (
                      <Link
                        href={buildSearchHref(query, pageNum + 1)}
                        className="inline-flex items-center px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50"
                      >
                        Next →
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center px-4 py-2 bg-gray-100 border rounded-md text-gray-400"
                        aria-disabled
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Search Tips
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>• Try using specific keywords</li>
                <li>• Check your spelling</li>
                <li>• Use fewer words for broader results</li>
                <li>• Try related terms or synonyms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
