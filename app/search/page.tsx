import { Author, Category, Story, Subcategory } from "@/app/components/types";
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams.q) || "";

  if (!query) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-lg text-slate-600">
          Please enter a search query above.
        </p>
      </div>
    );
  }

  // Fetch results in parallel
  const [articles, authors, categories, subcategories, tags] =
    await Promise.all([
      sanityClient.fetch(searchArticlesQuery, { q: `*${query}*` }),
      sanityClient.fetch(searchAuthorsQuery, { q: `*${query}*` }),
      sanityClient.fetch(searchCategoriesQuery, { q: `*${query}*` }),
      sanityClient.fetch(searchSubcategoriesQuery, { q: `*${query}*` }),
      sanityClient.fetch(searchTagsQuery, { q: `*${query}*` }),
    ]);

  const hasResults =
    articles.length ||
    authors.length ||
    categories.length ||
    subcategories.length ||
    tags.length;

  if (!hasResults) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-lg text-slate-600">
          No results found for <span className="font-semibold">{query}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Search results for:{" "}
        <span className="text-blue-600">&quot;{query}&quot;</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Results */}
        <div className="lg:col-span-3 space-y-12">
          {/* Authors */}
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

          {/* Categories */}
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
                    <p className="text-sm text-slate-600">{cat.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Subcategories */}
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
                    <p className="text-sm text-slate-600">{sub.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
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

          {/* Articles */}
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
              <li key="search-tip-1">• Try using specific keywords</li>
              <li key="search-tip-2">• Check your spelling</li>
              <li key="search-tip-3">• Use fewer words for broader results</li>
              <li key="search-tip-4">• Try related terms or synonyms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
