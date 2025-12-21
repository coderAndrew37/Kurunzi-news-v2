import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAuthor,
  getAuthorArticles,
  getAllAuthorSlugs,
} from "@/app/lib/getAuthor";
import { urlFor } from "@/app/lib/sanity.image";
import type { Metadata } from "next";
import { Story } from "@/app/components/types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import ArticleCard from "../../category/[category]/_components/ArticleCard";

export const revalidate = 60;

type AuthorParams = Promise<{ slug: string }>;

// ✅ Pre-render all author slugs at build time
export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

// ✅ Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: AuthorParams;
}): Promise<Metadata> {
  const { slug } = await params;

  const author = await getAuthor(slug);
  if (!author) return {};

  const description =
    author.bio?.slice(0, 150) ||
    `Read articles and insights from ${author.name} on Kurunzi News.`;

  return {
    title: `${author.name} | Kurunzi News`,
    description,
    openGraph: {
      title: `${author.name} | Kurunzi News`,
      description,
      type: "profile",
      images: author.image
        ? [
            {
              url: urlFor(author.image).width(800).height(800).url(),
              alt: author.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary",
      title: `${author.name} | Kurunzi News`,
      description,
      images: author.image
        ? [urlFor(author.image).width(400).height(400).url()]
        : [],
    },
  };
}

export default async function AuthorPage({ params }: { params: AuthorParams }) {
  const { slug } = await params;

  const author = await getAuthor(slug);
  if (!author) return notFound();

  const articles: Story[] = await getAuthorArticles(slug);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* === Author Header === */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        {author.image && (
          <Image
            src={urlFor(author.image).width(160).height(160).url()}
            alt={author.name}
            width={160}
            height={160}
            className="rounded-full object-cover border border-gray-200 shadow-sm"
          />
        )}

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-900">{author.name}</h1>

          {author.role && (
            <p className="text-slate-600 text-sm mt-1">{author.role}</p>
          )}

          {author.bio && (
            <div className="text-slate-700 text-sm mt-3 max-w-2xl prose mx-auto sm:mx-0">
              <PortableText value={author.bio} />
            </div>
          )}

          {author.social && (
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              {author.social.twitter && (
                <Link
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Twitter
                </Link>
              )}
              {author.social.linkedin && (
                <Link
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline text-sm"
                >
                  LinkedIn
                </Link>
              )}
              {author.social.github && (
                <Link
                  href={author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline text-sm"
                >
                  GitHub
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* === Articles === */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Articles by {author.name}
        </h2>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                href={`/article/${article.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No articles found for this author.</p>
        )}
      </div>
    </div>
  );
}
