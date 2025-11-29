"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import type {
  PTCodeBlock,
  PTImage,
  PTYouTube,
  WorldCupArticle,
} from "../types";
import { SanityMainImage } from "@/app/components/types";
import { urlFor } from "@/app/lib/sanity.image";

interface NewsContentProps {
  article: WorldCupArticle;
}

/** 🔥 Helper to generate Sanity image URLs safely */
const getImageUrl = (
  image: SanityMainImage | PTImage,
  width = 1200,
  height = 600
): string => {
  const builder = urlFor(image);

  if (!builder) return "";

  if (typeof builder === "string") {
    return builder;
  }

  return builder.width(width).height(height).url();
};

/** 🔥 FULLY TYPED Portable Text Components */
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: PTImage }) => {
      if (!value?.asset?._ref) return null;

      const imageUrl = getImageUrl(value, 800, 600);
      const alignment = value.alignment ?? "center";

      return (
        <figure
          className={`my-8 ${
            alignment === "center"
              ? "text-center"
              : alignment === "right"
                ? "text-right"
                : ""
          }`}
        >
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={800}
            height={600}
            className={`rounded-lg shadow-md max-w-full h-auto ${
              alignment === "center"
                ? "mx-auto"
                : alignment === "right"
                  ? "ml-auto"
                  : ""
            }`}
          />

          {value.caption && (
            <figcaption className="text-sm text-gray-600 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    code: ({ value }: { value: PTCodeBlock }) => (
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 border-l-4 border-blue-500">
        <code className={`language-${value.language}`}>{value.code}</code>
      </pre>
    ),

    youtube: ({ value }: { value: PTYouTube }) => {
      const match =
        value.url.match(
          /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/
        ) ?? [];

      const videoId = match[1];

      if (!videoId) return <div>Invalid YouTube URL</div>;

      return (
        <div className="my-8">
          <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 italic text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },

  block: {
    h1: ({ children }) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") ?? "";

      return (
        <h1 id={id} className="text-4xl font-bold mt-8 mb-4 text-gray-900">
          {children}
        </h1>
      );
    },

    h2: ({ children }) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") ?? "";

      return (
        <h2 id={id} className="text-3xl font-bold mt-8 mb-4 text-gray-900">
          {children}
        </h2>
      );
    },

    h3: ({ children }) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") ?? "";

      return (
        <h3 id={id} className="text-2xl font-bold mt-6 mb-3 text-gray-900">
          {children}
        </h3>
      );
    },

    h4: ({ children }) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") ?? "";

      return (
        <h4 id={id} className="text-xl font-bold mt-6 mb-3 text-gray-900">
          {children}
        </h4>
      );
    },

    normal: ({ children }) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600 my-6 bg-blue-50 py-2 rounded-r">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },

  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => <s>{children}</s>,

    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : "_self"}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
    },

    internalLink: ({ value, children }) => {
      if (!value?.reference) return <span>{children}</span>;

      let href = "#";

      switch (value.reference._type) {
        case "worldCupArticle":
          href = `/worldcup/news/${value.reference.slug?.current}`;
          break;
        case "author":
          href = `/authors/${value.reference.slug?.current}`;
          break;
      }

      return (
        <Link href={href} className="text-blue-600 underline">
          {children}
        </Link>
      );
    },
  },
};

/** 🔥 Component */
export default function NewsContent({ article }: NewsContentProps) {
  useEffect(() => {
    const el = document.getElementById("news-content");
    if (!el) return;

    const headings = el.querySelectorAll("h1, h2, h3, h4");

    headings.forEach((heading) => {
      const id =
        heading.textContent
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") ?? "";

      heading.id = id;
    });
  }, [article.content]);

  return (
    <article className="bg-white rounded-lg shadow-sm border p-8">
      {article.featuredImage && (
        <div className="mb-8">
          <Image
            src={getImageUrl(article.featuredImage, 1200, 600)}
            alt={article.featuredImage.alt || article.title}
            width={1200}
            height={600}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />

          {article.featuredImage.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {article.featuredImage.caption}
            </p>
          )}
        </div>
      )}

      <div id="news-content" className="prose prose-lg max-w-none">
        <PortableText
          value={article.content}
          components={portableTextComponents}
        />
      </div>

      {article.matchDetails && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Match Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.matchDetails.teams && (
              <div>
                <strong>Teams:</strong>{" "}
                {article.matchDetails.teams.join(" vs ")}
              </div>
            )}

            {article.matchDetails.date && (
              <div>
                <strong>Date:</strong>{" "}
                {new Date(article.matchDetails.date).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}

            {article.matchDetails.venue && (
              <div>
                <strong>Venue:</strong> {article.matchDetails.venue}
              </div>
            )}

            {article.matchDetails.competition && (
              <div>
                <strong>Competition:</strong> {article.matchDetails.competition}
              </div>
            )}

            {article.matchDetails.stage && (
              <div>
                <strong>Stage:</strong>{" "}
                {article.matchDetails.stage.replace(/([A-Z])/g, " $1").trim()}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
