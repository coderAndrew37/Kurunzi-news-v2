"use client";

import { Story as Article } from "@/app/components/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity.image";

// Custom serializers for PortableText
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).width(1200).fit("max").url()}
            alt={value.alt || "Article image"}
            width={1200}
            height={675}
            className="rounded-lg w-full h-auto object-cover"
          />
          {value.caption && (
            <figcaption className="mt-2 text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href;
      if (!href) return children;

      const isInternal =
        href.startsWith("/") || href.includes("kurunzinews.com");
      return isInternal ? (
        <Link href={href} className="text-blue-600 hover:underline">
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="leading-relaxed text-gray-800 mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
  },
};

export default function ArticleContent({ article }: { article: Article }) {
  if (!article.content) return null;

  return (
    <div className="prose prose-lg max-w-none mb-8 prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg prose-blockquote:border-blue-600">
      <PortableText value={article.content} components={components} />
    </div>
  );
}
