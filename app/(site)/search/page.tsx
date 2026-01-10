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
import ArticleCard from "../[category]/_components/ArticleCard";

const PAGE_SIZE = 10;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/* ------------------ 🔹 Helpers ------------------ */
function toStringParam(p: string | string[] | undefined): string {
  if (!p) return "";
  return Array.isArray(p) ? p[0] : p;
}

function buildSearchHref(query: string, page: number) {
  const q = encodeURIComponent(query);
  return `/search?q=${q}${page > 1 ? `&page=${page}` : ""}`;
}

/* ------------------ 🔹 Metadata ------------------ */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const query = toStringParam(params.q);

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

/* ------------------ 🔹 Page ------------------ */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

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

  const [rawArticles, authors, categories, subcategories, tags] =
    await Promise.all([
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

  const articles: Story[] = Array.isArray(rawArticles)
    ? rawArticles.map(transformSanityArticleToStory)
    : [];

  const canonical = `https://kurunzinews.com/search?q=${encodeURIComponent(
    query
  )}${pageNum > 1 ? `&page=${pageNum}` : ""}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: `Search results for "${query}"`,
    url: canonical,
  };

  const hasMore = articles.length === PAGE_SIZE;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Search results for{" "}
          <span className="text-blue-600">&quot;{query}&quot;</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-12">
            {articles.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      href={`/article/${article.slug}`}
                    />
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  {pageNum > 1 ? (
                    <Link href={buildSearchHref(query, pageNum - 1)}>
                      ← Prev
                    </Link>
                  ) : (
                    <span />
                  )}

                  {hasMore && (
                    <Link href={buildSearchHref(query, pageNum + 1)}>
                      Next →
                    </Link>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
