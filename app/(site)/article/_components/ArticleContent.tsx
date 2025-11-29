"use client";

import { Story as Article } from "@/app/components/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity.image";

// PortableText custom renderers
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="my-10">
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
            <Image
              src={urlFor(value).width(1600).fit("max").url()}
              alt={value.alt || "Article image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
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
        <Link
          href={href}
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
        >
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
  },
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed text-gray-800 mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-6 py-2 my-8 bg-gray-50 rounded-r-lg">
        <div className="text-lg italic text-gray-700">{children}</div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-800">
        {children}
      </ol>
    ),
  },
};

export default function ArticleContent({ article }: { article: Article }) {
  if (!article.content) return null;

  return (
    <div className="prose prose-lg max-w-none text-gray-800">
      <PortableText value={article.content} components={components} />
    </div>
  );
}
