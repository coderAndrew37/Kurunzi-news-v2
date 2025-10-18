import { Metadata } from "next";
import { Author, Category, Story, Subcategory } from "@/app/components/types";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "../[category]/_components/ArticleCard";
import {
  searchArticlesQuery,
  searchAuthorsQuery,
  searchCategoriesQuery,
  searchSubcategoriesQuery,
  searchTagsQuery,
} from "../lib/getSearchResults";
import { sanityClient } from "../lib/sanity.client";
import { urlFor } from "../lib/sanity.image";

interface SearchPageProps {
  searchParams: { q?: string };
}

/* ------------------ 🔹 Dynamic Metadata ------------------ */
export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || "";

  const title = query
    ? `Search results for "${query}" | Kurunzi News`
    : "Search | Kurunzi News";

  const description = query
    ? `Explore articles, authors, and topics related to "${query}" on Kurunzi News.`
    : "Search our articles, authors, and topics on YourSiteName.";

  const canonical = query
    ? `https://kurunzinews.com/search?q=${encodeURIComponent(query)}`
    : "https://kurunzinews.com/search";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
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
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  if (!query) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-lg text-slate-600">
          Please enter a search query above.
        </p>
      </div>
    );
  }

  // Fetch search results in parallel
  const [rawArticles, authors, categories, subcategories, tags] =
    await Promise.all([
      sanityClient.fetch(searchArticlesQuery, { q: query }),
      sanityClient.fetch(searchAuthorsQuery, { q: query }),
      sanityClient.fetch(searchCategoriesQuery, { q: query }),
      sanityClient.fetch(searchSubcategoriesQuery, { q: query }),
      sanityClient.fetch(searchTagsQuery, { q: query }),
    ]);

  const articles = rawArticles.map(transformSanityArticleToStory);

  const canonical = `https://kurunzinews.com/search?q=${encodeURIComponent(query)}`;

  /* ------------------ 🔹 JSON-LD Structured Data ------------------ */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: `Search results for "${query}"`,
    description: `Browse articles, authors, and categories matching "${query}" on YourSiteName.`,
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
        ? {
            "@type": "Person",
            name: article.author.name,
          }
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
    articles.length ||
    authors.length ||
    categories.length ||
    subcategories.length ||
    tags.length;

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

  /* ------------------ 🔹 Render Results ------------------ */
  return (
    <>
      {/* Inject JSON-LD into page head */}
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
            {authors.length > 0 && (
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

            {categories.length > 0 && (
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

            {subcategories.length > 0 && (
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

            {tags.length > 0 && (
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

            {articles.length > 0 && (
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
